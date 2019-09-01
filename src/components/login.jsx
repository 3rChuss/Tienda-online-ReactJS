import React from 'react';
import * as Request from 'superagent';
import { Redirect} from 'react-router-dom';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            usuarioValido : false,
            error: '',
            errorClass: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(event){
        event.preventDefaults();
        if(!this.state.usuarioValido){
            this.setState({errorClass: 'error'})
        }else{
            this.setState({error: '', errorClass:'border-success'})
        }
    }

    render(){
        console.log('3rchuss@gmail.com / 123456');
        
        if(this.state.usuarioValido){
            console.log('Usuario validado.... Redirigiento a la tienda');
            return(
                <Redirect to="/tienda" />
            )
        }
        return(
            <header className="bg-login fill h-100">
                <div className='row'>
                    <div className='col-xl-4 col-lg-6 col-md-8 col-sm-12 m-auto text-white'>
                        <form id='form_login' className="text-center p-5" onSubmit={this.handleSubmit}>
                            <p className="h4 mb-4">Inicia Sesión</p>
                            <span className="text-warning">{this.state.error}</span>
                        <div className='form-group'>
                            <input type="email" className={`${this.state.errorClass} form-control`} id='usuarioInput' placeholder='Usuario' required autoComplete="username" pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"/>
                        </div>
                        <div className='form-group'>
                            <input type="password" className={`${this.state.errorClass} form-control`} id='passwordInput' placeholder='Contraseña' required autoComplete="current-password"/>
                        </div>
                            <button type='button' className='btn btn-success my-4' id='botonIngresar' onClick={this.validarUsuario.bind(this)}>Ingresar</button>
                        </form>
                    </div>
                </div>
            </header>
        )
    };

    validarUsuario() {
        let emailInput = document.getElementById('usuarioInput').value;
        let passwdInput = document.getElementById('passwordInput').value;
        let valido = false;
        
        //pedimos la info a la base de datos
        Request.get('https://ejemplo-http-f025e.firebaseio.com/usuarios.json')
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    let Usuarios = res.body;                     
                    for (let index = 0; index < Usuarios.length; index++) {
                        var element = Usuarios[index];
                        if ((element.email === emailInput) && (element.passwd == passwdInput)) {
                            valido = true;
                            break;
                        }else valido = false;
                    }     
                    if(valido){
                        this.setState({error: '', errorClass: 'border-success', usuarioValido: true});
                        return true;
                    }else{
                        this.setState({ error: 'Email o contraseña no válido', usuarioValido: false, errorClass: 'border-danger'});
                        return false;
                    }
                })
    }
}

export default Login;