import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import clienteAxios from '../config/axios';

import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';

import Swal from 'sweetalert2';

function NuevoPedido(props) {

    const { id } = props.match.params;

    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([]);
    const [total, guardarTotal] = useState(0);

    useEffect(() => {
        const consultarAPI = async () => {
            const consultarCliente = await clienteAxios.get(`/clientes/${id}`);
            guardarCliente(consultarCliente.data);
        }
        consultarAPI();

        actualizarTotal();

    }, [productos]);

    const { nombre, apellido, telefono } = cliente;

    const buscarProducto = async(e) => {
        e.preventDefault();
       
        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);

        if(resultadoBusqueda.data[0]) {

            let productoResultado = resultadoBusqueda.data[0];
            productoResultado.producto = resultadoBusqueda.data[0]._id;
            productoResultado.cantidad = 0;

            guardarProductos(
                [...productos, productoResultado]
            );


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

    const restarProductos = (i) => {
        const restarCantidad = [...productos];

        if(restarCantidad[i].cantidad === 0) return;

        restarCantidad[i].cantidad--;

        guardarProductos(restarCantidad);
    }

    const sumarProductos = (i) => {
        const sumarCantidad = [...productos];

        sumarCantidad[i].cantidad++;

        guardarProductos(sumarCantidad);
    }


    const eliminarProductoPedido = (id) => {
        const todosLosProductos = productos.filter(producto => producto.producto !==id);
        guardarProductos(todosLosProductos);
    }



    const actualizarTotal = () => {
        if(productos.length === 0){
            guardarTotal(0);
            return;
        }

        let nuevoTotal = 0;

        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        guardarTotal(nuevoTotal);

    }

    const realizarPedido = async (e) => {
        e.preventDefault();

        const { id } = props.match.params;

        const pedido = {
            "cliente": id,
            "pedido": productos,
            "total": total
        }

        //console.log(pedido);
        const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);
        
        if(resultado.status === 200) {
            Swal.fire({
                type: 'success',
                title: 'Correcto',
                text: resultado.data.mensaje
            })
        } else {
            Swal.fire({
                type: 'error',
                title: 'Ocurrió un error',
                text: 'Vuelva a intentar mas tarde.'
            })
        }

        props.history.push('/pedidos');

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
                {productos.map((producto, index) =>(
                    <FormCantidadProducto 
                        key={producto.producto}
                        producto={producto}
                        restarProductos={restarProductos}
                        sumarProductos={sumarProductos}
                        index={index}
                        eliminarProductoPedido={eliminarProductoPedido}
                    />
                ))}
            </ul>

            <p className="total">Total a Pagar: <span>$ {total}</span> </p>
            { total > 0 ? (
                <form onSubmit={realizarPedido}>
                    <input type="submit"
                        className="btn btn-verde btn-block"
                        value="Realizar Pedido"
                    />
                </form>
            ): null }
        
        </Fragment>
    )
}

export default withRouter(NuevoPedido);