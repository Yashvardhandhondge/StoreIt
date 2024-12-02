
# StoreIt

**StoreIt** is a secure file management application that allows you to log in with a verified email and OTP, store your files, view them, and download them anytime.

## Features
- **Secure Authentication**: Log in with your email and receive a one-time password (OTP) for access.
- **File Management**: Upload, view, and download files easily.
- **User-Friendly Interface**: Clean and intuitive design for a seamless user experience.

## Getting Started

Follow these steps to set up the project on your local machine:

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Yashvardhandhondge/StoreIt.git
   ```

2. Navigate to the project directory:
   ```bash
   cd StoreIt
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up the environment variables. Create a `.env` file in the root directory and add the following keys:
   ```env
   NEXT_PUBLIC_APPWRITE_PROJECT=
   NEXT_PUBLIC_APPWRITE_DATABASE=
   NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=
   NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=
   NEXT_PUBLIC_APPWRITE_BUCKET=
   NEXT_PUBLIC_APPWRITE_ENDPOINT=
   NEXT_APPWRITE_KEY=
   ```

### Running the Application

Once you have set up the `.env` file, run the application locally:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Screenshots

### Sign-Up Page
![Screenshot 2024-12-02 171148](https://github.com/user-attachments/assets/ab193aa4-7d02-4383-92d4-a268554f8f8a)



### Home Page
![Screenshot 2024-12-02 171045](https://github.com/user-attachments/assets/ca9315c1-10a9-4b4c-b388-d65fadd30182)



## Technologies Used
- **Frontend**: Next.js
- **Backend**: Appwrite
- **Styling**: Tailwind CSS


