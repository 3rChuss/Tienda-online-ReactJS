import React from 'react';
import * as Request from  'superagent';
import Productos from './productos.jsx';
import Menu from './menu.jsx'

class Tienda extends React.Component{
    constructor(){
        super();
        this.state = {
            productos : [],
            resultadoBusqueda: [],
            err : ''
        }
    }

    render(){
        const tabla = [];
        let productosTotales = this.state.productos;
        
        if(this.state.resultadoBusqueda.length)
        {
            console.log('Resultado de la busqueda ......');
            productosTotales = this.state.resultadoBusqueda;   
        }
        for (let i = 0; i < productosTotales.length; i++) {
            const element = productosTotales[i];
            console.log(element);
            tabla.push(
                <div className="col-12 col-md-6 col-lg-3 mb-4" key={i}>
                    <Productos productoSimple={element}/>
                </div>
            )    
        }

        return(
            <div className="container">
                <Menu cantidad={this.props.cantidad}/>  
            <div className="bg-container mt-3 p-3 rounded">
                <div className="row">
                    <div className="col-sm-8">
                        <h2 className="float-left">Catálogo de Productos</h2>
                    </div>
                    <div className="col-sm-4">
                        <span>¿Qué estas buscando?</span>
                        <form className="form">
                            <input className="form-control" type="search" placeholder="Buscar" onChange={(e) => {this.buscarProducto(e)}}/>
                        </form>
                    </div>
                </div>
                <hr />
                <div className="row">
                    {tabla}
                </div>
            </div>
            </div>
        )
    }

    componentWillMount(){
        this.getProductos();
    }

    buscarProducto(e){
        let Productos = this.state.productos;
        let resultado = [];
        let error = '';

        for (let index = 0; index < Productos.length; index++) {
            const element = Productos[index];
            let buscado = element.nombre.toLowerCase();
            if(buscado.includes(e.target.value.toLowerCase())){
                resultado.push(element);
            }else error = "No se ha encontrado productos con ese nombre :)";
        }
        this.setState({
            resultadoBusqueda : resultado, 
            err : error
        })     
    }

    getProductos(){
        Request
            .get('https://tienda-9303e.firebaseio.com/productos.json')
            .set('Content-Type', 'application/json')
            .end( (err, res) => {
                let ProductosArray = res.body;
                console.log('cargando productos desde la base de datos:\n ' + JSON.stringify(ProductosArray));
                this.setState({productos: ProductosArray})
            })
            
    }
}

export default Tienda;