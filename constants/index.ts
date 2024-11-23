export const navItems = [
    {
      name: "Dashboard",
      icon: "/assests/dashboard.svg",
      url: "/",
    },
    {
      name: "Documents",
      icon: "/assests/documents.svg",
      url: "/documents",
    },
    {
      name: "Images",
      icon: "/assests/images.svg",
      url: "/images",
    },
    {
      name: "Media",
      icon: "/assests/video.svg",
      url: "/media",
    },
    {
      name: "Others",
      icon: "/assests/others.svg",
      url: "/others",
    },
  ];
  
  export const actionsDropdownItems = [
    {
      label: "Rename",
      icon: "/assests/edit.svg",
      value: "rename",
    },
    {
      label: "Details",
      icon: "/assests/info.svg",
      value: "details",
    },
    {
      label: "Share",
      icon: "/assests/share.svg",
      value: "share",
    },
    {
      label: "Download",
      icon: "/assests/download.svg",
      value: "download",
    },
    {
      label: "Delete",
      icon: "/assests/delete.svg",
      value: "delete",
    },
  ];
  
  export const sortTypes = [
    {
      label: "Date created (newest)",
      value: "$createdAt-desc",
    },
    {
      label: "Created Date (oldest)",
      value: "$createdAt-asc",
    },
    {
      label: "Name (A-Z)",
      value: "name-asc",
    },
    {
      label: "Name (Z-A)",
      value: "name-desc",
    },
    {
      label: "Size (Highest)",
      value: "size-desc",
    },
    {
      label: "Size (Lowest)",
      value: "size-asc",
    },
  ];
  
  export const avatarPlaceholderUrl =
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg";
  
  export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB