import { initializeApp } from 'firebase/app';
import { getAuth, FacebookAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc, getFirestore, getDocs,collection } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

// import Home from '../views/Home';
// import Home from '../views/Home';
// import ReactObserver from 'react-event-observer';

const firebaseConfig = {
  apiKey: "AIzaSyB5exfNMO-tPjFn9Tzr1imSi86_xJDIvR4",
  authDomain: "q-app-demo-2.firebaseapp.com",
  databaseURL: "https://q-app-demo-2-default-rtdb.firebaseio.com",
  projectId: "q-app-demo-2",
  storageBucket: "q-app-demo-2.appspot.com",
  messagingSenderId: "182610526310",
  appId: "1:182610526310:web:88a5131fe4fadda7d06da7"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
// const database = 
export const auth = getAuth(firebaseApp)
// const app = initializeApp(firebaseConfig);
// const firebaseAuth = getAuth(app)
// export const firebaseObserver = ReactObserver();
// export const auth = firebaseAuth.auth();
// export const firestore = storage.firestore();
export const authentication = getAuth(firebaseApp)



const facebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(authentication, provider);
    await addUserToDB(result.user);
};


const addUserToDB = async (userInfo) => {
    const { uid, displayName, email } = userInfo;
    try {
      await setDoc(doc(db, "users", uid), {
        uid,
        displayName,
        email,
      });
  
      console.log("userInfo store in Firestore by: " + displayName);
    } catch (e) {
      console.log("error in DataStore: " + e.message);
    }
  };

  async function getData() {
    const querySnapshot = await getDocs(collection(db, "Company"));
    let data = []
    querySnapshot.forEach((doc) => {
        // console.log('getCompanyCollection ===> ', doc.id, " => ", doc.data());
        data.push({ ...doc.data() })
    })
    return data;
}




export{firebaseApp, db, storage, facebookSignIn, getData}