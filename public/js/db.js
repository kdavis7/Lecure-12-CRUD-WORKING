
  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import{
  getFirestore, 
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  enableIndexedDbPersistence, 
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

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
  const db = getFirestore(app);

  async function getRecipes(db){
    const recipeCol =collection(db,"recipes");
    const recipeSnapshot = await getDocs(recipeCol);
    const recipeList = recipeSnapshot.docs.map((doc)=> doc);
    return recipeList;
  }
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
        console.log("Persistence failed.")
    } else if (err.code == 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
        console.log("Persistence is not valid.")
    }
});

  const unsub =onSnapshot(collection(db,"recipes"), (doc) => {
    //console.log(doc.docChanges());
  doc.docChanges().forEach((change)=> {
    //console.log(change, change.doc.data(), change.doc.id);
    if(change.type === "added"){
        //call renderFunction in UI
        renderRecipe(change.doc.data(), change.doc.id);
    }
    if (change.type ==="removed"){
      //do something. 
      removeRecipe(change.doc.id);
    }
  });
  });

  //add new task
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  addDoc(collection(db, "recipes"), {
    title: form.title.value,
    description: form.description.value,
  }).catch((error) => console.log(error));
  form.title.value = "";
  form.description.value = "";
});

//delete
const recipeContainer = document.querySelector(".recipes");
recipeContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "I") {
    const id = event.target.getAttribute("data-id");
    deleteDoc(doc(db, "recipes", id));
  }
});