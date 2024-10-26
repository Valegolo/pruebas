import ItemListContainer from '../components/ItemList';
import ProductsListHome from '../components/ProductListHome';


export default function HomeView() {
  return (
    <>
      <ItemListContainer greeting="Bienvenido a mi Tienda!" />

      <h2 className="text-center" style={{ marginTop: '20px' }}>
        <strong>Todos Nuestros Productos</strong>
      </h2>
      <div className="container" style={{ padding: '10px 0', marginTop: '10px' }}>

  <ProductsListHome />
  </div>

      
    </>
  );
}
