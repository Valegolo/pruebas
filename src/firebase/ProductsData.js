import { collection, getDocs, doc, getDoc, query, where, updateDoc, addDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

// Obtener todos los productos
export const getProducts = async () => {
  const productsCollection = collection(db, 'products');
  const productsSnapshot = await getDocs(productsCollection);
  return productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Obtener producto por ID
export const getProductById = async (id) => {
  const productRef = doc(db, 'products', id);
  const productSnapshot = await getDoc(productRef);
  if (productSnapshot.exists()) {
    return { id: productSnapshot.id, ...productSnapshot.data() }; // Devuelve el producto con su ID
} else {
    throw new Error('Product not found');
}
};

// Obtener productos por categoría
export const getProductsByCategory = async (category) => {
  const productsCollection = collection(db, 'products');
  const q = query(productsCollection, where('category', '==', category));
  const productsSnapshot = await getDocs(q);
  return productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
// guardar orden
export const saveOrder = async (orderData) => {
  try {
    const orderRef = await addDoc(collection(db, 'orders'), orderData);
    return orderRef.id; 
  } catch (error) {
    console.error('Error saving order: ', error);
    throw error;
  }
};
// Función para crear una nueva orden
export const createOrder = async (orderData) => {
  try {
      const docRef = await addDoc(collection(db, 'orders'), orderData);
      return docRef.id; 
  } catch (error) {
      console.error("Error adding document: ", error);
      throw new Error("Error creating order");
  }
};
// Función para actualizar el stock de un producto
export const updateProductStock = async (productId, quantity) => {
  try {
      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, {
          stock: quantity
      });
  } catch (error) {
      console.error("Error updating stock: ", error);
      throw new Error("Error updating product stock");
  }
};
const ordersCounterRef = doc(db, 'orderCounters', 'dailyCounter');

export const getNextOrderNumber = async () => {
    const docSnap = await getDoc(ordersCounterRef);
    let orderNumber = 1;

    // Si no existe el documento, lo creo
    if (!docSnap.exists()) {
        await setDoc(ordersCounterRef, { date: new Date().toISOString().split('T')[0], count: orderNumber });
    } else {
        const data = docSnap.data();
        const currentDate = new Date().toISOString().split('T')[0];

        // Verificamos si la fecha actual es la misma que la almacenada
        if (data.date === currentDate) {
            orderNumber = data.count + 1;
            await updateDoc(ordersCounterRef, { count: orderNumber });
        } else {
            orderNumber = 1;
            await updateDoc(ordersCounterRef, { date: currentDate, count: orderNumber });
        }
    }
    return orderNumber;
};