import HomeView from '../views/Homeview';
import CartWidget from './CartWidget';
import {Link} from 'react-router-dom';

export default function NavBartest() {
  return (
    <>
<nav class= "navbar mt-1 mx-2"><div className="container-fluid">
          <Link to={'/Home'}>
            <img
              className=""
          src="data:image/png;base64,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"
              alt="marca"
              width="50px"
            />
          </Link>
          <div>
            <button type="button" className="btn btn-outline-primary mx-3 btn-lg">
              <Link to={'/Home'}>Home</Link>
            </button>
            <button type="button" className="btn btn-outline-primary mx-3 btn-lg">
              <Link to={'/category/Skincare'}>Skincare</Link>
            </button>
            <button type="button" className="btn btn-outline-primary mx-3 btn-lg">
              <Link to={'/category/Maquillaje'}>Maquillaje</Link>
            </button>
            <button type="button" className="btn btn-outline-primary mx-3 btn-lg">
              <Link to={'/category/Cabello'}>Cabello</Link>
            </button>
          </div>
          <CartWidget />
        </div>
      </nav>
    </>
  );
}
