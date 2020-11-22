import React, { createContext, useState } from "react";
import {Route,Switch} from "react-router-dom";
import AUTH from "./components/AUTH";
import Register from "./components/Register";
import Login from "./components/Login";
import Keeper from "./components/keeper/Keeper";
import OOP from "./components/keeper/OOP";

const idContext=createContext();

function App(){
  const [id,setId]=useState(null);
  return (
    <>
    <idContext.Provider value={{id,setId}}>
    <Switch>
      <Route exact path="/" component={AUTH} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/keeper" render={()=>
       id!==null ? <Keeper /> : <OOP />
      } />
    </Switch>
    </idContext.Provider>
    </>
  );
}
export default App;
export {idContext};