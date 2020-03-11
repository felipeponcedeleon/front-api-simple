import React, {useEffect, useState, Fragment} from 'react';
import clienteAxios from '../config/axios';
import { Link } from 'react-router-dom';

import DetallePedido from './DetallePedido';

function Pedidos() {

    const [pedidos, guardarPedidos] = useState([]);

    useEffect(() => {
        const consultarAPI = async () => {
            const resultado = await clienteAxios.get('/pedidos');
            guardarPedidos(resultado.data);
        }

        consultarAPI();

    }, []);

    return(
        <Fragment>
            <h2>Pedidos</h2>

            <ul className="listado-pedidos">
                {pedidos.map(pedido => (
                    <DetallePedido 
                        key={pedido._id}
                        pedido={pedido}
                    />
                ))}
                
            </ul>
        </Fragment>
    );
}

export default Pedidos;