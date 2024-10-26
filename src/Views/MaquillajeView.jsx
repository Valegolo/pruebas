import ProductsListCabello from '../components/ProductListCabello';

export default function CabelloView() {
  return (
    <>

      <h2 className="text-center" style={{ marginTop: '40px' }}>
        <strong>Nuestros Producto de Cabellos</strong>
      </h2>
  <div className="main-content container-lg" style={{ padding: '10px 0', marginTop: '10px' }}>

  <ProductsListCabello />
  </div>

      
    </>
  );
}