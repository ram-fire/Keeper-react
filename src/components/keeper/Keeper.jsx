import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import axios from "axios";
import "./Keeper.css";
import {idContext} from "../../App";
function Keeper() {

  const [Notes,setNotes]=useState([]);
  const [fullname,setFullname]=useState(null);
  const context=useContext(idContext);
  useEffect(()=>{
    //console.log("in keeper "+context.id);
    axios.get('https://radiant-reaches-85700.herokuapp.com/'+context.id)
    .then(function (response) {
      //console.log(response.data);
      setFullname(response.data.fullname);
      setNotes(response.data.notes);
    })
    .catch(function (error) {
      console.log(error);
    })
  });

  function addNote(note){
    axios.post("https://radiant-reaches-85700.herokuapp.com/"+context.id,note)
    .then((response)=>{
      console.log("note added");
      setNotes(prevValue=>{
      return [...prevValue,note];
      });
    })
    .catch((error)=>{console.log(error)}) 
  }
  function deleteNote(noteId)
  {
      axios.delete("https://radiant-reaches-85700.herokuapp.com/delete/"+context.id+"/"+noteId)
      .then((response)=>{
        setNotes((prevValue)=>{
          return prevValue.filter((note)=>{
            return note._id!==noteId;
          });
      })
    });
  }
   if(context.id!=null)
   {
    return (
      <div>
        <Header 
          name={fullname}
        />
        <CreateArea 
          key={context.id}
          addNote={addNote}
        />
        {Notes.map((note)=>(
          <Note 
              key={note._id}
              id={note._id}
              title={note.title}
              content={note.content}
              deleteNote={deleteNote}
          />
        ))}
        <Footer />
      </div>
    );
  }
  else
  {
    return (
      <h1>not logged in</h1>
    );
  }
}

export default Keeper;
