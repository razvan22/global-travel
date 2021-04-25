// import logo from './logo.svg';
// <img src={logo} className="App-logo" alt="logo" />

import './App.css';
import axios from "axios";
import Post from "./page/Post";
import Login from "./page/Login";
import HomeView from "./page/Home";
import Navbar from "./components/Navbar";
import RegisterView from "./page/Register";
import PostPublish from "./page/PostPublish"
import { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {UserContext} from "./global-context/UserContext";
import {PageUpdate} from "./global-context/UpdateContext";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
 const [user,setUser] = useState();
 const [update, setUpdate] = useState(false);
  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar />
          <Switch>
            <Route path="/login" component={Login} />
            <PageUpdate.Provider value={{update, setUpdate}}>
              <Route path="/post/:id" component={Post} />
              <Route path="/" exact component={HomeView} />
            </PageUpdate.Provider>
            <Route path="/register" component={RegisterView} />
            <Route path="/publish" exact component={PostPublish} />
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;