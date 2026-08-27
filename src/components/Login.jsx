import { Button, Col, message, Row, Typography } from 'antd';
import React, { Fragment, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { types } from '../types/types';
import { GoogleCircleFilled, FacebookFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from './firebase';
const Login = ({ history }) => {
    const { dispatch } = useContext(AuthContext)
    const ultimaRuta = localStorage.getItem('ultimaRuta') || '/'
    const iniciar = ({ usuario }) => {
        dispatch({
            type: types.login,
            payload: {
                usuario: usuario
            }
        })
        history.replace(ultimaRuta)
    }
    const Correo = async (e) => {
        e.preventDefault();
        const email = e.target.correo.value;
        const password = e.target.contraseña.value;
        const resultado = await firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
                console.log(error.message)
                message.error(error.message)
            });
        if (resultado) {
            console.log(resultado)
            message.success("Bienvenido a Heroes App amigo");
            iniciar(resultado.user)
        }
    }
    const Google = async () => {
        const providerGoogle = new firebase.auth.GoogleAuthProvider();
        const resultado = await firebase.auth().signInWithPopup(providerGoogle)
            .catch((error) => {
                console.log(error.message)
                message.error(error.message)
            });
        if (resultado) {
            console.log(resultado)
            message.success("Bienvenido a heroes app "+resultado.user.displayName);
            iniciar(resultado.user)
        }
    }
    const Facebook = async () => {
        const providerGoogle = new firebase.auth.FacebookAuthProvider();
        const resultado = await firebase.auth().signInWithPopup(providerGoogle)
            .catch((error) => {
                console.log(error.message)
                message.error(error.message)
            });
        if (resultado) {
            console.log(resultado)
            message.success("Bienvenido a heroes app "+resultado.user.displayName);
            iniciar(resultado.user)
        }
    }

    return (
        <Fragment>
            <Row align="center" justify="middle" style={{ minHeight: "100vh", width: "100%", backgroundImage: `url('/imagenes/fondo.jpg')`, backgroundSize: "cover" }}>
                <Col xs={18} sm={12} lg={10} style={{ background: "#0E1215F2", borderRadius: "5px", padding: "50px 0px" }}>
                    <Row align="center" >
                        <Col xs={20}>
                            <Typography.Title level={1} style={{ color: "white", textAlign: "center", marginBottom: "20px" }} >Bienvenido a HeroesApp</Typography.Title>
                        </Col>
                        <Col xs={15} sm={18} lg={15} >
                            <form onSubmit={Correo}>
                                <p style={{ textAlign: "center" }}>
                                    <input type="email" name="correo" style={{ width: "100%", borderRadius: "3px", border: "none", padding: "10px" }} placeholder="Correo" />
                                </p>
                                <p >
                                    <input type="password" name="contraseña" style={{ width: "100%", borderRadius: "3px", border: "none", padding: "10px" }} placeholder="Contraseña" />
                                    <Link style={{ textAlign: "left" }}>¿Olvidaste tu contraseña?</Link>
                                </p>
                                <p style={{ textAlign: "center" }}>
                                    <Button type="primary" htmlType="submit" style={{ width: "90%", borderRadius: "2rem", backgorund: "red" }}  >Iniciar Sesion</Button>
                                </p>
                            </form>
                            <Typography.Title level={4} style={{ color: "white", textAlign: "center" }}>
                                O
                            </Typography.Title>
                        </Col>
                    </Row>
                    <Row align="center">
                        <Col xs={15} sm={18} lg={15} style={{ textAlign: "center" }}>
                            <p>
                                <Button type="primary" style={{ background: "red", width: "90%", borderRadius: "2rem", border: "none" }} onClick={Google} icon={<GoogleCircleFilled />}>Continuar con Google</Button>
                            </p>
                            <p>
                                <Button type="primary" style={{ background: "#3A6FE5", width: "90%", borderRadius: "2rem", border: "none" }} onClick={Facebook} icon={<FacebookFilled />}>Continuar con Facebook</Button>
                            </p>
                            <p style={{ color: "white" }}>
                                ¿Aún no estás en HeroesApp?  <Link to="/signin" >Regístrate</Link>
                            </p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Fragment>
    )
}
export default Login;