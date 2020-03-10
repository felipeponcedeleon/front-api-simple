import React, {useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

import clienteAxios from '../config/axios';


function NuevoProducto(props) {

    //producto = state, guardarProducto = setState
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: ''
    });

    const [archivo, guardarArchivo] = useState('');

    //leer los datos del formulario
    const leerInformacionProducto = e => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    //coloca la imagen en el state
    const leerArchivo = e => {
        //console.log(e.target.files);
        guardarArchivo(e.target.files[0]);
    }

    const agregarProducto = async (e) => {
        e.preventDefault();

        //crear formdata (se crea cuando en el envío se adjunta un archivo de imagen)
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        //almacenar en la DB
        try {
            const res = await clienteAxios.post('/productos', formData, {
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


    return(
        <Fragment>
            <h2>Nuevo Producto</h2>

            <form onSubmit={agregarProducto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                        placeholder="Nombre Producto"
                        name="nombre" 
                        onChange={leerInformacionProducto}    
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
                    />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file" 
                        name="imagen" 
                        onChange={leerArchivo}   
                    />
                </div>

                <div className="enviar">
                    <input type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Producto" 
                        
                    />
                </div>
            </form>
        </Fragment>
        
    );
}

export default withRouter(NuevoProducto);