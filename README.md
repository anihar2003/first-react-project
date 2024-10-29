Social Media App
A React-based social media platform that allows users to create, edit, delete, and like posts. Users can also view posts made by others. The app is integrated with Firebase for real-time database functionality and user authentication using Gmail credentials.

Features
Create, Edit, Delete Posts: Users can create new posts, edit their existing posts, or delete them.
Like Posts: Like functionality for posts made by users.
View Others' Posts: Users can view posts created by other users in real-time.
Firebase Integration: Real-time data updates using Firebase Firestore.
Gmail Authentication: Users can sign up and log in using their Gmail accounts via Firebase Authentication.

Technologies Used:
Frontend: React, Vite, TypeScript
Backend: Firebase Firestore (Database), Firebase Authentication (Login with Gmail)
Hosting: Firebase Hosting
Styling: CSS (or any library you're using)

Installation:

Clone the repository:

```bash
git clone https://github.com/anihar2003/first-react-project.git
cd first-react-project
```
Install dependencies:

```bash
npm install
```
Set up Firebase:

Go to the Firebase Console.
Create a new project.
Enable Firestore Database and Firebase Authentication (Google Sign-In).
Get your Firebase config and add it to the firebaseConfig in your project.
Run the app:

```bash
npm run dev
```
Deploy to Firebase (optional):

```bash
firebase deploy
```

Firebase Setup
Create a Firebase project in the Firebase console.
Enable Firestore for real-time data storage.
Set up Firebase Authentication for Gmail login.
Use the provided Firebase configuration in your project.

Usage
Create an account or sign in with your Gmail credentials.
Create a new post by typing in the post editor and clicking "Post".
Edit or delete your existing posts by clicking the appropriate buttons.
Like posts by other users by clicking the "Like" button.
