import React from "react";
import './App.css';
import Header from "./components/Header/Header";
import Cookies from 'universal-cookie';
import {API_URL, API_KEY_3, callApi} from "./api/api"

import VideosPage from "./components/pages/VideosPage/VideosPage"
import VideoPage from "./components/pages/VideoPage/VideoPage"
import Mylist from "./components/Filters/Mylist"

import { BrowserRouter, Route } from "react-router-dom";
 
const cookies = new Cookies();

export default class App extends React.Component {
  constructor() {                               
    super()

    this.state = {                              
      user: null,
      session_id: null,
    };
  }

  updateUser = user => {                        
    this.setState({
      user
    });
  };
  
  updateSessinId = session_id => {        
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.setState({
      session_id
    });
  };

  logOut = () => {
    cookies.remove("session_id")                     
    this.setState({
      session_id: null,
      user: null
    });
  };

  
                                                                
  componentDidMount() {                                  
    const session_id = cookies.get("session_id");         
    console.log(session_id);
    if (session_id) {                                  
      callApi(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`)
      .then(user => {                                  
        this.updateUser(user);
        this.updateSessinId(session_id);
      });
    }
  }

  render() {
    const { user, session_id} = this.state;         
    return (
      <BrowserRouter>          

          <Header user={user} updateUser={this.updateUser} session_id={session_id} logOut={this.logOut} updateSessinId={this.updateSessinId} />      
          
          <Route exact path="/" component={VideosPage} />
          <Route path="/my-library" component={Mylist} />
          <Route path="/movie/:id" component={VideoPage} />
        
      </BrowserRouter>
    );
  }
};







