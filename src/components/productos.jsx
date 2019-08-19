import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Productos extends React.Component{
    constructor(){
        super();
        this.state = {
            productos : {},
            unidadesDisponibles: 0,
            unidadesSolicitadas : 0,
        }
    }

    render(){

        return(
            <div className="card">
                <Link to={`/detalles/${this.props.productoSimple.nombre}`} title="Ver producto">
                <img className="card-img-top" src={"./src/img/"+this.props.productoSimple.imagen} alt={this.props.productoSimple.nombre} /></Link>
                <div className="card-body text-muted">
                <Link to={`/detalles/${this.props.productoSimple.nombre}`} title="Ver producto"><h4 className="card-title">{this.props.productoSimple.nombre}</h4></Link>
                    <p>Precio: {this.props.productoSimple.precio} ‎R$</p>
                    <p>Stock: {this.state.unidadesDisponibles}</p>
                    <div className="row">
                        <div className="col">
                            <p className="btn btn-danger btn-block">Ver más</p>
                        </div>
                        <div className="col">
                            <button type="button" className="btn btn-success btn-block" onClick={()=>{this.addTocart(this.props.productoSimple.id)}} /><i className="fa fa-shopping-cart"></i>
                        </div>
                        <div className="col centered">
                        <input type="number" name={this.props.productoSimple.nombre} value={this.state.productos.unidadesDisponibles} onChange={(e) => this.calculaUnidades(e)} />
                        </div>
                    </div> 
                </div>
            </div>
        )
    }

    addTocart(id){
        return(
        <Redirect
                to={{
                path: "/carrito",
                state: {
                    productos : this.state.productos,
                    id: id,
                    unidades: this.state.unidadesSolicitadas
                }
                }}
            />
        )
        
    }

    calculaUnidades(e){
        let cantidad = e.target.value;
        let cantidadRestante =  this.props.productoSimple.unidadesDisponibles - cantidad;
        console.log(cantidadRestante);
        this.setState({
            unidadesDisponibles : cantidadRestante,
            unidadesSolicitadas : cantidad
        })
        
    }

    componentWillMount(){
        this.setState({
            unidadesDisponibles : this.props.productoSimple.unidadesDisponibles
        })
    }
}

export default Productos;