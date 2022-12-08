import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import{getAuth, 
    createUserWithEmailAndPassword, 
    signOut, 
    signInWithEmailAndPassword,
     onAuthStateChanged
    } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAbf8nLa4JtlfoHGP2tDZg7EHC6QqwMqQo",
    authDomain: "newbie-scoffee.firebaseapp.com",
    projectId: "newbie-scoffee",
    storageBucket: "newbie-scoffee.appspot.com",
    messagingSenderId: "478864673853",
    appId: "1:478864673853:web:4b3fa4d4b73dfc1a216e54"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth= getAuth(app);


  //sign up
  const signupForm =document.querySelector("#signup-form");

  signupForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    //get user info
    const email =signupForm["signup-email"].value;
    const password =signupForm["signup-password"].value;

   createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
    //signed in
    const user =userCredential.user
    console.log(user);
    const modal = document.querySelector("#modal-signup");
    M.Modal.getInstance(modal).close()
    signupForm.reset();
   }).catch((error)=>{
    const errorCode=error.code;
    const errorMessage =error.message;
    //..


   });

});

//Logout
const logout =document.querySelector("#logout");
logout.addEventListener("click", (e)=>{
    e.preventDefault();
    signOut(auth).then(()=>{
        console.log("User has signed out.")
    }).catch((error)=>{
//an error happened
    });
});

//Login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email =loginForm["login-email"].value;
    const password =loginForm["login-password"].value;
    signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
        //Signed in
        const user =userCredential.user
        console.log(user);
        const modal = document.querySelector("#modal-signup");
        M.Modal.getInstance(modal).close()
        signupForm.reset();
       }).catch((error)=>{
        const errorCode=error.code;
        const errorMessage =error.message;
        //..

    });
});