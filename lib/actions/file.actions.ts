"use server"

import { createAdminClient, createSessionClient } from "../appwrite"
import {InputFile} from "node-appwrite/file"
import { appwriteConfig } from "../appwrite/config";
import { ID, Query,Models } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { url } from "inspector";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user.actions";
import { Quando } from "next/font/google";
import path from "path";
import { Search } from "lucide-react";

const handleError = ( error : unknown , message : string) => {
    console.log(error, message);
    throw error;
}

const createQueries = (
  currentUser: Models.Document,
  types: string[],
  searchText: string,
  sort: string,
  limit?: number,
) => {
  const queries = [
    Query.or([
      Query.equal("owner", [currentUser.$id]),
      Query.contains("users", [currentUser.email]),
    ]),
  ];
  if (types.length > 0) queries.push(Query.equal("type", types));
  if (searchText) queries.push(Query.contains("name", searchText));
  if (limit) queries.push(Query.limit(limit));

  if (sort) {
    const [sortBy, orderBy] = sort.split("-");

    queries.push(
      orderBy === "asc" ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy),
    );
  }

  return queries;
};

export const uploadFile = async ({
    file,
    ownerId,
    accountId,
    path
}: UploadFileProps ) => {
    const { storage , databases } = await createAdminClient();

    try {
        const inputFile = InputFile.fromBuffer(file , file.name);
        const bucketFile = await storage.createFile(appwriteConfig.bucketId,ID.unique(),inputFile)
        const fileDcoument = {
            type : getFileType(bucketFile.name).type,
            name : bucketFile.name,
            url : constructFileUrl(bucketFile.$id),
            extension : getFileType(bucketFile.name).extension,
            size : bucketFile.sizeOriginal,
            owner : ownerId,
            accountId,
            users : [],
            bucketFileId : bucketFile.$id,

        };

        const newFile = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.filesCollectionId,
            ID.unique(),
            fileDcoument
        )
        .catch(async (error : unknown)=> {
            await storage.deleteFile(appwriteConfig.bucketId,bucketFile.$id);
            handleError(error , "Failed to create file document")
        });
        revalidatePath(path);
        return parseStringify(newFile);
    }catch(error) {
        handleError(error , "Failed to upload file")
    }

}

export const getFiles = async ({
    types = [],
    searchText = "",
    sort = "$createdAt-desc",
    limit,
  }: GetFilesProps) => {
    const { databases } = await createAdminClient();
  
    try {
      const currentUser = await getCurrentUser();
  
      if (!currentUser) throw new Error("User not found");
  
      const queries = createQueries(currentUser, types, searchText, sort, limit);
    //   console.log("current user"+JSON.stringify(currentUser),queries)
      const files = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId,
    
        queries,

      );
    //   console.log({ files: currentUser.files });
  
    //   console.log({files})
      return parseStringify(files);
    } catch (error) {
      handleError(error, "Failed to get files");
    }
  }

 export const renameFile = async ({
    fileId,
    name,
    extension,
    path,
  }:RenameFileProps) => {
    const { databases } = await createAdminClient();
    try{
    const newName = `${name}.${extension}`;
    const updatedFile = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId,
        fileId,
        {
            name : newName
        }
    );

    revalidatePath(path);
    return parseStringify(updatedFile);
    }catch(error){
        handleError(error , "Failed to rename file")
    }

  }


  
 export const UpdateFileIUsers = async ({
  fileId,
  emails,
  
  path,
}:UpdateFileUsersProps) => {
  const { databases } = await createAdminClient();
  try{
   const updatedFile = await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.filesCollectionId,
    fileId,
    {
        users : emails
    }
   )

  revalidatePath(path);
  return parseStringify(updatedFile);
  }catch(error){
      handleError(error , "Failed to rename file")
  }

}


export const DeleteFile = async ({
  fileId,
  bucketFileId,
  
  path,
}:DeleteFileProps) => {
  const { databases,storage } = await createAdminClient();
  try{
   const deletedFile = await databases.deleteDocument(
    appwriteConfig.databaseId,
    appwriteConfig.filesCollectionId,
    fileId,
   );

   if(deletedFile){
    await storage.deleteFile(appwriteConfig.bucketId,bucketFileId);
   }

  revalidatePath(path);
  return parseStringify({status : "success"});
  }catch(error){
      handleError(error , "Failed to rename file")
  }

}

export async function getTotalSpaceUsed() {
  try{
    const {databases} = await createSessionClient();
    const currentUser = await getCurrentUser();
    if(!currentUser) throw new Error("User not found");

    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      [Query.equal("owner",[currentUser.$id])],
    );

    const totalSpace = {
      Image : {size : 0 , latestDate : ""  },
      document : {size : 0 , latestDate : ""  },
      video : {size : 0 , latestDate : ""  },
      audio : {size : 0 , latestDate : ""  },
      other : {size : 0 , latestDate : ""  },
      used : 0,
      image : {size : 0 , latestDate : ""  },
      all : 2*1024*1024*1024,
    };

    files.documents.forEach((file)=>{
      const fileType = (file.type || 'other').toLowerCase() as FileType;

      if(!totalSpace[fileType]){
        console.warn(`Unknown file type ${fileType}`);
        totalSpace.other.size += file.size;
        totalSpace.used += file.size;
        return
      }

      totalSpace[fileType].size += file.size;
      totalSpace.used += file.size;

      if(
        !totalSpace[fileType].latestDate ||
        new Date(file.$createdAt) > new Date(totalSpace[fileType].latestDate)
      ){
        totalSpace[fileType].latestDate = file.$updatedAt;
      }
    });
    return parseStringify(totalSpace);
  }catch(error){
    handleError(error , "Failed to get total space used")
  }
}