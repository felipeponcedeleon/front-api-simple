import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

import clienteAxios from '../config/axios';

import Spinner from './layout/Spinner';

function EditarProducto(props) {

    const { id } = props.match.params;

    const [producto, guardarProducto ] = useState({
        nombre: '',
        precio: '',
        imagen: ''
    });

    //extraer los valores del State
    const { nombre, precio, imagen } = producto;

    const [archivo, guardarArchivo] = useState('');

    
    useEffect(() => {
        const consultarAPI = async () => {
            const productoConsulta = await clienteAxios.get(`/productos/${id}`);
            guardarProducto(productoConsulta.data);
        }

        consultarAPI();
    }, [])

    const leerInformacionProducto = (e) => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        });
    }

    const leerArchivo = (e) => {
        guardarArchivo(e.target.files[0]);
    }

    const editarProducto = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        try {
            const res = await clienteAxios.put(`/productos/${id}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            });

            if(res.status === 200) {
                Swal.fire(
                    'Agregado Correctamente',
                    res.data.mensaje,
                    'success'
                )
            }

            props.history.push('/productos');
        } catch (error) {
            Swal.fire({
                type: 'error',
                title: 'hubo un error',
                text: 'Vuelva a intentarlo'
            })
        }
    }

    //Spinner de carga
    if(!nombre) return <Spinner />

    return(
        <Fragment>
            <h2>Editar Producto</h2>

            <form onSubmit={editarProducto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                        placeholder="Nombre Producto"
                        name="nombre" 
                        onChange={leerInformacionProducto}
                        defaultValue={nombre}    
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" 
                        name="precio" 
                        min="0.00" 
                        step="1" 
                        placeholder="Precio" 
                        onChange={leerInformacionProducto}    
                        defaultValue={precio} 
                    />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    {imagen ? (
                        <img src={`http://localhost:5000/${imagen}`} alt="Imagen"
                        width="300"
                        />
                    ) : null }
                    <input type="file" 
                        name="imagen" 
                        onChange={leerArchivo}   
                    />
                </div>

                <div className="enviar">
                    <input type="submit" 
                        className="btn btn-azul" 
                        value="Guardar cambios"
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default withRouter(EditarProducto);