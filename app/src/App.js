import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginPage from './Pages/Login/LoginPage';
import DashboardPage from './Pages/Dashboard/DashboardPage';
import RecipePage from './Pages/Recipes/RecipePage';
import './App.css';
import GlobalState from './Context/GlobalState';
import AppContext from './Context/app-context';
import { AuthContext } from './Context/auth';

import MikeyTicTacToe from './Pages/MikeyTicTacToe/Pages/MikeyApp/MikeyApp';
import EmmaTicTacToe from './Pages/EmmaTicTacToe/EmmaTicTacToe';
import PrivateRoute from './Shared/PrivateRoute';


const App = () => {
    // const existingTokens = JSON.parse(localStorage.getItem("tokens"));
    const [authTokens, setAuthTokens] = useState(false);

    const setTokens = (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        console.log('setting', data);
        setAuthTokens(data);
    };

  return (
    <GlobalState>
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <AppContext.Consumer>
                {() => (
                  <Router>
                    <div>
                      {/* A <Switch> looks through its children <Route>s and
                      renders the first one that matches the current URL. */}
                      <Switch>
                        <PrivateRoute path="/dashboard" component={DashboardPage} />
                        <PrivateRoute path="/recipe" component={RecipePage}/>
                        <PrivateRoute path="/mikey-tic-tac-toe" component={MikeyTicTacToe} />
                        <PrivateRoute path="/emma-tic-tac-toe" component={EmmaTicTacToe} />
                        <Route path="/" component={LoginPage} />
                      </Switch>
                    </div>
                  </Router>
                )}
            </AppContext.Consumer>
        </AuthContext.Provider>
    </GlobalState>
    );
};

export default App;