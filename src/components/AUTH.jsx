import React, { useContext, useEffect } from "react";
import {Link} from "react-router-dom"
import {idContext} from "../App";

function AUTH()
{
    const context=useContext(idContext);
    useEffect(()=>{
        context.setId(null);
    });
    return (
    <div className="jumbotron centered">
         <div className="container">
            <i className="fas fa-key fa-6x"></i>
            <h1 className="display-3">Keeper</h1>
            <p className="lead">Keep Your Notes safe</p>
            <hr />
            <Link className="btn btn-light btn-lg" to="/register" role="button">Register</Link>
            <Link className="btn btn-dark btn-lg" to="/login" role="button">Login</Link>
         </div>
   </div>
    );
}

export default AUTH;