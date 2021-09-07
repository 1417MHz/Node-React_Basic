import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage.js';
import LoginPage from './components/views/LoginPage/LoginPage.js';
import RegisterPage from './components/views/RegisterPage/RegisterPage.js';
// import NavBar from './components/views/NavBar/NavBar.js';
// import Footer from './components/views/Footer/Footer.js';
import UserAuth from './hoc/auth.js';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path = "/" component = {UserAuth(LandingPage, null)} />
          <Route exact path = "/login" component = {UserAuth(LoginPage, false)} />
          <Route exact path = "/register" component = {UserAuth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
