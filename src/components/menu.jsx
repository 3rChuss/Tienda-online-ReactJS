import React from 'react'
import { Link } from 'react-router-dom';
import Helper from '../helper';


class Menu extends React.Component{
    constructor(){
        super();

        this.state = {
          unidades : 0,
          productos : []
        }
    }

    render(){
        return(
            <nav className="mb-1 navbar navbar-expand bg-white rounded">
              <div className="container">
                <div className="navbar-header">
                  <Link to="/tienda" className="navbar-brand">La Bodega</Link>
                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent-333">
                  <ul className="navbar-nav ml-auto nav-flex-icons">
                    <li className="nav-item">
                      <Link to="/carrito" className="nav-link waves-effect waves-light">
                          <i className="fa fa-shopping-cart"></i><span className="badge bg-danger">{this.badge() ? this.badge() : ''}</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link waves-effect waves-light">
                          <i className="fa fa-user-circle-o"></i>
                      </a>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link waves-effect waves-ligh">
                          <i className="fa fa-sign-out"></i>
                        </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
        )
    }

    badge(){
      return Helper.productosPedidos.length;
    }
}

export default Menu;