import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: "josegaldamez1991@gmail.com",
        lPassword: "123456"
    });

    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rEmail: "josegaldamez1991@gmail.com",
        rPassword: "123456",
        rPassword2: "123456",
        rName:"Jose",
    });

    const {rEmail, rPassword, rPassword2, rName} = formRegisterValues;



    const { lEmail, lPassword } = formLoginValues;

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch( startLogin( lEmail, lPassword ) );
    }


    const handleRegister = (e) => {
        e.preventDefault();

        if (rPassword !== rPassword2) {
            Swal.fire( "Error", "Las constraseñas deben ser iguales", 'error' );
            return;
        }

        dispatch( startRegister( rEmail, rName, rPassword ) );

    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                value={lEmail}
                                onChange={handleLoginInputChange}
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='lEmail'
                            />
                        </div>
                        <div className="form-group">
                            <input
                                value={lPassword}
                                onChange={handleLoginInputChange}
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='lPassword'
                            />
                        </div>
                        <div className="form-group">
                            <input

                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister} >
                        <div className="form-group">
                            <input
                                type="text"
                                value={ rName }
                                name='rName'
                                onChange={handleRegisterInputChange}
                                className="form-control"
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                value={rEmail}
                                name='rEmail'
                                onChange={handleRegisterInputChange}
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                value={rPassword}
                                name='rPassword'
                                onChange={handleRegisterInputChange}
                                className="form-control"
                                placeholder="Contraseña"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                value={rPassword2}
                                name='rPassword2'
                                onChange={handleRegisterInputChange}
                                className="form-control"
                                placeholder="Repita la contraseña"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
