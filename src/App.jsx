import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import { useEffect, useState } from 'react';

import { getDataLocalStorage, removeDataLocalStorage } from './helpers';

import Home from './pages/Home';
import DetailHome from './pages/DetailHome';

import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = getDataLocalStorage({ key: 'token' });
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const logout = () => {
    setIsLogin(false);
    removeDataLocalStorage({ key: 'token' });
    window.location.replace('/pokemon');
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <ul style={{ display: 'flex' }}>
            {!isLogin && (
              <>
                <li>
                  <Link to="/auth/login">Login</Link>
                </li>
                <li>
                  <Link to="/auth/register">Register</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/pokemon">Pokemon</Link>
            </li>
            {isLogin && (
              <>
                <li>
                  <Link to="/my-pokemon">My Pokemon</Link>
                </li>
                <li>
                  <Link to="/exchange">Exchange</Link>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              {isLogin ? (
                <Redirect to="/pokemon" />
              ) : (
                <Redirect to="/auth/login" />
              )}
            </Route>

            <Route exact path="/:prefix/:name/detail" component={DetailHome} />

            <Route exact path="/:prefix" component={Home} />
            <Route exact path="/auth/login" component={Login} />
            <Route exact path="/auth/register" component={Register} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
