import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import clienteAxios from '../config/axios';

import Swal from 'sweetalert2';

function EditarCliente(props) {

    //obtener ID
    const { id } = props.match.params;

    const[cliente, datosCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    //Consulta a la API
    const consultarAPI = async() => {
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);

        datosCliente(clienteConsulta.data);
    }

    //useEffect
    useEffect(() => {
        consultarAPI();
    }, []);


    const actualizarState = (e) => {
        datosCliente({
            ...cliente,
            [e.target.name] : e.target.value
        })
    }

    const validarCliente = () => {
        const { nombre, apellido, email, empresa, telefono } = cliente;

        let valido = !nombre.length > 3 || !apellido.length > 3 || !email.length > 3 || !empresa.length > 3 || !telefono.length > 3;

        return valido;
    }

    const actualizarCliente = (e) => {
        e.preventDefault();

        //enviar peticón por axios
        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
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
                        'Cliente actualizado!',
                        res.data.mensaje,
                        'success'
                    )
                }

            });
            props.history.push('/');
    }

    return(
        <Fragment>
            <h2>Editar Cliente</h2>
            <form onSubmit={actualizarCliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                           placeholder="Nombre Cliente"
                           name="nombre" 
                           onChange={actualizarState} 
                           value={cliente.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text"
                           placeholder="Apellido Cliente"
                           name="apellido" 
                           onChange={actualizarState} 
                           value={cliente.apellido}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text"
                           placeholder="Empresa Cliente"
                           name="empresa" 
                           onChange={actualizarState} 
                           value={cliente.empresa}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email"
                           placeholder="Email Cliente"
                           name="email" 
                           onChange={actualizarState}     
                           value={cliente.email}   
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="text"
                           placeholder="Teléfono Cliente"
                           name="telefono" 
                           onChange={actualizarState}      
                           value={cliente.telefono}  
                    />
                </div>

                <div className="enviar">
                        <input type="submit" 
                               className="btn btn-azul"
                               value="Guardar Cambios"
                               disabled={validarCliente()}
                        />
                </div>

            </form>
        </Fragment>
    );
}

//HOC, función que toma un componente y retorna un nuevo componente
export default withRouter(EditarCliente);