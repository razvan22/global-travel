// import logo from './logo.svg';
// <img src={logo} className="App-logo" alt="logo" />

import './App.css';
import axios from "axios";
import Post from "./page/Post";
import { useState } from "react";
import Login from "./page/Login";
import HomeView from "./page/Home";
import Navbar from "./components/Navbar";
import RegisterView from "./page/Register";
import PostPublish from "./page/PostPublish"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/post/:id" component={Post} />
          <Route path="/" exact component={HomeView} />
          <Route path="/register" component={RegisterView} />
          <Route path="/publish" exact component={PostPublish} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;