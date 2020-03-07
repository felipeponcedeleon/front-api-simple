import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';

import clienteAxios from '../config/axios';

import Swal from 'sweetalert2';

function NuevoCliente({history}) {

    //cliente = state
    //guardarCliente = función para guardar en el state (setState)
    const[cliente, guardarCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    //leer los datos del formulario
    const actualizarState = (e) => {
        //Almacenar lo que el usuario escribe en el State
        guardarCliente({
            //obtener una copia del state actual
            ...cliente,
            [e.target.name] : e.target.value
        })
    }

    //Validar formulario
    const validarCliente = () => {
        //destructuring
        const { nombre, apellido, email, empresa, telefono } = cliente;

        //revisar que las propiedades del state tengan contenido
        let valido = !nombre.length > 3 || !apellido.length > 3 || !email.length > 3 || !empresa.length > 3 || !telefono.length > 3;

        //return true o false
        return valido;
    }

    //Agregar cliente
    const agregarCliente = (e) => {
          e.preventDefault();

          //petición axios
          clienteAxios.post('/clientes', cliente)
            .then(res => {
                //validar si hay errores de mongodb
                if(res.data.code === 11000) {
                    Swal.fire({
                        type: 'error',
                        title: 'Hubo un error',
                        text: 'Ese cliente ya existe'
                    })
                } else {
                    Swal.fire(
                        'Cliente creado!',
                        res.data.mensaje,
                        'success'
                    )
                }

                //redireccionar
                history.push('/');
            
            })
        }

    return(
        <Fragment>
            <form onSubmit={agregarCliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                           placeholder="Nombre Cliente"
                           name="nombre" 
                           onChange={actualizarState} 
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text"
                           placeholder="Apellido Cliente"
                           name="apellido" 
                           onChange={actualizarState} 
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text"
                           placeholder="Empresa Cliente"
                           name="empresa" 
                           onChange={actualizarState} 
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email"
                           placeholder="Email Cliente"
                           name="email" 
                           onChange={actualizarState}        
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="text"
                           placeholder="Teléfono Cliente"
                           name="telefono" 
                           onChange={actualizarState}        
                    />
                </div>

                <div className="enviar">
                        <input type="submit" 
                               className="btn btn-azul"
                               value="Agregar Cliente"
                               disabled={validarCliente()}
                        />
                </div>

            </form>
        </Fragment>
    );
}

//HOC, función que toma un componente y retorna un nuevo componente
export default withRouter(NuevoCliente);