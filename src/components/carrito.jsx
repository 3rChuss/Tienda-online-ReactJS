import React from 'react';

class Carrito extends React.Component{
    constructor(){
        super()
    }

    render(){
        console.log(this.props)
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h1>Carrito de la compra</h1>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Carrito;