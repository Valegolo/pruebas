import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCBvP4Qc6prkTuPwVe8QOPk0DJT7uQJJTU",
  authDomain: "ecommerce-react-7d124.firebaseapp.com",
  projectId: "ecommerce-react-7d124",
  storageBucket: "ecommerce-react-7d124.appspot.com",
  messagingSenderId: "555832899076",
  appId: "1:555832899076:web:82d0d24aef99d19b91e751"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export async function getSingleProduct(id) {
  const documentRef = doc(db, 'products', id);
  try {
    const snapshot = await getDoc(documentRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() }; 
    } else {
      console.error("No such document!");
      return null; 
    }
  } catch (error) {
    console.error("Error al obtener el documento:", error);
    return null; 
  }
}
export async function sendOrder(order){
  const ordersCollection = collection(db,'orders');
  try { const docRef = await addDoc(ordersCollection,order);
    console.log ('Nueva orden generada' + docRef.id);
    return docRef.id;

  } catch (error){
    console.log ('Error al agregar documento' + error);
  }
}
export { db }; 
