import React from "react";
import NotesIcon from '@material-ui/icons/Notes';
function Header(props){
    return(
    <header>
        <h1><NotesIcon/> Keeper </h1>
        <h4 style={{textAlign: "right"}}>--welcome {props.name}</h4>
    </header>
    );
}

export default Header;