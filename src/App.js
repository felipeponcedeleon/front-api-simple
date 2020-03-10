import React, { Fragment } from 'react';

//Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* Componentes Layout*/
import Header from './componentes/layout/Header';
import Navegacion from './componentes/layout/Navegacion';

/* Componentes App */
import Clientes from './componentes/Clientes';
import NuevoCliente from './componentes/NuevoCliente';
import EditarCliente from './componentes/EditarCliente';

//Productos
import Productos from './componentes/Productos';
import NuevoProducto from './componentes/NuevoProducto';
import EditarProducto from './componentes/EditarProducto';

//Pedidos
import Pedidos from './componentes/Pedidos';


function App() {
  return(
      <Router>
        <Fragment>
          <Header />
          <div className="grid contenedor contenido-principal">
            <Navegacion />
            <main className="caja-contenido col-9">
              <Switch>

                <Route exact path="/" component={Clientes} />

                <Route exact path="/clientes/nuevo" component={NuevoCliente} />

                <Route exact path="/clientes/editar/:id" component={EditarCliente} />

                <Route exact path="/productos" component={Productos} />
                <Route exact path="/productos/nuevo" component={NuevoProducto} />
                <Route exact path="/productos/editar/:id" component={EditarProducto} />

                <Route exact path="/pedidos" component={Pedidos} />
              
              </Switch>
            </main>
          </div>
        </Fragment>
      </Router>
    );
}

export default App;
