import React from 'react';
import Menu from './menu.jsx';
import Helper from '../helper.js';

class Carrito extends React.Component{
    constructor(){
        super();
        this.state = {
            productos : []
        }
    }

    render(){
        let pedido = this.state.productos;
        const tabla = []
        const total = 0;

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
            }
        }


        return(
            <div className="container">
                <Menu/>  
                <div className="bg-container mt-3 p-3 rounded">
                    <div className="row">
                        <div className="col-sm-12 mb-4">
                            <h1>Carrito de la compra</h1>
                            <hr/>
                            <div className="col-12">
                                <table className="table table-striped">
                                    <thead className="table-dark">
                                        <tr>
                                            <th><i className="fa fa-file-photo-o"></i></th>
                                            <th>Descripción</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tabla}
                                    </tbody>
                                    <tbody>
                                        <tr className="table-light font-weight-bolder">
                                            <td colSpan="4" className="text-right"><span className="text-danger">Total: </span></td>
                                            <td>total $</td>
                                        </tr>
                                    </tbody>
                                </table>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentWillMount(){
        this.setState({
            productos : Helper.productosPedidos
        })
    }
}

export default Carrito;