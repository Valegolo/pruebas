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
          src="https://cdn-icons-png.flaticon.com/512/4483/4483015.png"
              alt="marca"
              width="50px"
            />
          </Link>
          <div>
             <Link to={'/'}></Link>
            <button type="button" className="btn btn-outline-primary mx-3 btn-lg">
              <Link to={'/Home'}style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
            </button>
            <button type="button" className="btn btn-outline-primary mx-3 btn-lg">
              <Link to={'/category/Skincare'}style={{ textDecoration: 'none', color: 'inherit' }}>Skincare</Link>
            </button>
            <button type="button" className="btn btn-outline-primary mx-3 btn-lg">
              <Link to={'/category/Maquillaje'}style={{ textDecoration: 'none', color: 'inherit' }}>Maquillaje</Link>
            </button>
            <button type="button" className="btn btn-outline-primary mx-3 btn-lg ">
              <Link to={'/category/Cabello'} style={{ textDecoration: 'none', color: 'inherit' }}>
              Cabello</Link>
            </button>
          </div>
          <CartWidget />
        </div>
      </nav>
    </>
  );
}
