import React from 'react';
import * as Request from 'superagent';
import Menu from './menu.jsx';
import Helper from '../helper.js';
import { Link, Redirect } from 'react-router-dom';

class Carrito extends React.Component{
    constructor(){
        super();
        this.state = {
            productos : [],
        }
    }

    render(){
        let pedido = this.state.productos;
        const tabla = [];
        const total = [];
        let sum = 0;
        
        if (pedido.length==0){
            console.log('No hay productos');
            return(
                <div className="container">
                    <Menu/>  
                    <div className="bg-container mt-3 p-3 rounded">
                        <div className="row">
                            <div className="col-sm-12 mb-4">
                            <h1>Carrito de la compra</h1>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <h2>Sin productos seleccionados</h2>
                                </div>
                            </div>
                                <Link to="/tienda"><button type="button" className="btn btn-lg btn-danger btn-block mt-5">Atrás</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            )         
        }else{
            for (let index = 0; index < pedido.length; index++) {
                const element = pedido[index];
                for(let productoFinal of element){
                    tabla.push(
                        <tr key={index}>
                            <th scope="row"><img src={"./src/img/"+productoFinal.imagen} className="img-thumbnail carrito"/></th>
                            <th>{productoFinal.nombre}</th>
                            <th>{productoFinal.cantidad}</th>
                            <th>{productoFinal.precio}</th>
                            <th>{productoFinal.precio*productoFinal.cantidad} $</th>
                        </tr>
                    )
                    total.push(productoFinal.precio*productoFinal.cantidad)
                }
            }
            sum = total.reduce((pv, cv) => pv + cv, 0);

        return(
            <div className="container">
                <Menu/>  
                <div className="bg-container mt-3 p-3 rounded">
                    <div className="row">
                        <div className="col-sm-12 mb-4">
                            <h1>Carrito de la compra</h1>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-8">
                                    <div className="table-responsive-sm">
                                        <table className="table table-striped">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th scope="col"><i className="fa fa-file-photo-o"></i></th>
                                                    <th scope="col">Descripción</th>
                                                    <th scope="col">Cantidad</th>
                                                    <th scope="col">Precio</th>
                                                    <th scope="col">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tabla}
                                            </tbody>
                                            <tbody>
                                                <tr className="table-light font-weight-bolder">
                                                    <td scope="col" colSpan="4" className="text-right"><span className="text-danger">Total: </span></td>
                                                    <td scope="col">{sum ? sum : ' '} $</td>
                                                </tr>
                                            </tbody>
                                        </table>    
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <button type="button" className="btn btn-success btn-lg btn-block" onClick={this.pedidoCompletado.bind(this)}>PAGAR AHORA</button>
                                    <button type="button" className="btn btn-danger btn-block mt-5" onClick={this.cancelarPedido.bind(this)}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        }
    }

    cancelarPedido(){
        this.setState({
            productos : []
        })
        Helper.productosPedidos = [];
        Helper.badgetCarrito = 0;
        this.props.history.push('/tienda')
    }

    pedidoCompletado(){
        let productos = Helper.productosPedidos;
        
        for (let i = 0; i < productos.length; i++) {
            const element = productos[i];
            for (let a = 0; a < element.length; a++) {
                const producto = element[a];
                let resta = producto.unidadesDisponibles - producto.cantidad;
                productos[i][a].unidadesDisponibles = resta;  
            } 
        }

        this.actualizaBBDD(productos)
        this.cancelarPedido();
    }

    actualizaBBDD(productos){
        console.log(productos);

        Helper.productos.forEach((producto) =>{
            console.log(producto.nombre);
            
        })
        
    }

    componentWillMount(){
        this.setState({
            productos : Helper.productosPedidos
        })
    }
}

export default Carrito;