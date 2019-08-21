import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Tienda from './tienda.jsx';
import Helper from '../helper.js';

class Productos extends React.Component{
    constructor(){
        super();
        this.state = {
            producto : {},
            unidadesDisponibles: 0,
            unidadesSolicitadas : 0,
            cantidadProductos : 0,
        }
    }

    render(){
        /** Creamos los links de la imágenes y título enviandole el producto. */
        var links = {
            pathname: `/detalles/${this.props.productoSimple.nombre}`,
            state: {
                producto : this.state.producto
            }
        };

        return(
            <div className="card">
                <Link to={links} title="Ver producto">
                <img className="card-img-top" src={"./src/img/"+this.props.productoSimple.imagen} alt={this.props.productoSimple.nombre} /></Link>
                <div className="card-body text-muted">
                <Link to={links} title="Ver producto"><h4 className="card-title">{this.props.productoSimple.nombre}</h4></Link>
                    <p>Precio: {this.props.productoSimple.precio} ‎R$</p>
                    <p>Stock: {this.props.productoSimple.unidadesDisponibles - this.state.unidadesSolicitadas}</p>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="btn-group inline pull-left">
                                <Link to={links} className="btn btn-danger btn-sm">Ver más</Link>
                            </div>
                            <div className="btn-group inline pull-right">
                                <button className="btn btn-success btn-sm" onClick={this.addTocart.bind(this)}>Add <i className="fa fa-shopping-cart"></i></button>
                                <input type="number" name={this.props.productoSimple.nombre} value={this.state.unidadesSolicitadas} min="1" max={this.props.productoSimple.unidadesDisponibles} onChange={(e) => this.calculaUnidades(e)} />
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
            
        )
    }

    addTocart(){
        console.log('añadimos????? ' + this.state.unidadesSolicitadas);
        Helper.badgetCarrito = this.state.unidadesSolicitadas; 
        let producto = [];
        producto.push(this.props.productoSimple)
        producto.forEach((element) =>{
            element.cantidad = this.state.unidadesSolicitadas
        })
        console.log(producto);
        
        Helper.productosPedidos.push(producto)
    }

    calculaUnidades(e){
        let cantidad = e.target.value;
        let cantidadRestante =  this.props.productoSimple.unidadesDisponibles - cantidad;
        this.setState({
            unidadesDisponibles : cantidadRestante,
            unidadesSolicitadas : cantidad
        })
        
    }
    componentWillReceiveProps(){
        this.setState({
            producto : this.props.productoSimple,
            unidadesDisponibles : this.props.productoSimple.unidadesDisponibles
        })
    }

    componentWillMount(){
        this.setState({
            producto : this.props.productoSimple,
            unidadesDisponibles : this.props.productoSimple.unidadesDisponibles
        })
    }
}
export default Productos;