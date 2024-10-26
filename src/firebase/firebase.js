// Import the functions you need from the SDKs you need
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para obtener un producto individual
export async function getSingleProduct(id) {
  const documentRef = doc(db, 'products', id);
  try {
    const snapshot = await getDoc(documentRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() }; // Devuelve el producto con su ID
    } else {
      console.error("No such document!");
      return null; // Devuelve null si no existe el documento
    }
  } catch (error) {
    console.error("Error al obtener el documento:", error);
    return null; // Devuelve null en caso de error
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
export { db }; // Exporta la base de datos si se necesita en otros archivos
