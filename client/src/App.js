import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage.js';
import LoginPage from './components/views/LoginPage/LoginPage.js';
import RegisterPage from './components/views/RegisterPage/RegisterPage.js';
import NavBar from './components/views/NavBar/NavBar.js';
import Footer from './components/views/Footer/Footer.js';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path = "/" component = {LandingPage} />
          <Route exact path = "/login" component = {LoginPage} />
          <Route exact path = "/register" component = {RegisterPage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
