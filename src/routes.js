import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Cadastro from './pages/Cadastro/index';
import Login from './pages/login/index';
import './style.css';

function Routes() {
  return(
    <Router>
      <Switch>
        <Route path="/cadastro" component= {Cadastro}/>
        <Route path="/" component= {Login}/>
      </Switch>
    </Router>
);
}

export default Routes;
