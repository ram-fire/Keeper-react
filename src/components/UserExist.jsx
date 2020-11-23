import React from "react";

function UserExist(){
    return (
        <div>
              <h1> user already exist </h1>
              <button onClick={()=>{
                  window.location.replace("/login");
              }} className="btn btn-dark" > login </button>
        </div>
    );
}

export default UserExist;