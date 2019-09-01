import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Tienda from './components/tienda.jsx';
import Carrito from './components/carrito.jsx';
import Detalles from './components/detalles.jsx';
import Login from './components/login.jsx';


class App extends React.Component{
    render(){
        return(
          <div className="bg-tienda fill">
            <Router>
              <Switch>
                  <Route path="/tienda" component = {Tienda} />
                  <Route path="/carrito" component = {Carrito} />
                  <Route path="/detalles/:nombreProducto" component = {Detalles} />
                  <Route path='/login' component = {Login} />
                </Switch>
              </Router>
            </div>
          );
        }
      }

export default App;