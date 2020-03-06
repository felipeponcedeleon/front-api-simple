//HOOKS useEffect ahora se utiliza en vez de
//componentDidMount() y componentWillMount()
import React, { useEffect, useState, Fragment } from 'react';

//import cliente axios
import clienteAxios from '../config/axios';

//Componentes
import Cliente from './Cliente';

function Clientes() {

    //State
    //clientes = state
    //guardarClientes = setState
    const [clientes, guardarClientes] = useState([]);

    //Llamando a la API
    //Todos los clientes
    const consultarAPI = async() => {
        const clientesConsulta = await clienteAxios.get('/clientes');
        //console.log(clientesConsulta.data);

        //Colocar resutado en el state
        guardarClientes(clientesConsulta.data);
    }

    //equivalente a componentDidMount() y componentWillMount()
    useEffect(() => {
        consultarAPI();
    }, []);
    //arreglo vacío para ejecutarse solo una vez

    return(
        <Fragment>
            <h2>Clientes</h2>

            <ul className="listado-clientes">
                {clientes.map(cliente => (
                    <Cliente
                        key={cliente._id}
                        cliente={cliente}
                    />
                ))}
            </ul>
        </Fragment>
    );
}

export default Clientes;