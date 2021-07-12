import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Admin from "./Admin";
import { Home, About, Feedback, Contact, Navbar } from "./Home";

function App() {
  return (
    <div className="App">
      <Navbar>
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/about' >
              <About />
            </Route>
            <Route exact path='/contact' >
              <Contact />
            </Route>
            <Route exact path='/feedback' >
              <Feedback />
            </Route>
            <Route exact path='/AppControlRoom_01'>
              <Admin />
            </Route>
          </Switch>
        </BrowserRouter>
      </Navbar>
    </div>
  );
}

export default App;
