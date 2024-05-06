import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain:process.env.REACT_APP_Auth_Domain,
    projectId: process.env.REACT_APP_Project_Id,
    appId: process.env.REACT_APP_App_Id,
  };

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const provider = new  GoogleAuthProvider();
export const gitProvider = new GithubAuthProvider(); 

export default app;