import React, { Fragment } from 'react';

//Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* Componentes Layout*/
import Header from './componentes/layout/Header';
import Navegacion from './componentes/layout/Navegacion';

/* Componentes App */
import Clientes from './componentes/Clientes';
import Productos from './componentes/Productos';
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

                <Route exact path="/productos" component={Productos} />

                <Route exact path="/pedidos" component={Pedidos} />
              
              </Switch>
            </main>
          </div>
        </Fragment>
      </Router>
    );
}

export default App;
