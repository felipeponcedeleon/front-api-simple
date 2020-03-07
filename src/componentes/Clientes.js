//HOOKS useEffect ahora se utiliza en vez de
//componentDidMount() y componentWillMount()
import React, { useEffect, useState, Fragment } from 'react';

//Link
import { Link } from 'react-router-dom';

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
    }, [clientes]);
    //arreglo vacío para ejecutarse solo una vez
    //si se le pasa el state (cliente) entonces
    //se va a volver a llamar si encuentra alguna modificación

    return(
        <Fragment>
            <h2>Clientes</h2>

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

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