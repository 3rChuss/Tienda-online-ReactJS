import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Menu from './menu.jsx';

class Productos extends React.Component{
    constructor(){
        super();
        this.state = {
            producto : {},
            unidadesDisponibles: 0,
            unidadesSolicitadas : 0
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
                    <div className="input-group">
                        <div className="file-field input-field">
                            <Link to={links} className="btn btn-danger btn-block">Ver más</Link>
                            <button className="btn btn-success btn-block" onClick={()=>{this.addTocart(this.props.productoSimple.id)}}><i className="fa fa-shopping-cart"></i></button>
                            <input type="number" name={this.props.productoSimple.nombre} value={this.state.unidadesSolicitadas} min="0" max={this.props.unidadesDisponibles} onChange={(e) => this.calculaUnidades(e)} />
                        </div>
                    </div> 
                </div>
            </div>
        )
    }

    addTocart(e){
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