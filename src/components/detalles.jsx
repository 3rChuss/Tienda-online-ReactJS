import React from 'react';
import { Link } from 'react-router-dom';

class Detalles extends React.Component{
    constructor(){
        super();
        this.state = {
            producto : null
        }
    }

    render(){
        return(
            <div className="bg-container mt-3 p-3 rounded">
                <div className="row">
                    <div className="col-sm-12">
                        <h1>{this.state.producto.nombre}</h1>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-8">
                        <img src={"../src/img/"+this.state.producto.imagen} className="img-fluid rounded border p-2" alt={this.state.producto.nombre}/>
                    </div>
                    <div className="col">
                        <span><h2>Precio: {this.state.producto.precio}</h2></span>
                        <span><h3>Ud. Disponibles: {this.state.producto.unidadesDisponibles}</h3></span>
                    </div>
                </div>
                <div className="row pt-2">
                    <div className="col-sm-2">
                    <Link to="/tienda"><button type="button" className="btn btn-dark btn-block">Atrás</button></Link>
                    </div>
                </div>
            </div>
        )
    }

    componentWillMount(){
        let productoRecibido = this.props.location.state.producto    
        console.log(productoRecibido.nombre);
        this.setState({
            producto : this.props.location.state.producto
        })
        
    }
}

export default Detalles;