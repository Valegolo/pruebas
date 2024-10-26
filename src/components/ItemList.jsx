export default function ItemList({ greeting }) {
    return (
      <>
        <div className="container d-flex justify-content-center align-items-center mt-5">
          <h1 class="fw-medium text-secondary">{greeting}</h1>
        </div>
      </>
    );
  }
  