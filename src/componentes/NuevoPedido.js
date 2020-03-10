import React, { useState, useEffect, Fragment } from 'react';

import clienteAxios from '../config/axios';

import FormBuscarProducto from './FormBuscarProducto';

import Swal from 'sweetalert2';

function NuevoPedido(props) {

    const { id } = props.match.params;

    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');

    useEffect(() => {
        const consultarAPI = async () => {
            const consultarCliente = await clienteAxios.get(`/clientes/${id}`);
            guardarCliente(consultarCliente.data);
        }
        consultarAPI();
    }, []);

    const { nombre, apellido, telefono } = cliente;

    const buscarProducto = async(e) => {
        e.preventDefault();
       
        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);
    
        if(resultadoBusqueda.data[0]) {

        } else {
            Swal.fire({
                type: 'error',
                title: 'Resultados',
                text: 'No se encontraron resultados.'
            })
        }

    }

    const leerDatosBusqueda = (e) => {
        guardarBusqueda(e.target.value);
    }

    return(
        <Fragment>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombre: {nombre} {apellido}</p>
                <p>Teléfono: +{telefono}</p>
            </div>
            
            <FormBuscarProducto
                buscarProducto={buscarProducto}
                leerDatosBusqueda={leerDatosBusqueda}
            />

            <ul className="resumen">
                <li>
                    <div className="texto-producto">
                        <p className="nombre"></p>
                        <p className="precio"></p>
                    </div>
                    <div className="acciones">
                        <div className="contenedor-cantidad">
                            <i className="fas fa-minus"></i>
                            <input type="text" name="cantidad" />
                            <i className="fas fa-plus"></i>
                        </div>
                        <button type="button" className="btn btn-rojo">
                            <i className="fas fa-minus-circle"></i>
                                Eliminar Producto
                        </button>
                    </div>
                </li>
            </ul>
            <div className="campo">
                <label>Total:</label>
                <input type="number" name="precio" placeholder="Precio" readonly="readonly" />
            </div>
            <div className="enviar">
                <input type="submit" class="btn btn-azul" value="Agregar Pedido" />
            </div>
        
        </Fragment>
    )
}

export default NuevoPedido;