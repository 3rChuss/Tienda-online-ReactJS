import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Tienda from './components/tienda.jsx';
import Login from './components/login.jsx';
import Carrito from './components/carrito.jsx';
import Menu from './components/menu.jsx';
import Detalles from './components/detalles.jsx';


class App extends React.Component{
    render(){
        return(
          <div className="bg-tienda fill">
            <Router>
              <Switch>
                  <Route exact path="/tienda" component = {Tienda} />
                  <Route exact path="/carrito" component = {Carrito} />
                  <Route path="/detalles/:nombreProducto" component = {Detalles} />
                </Switch>
              </Router>
            </div>
          );
        }
      }

export default App;