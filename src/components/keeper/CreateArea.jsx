import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab'
import Zoom from '@material-ui/core/Zoom'
function CreateArea(props) {

   const [note,setNote]=useState({
       title:"",
       content:""
   });
   
   function handleChange(event){
       const {name,value}=event.target; 
       setNote(previousValue=>{
           return {
               ...previousValue,
               [name]:value
           }
       });
   }
   const [expanded,setExpand]=useState(false);
   function submitNote(event)
   {
       console.log('adding');
       props.addNote(note);
       setNote({
           title:"",
           content:""
       })
       setExpand(false);
       event.preventDefault();
   }
   function expand()
   {
        setExpand(true);
   }
  return (
    <div>
      <form className="create-note">
      {expanded && 
      <input 
      onChange={handleChange} 
      name="title" 
      placeholder="Title" 
      value={note.title}    
      />}
        <textarea 
        onClick={expand} 
        onChange={handleChange} 
        name="content" 
        placeholder="Take a note..." 
        rows={expanded ? 3:1} 
        value={note.content}
        />
        <Zoom in={expanded ? true :false}>
            <Fab onClick={submitNote}>     
                <AddIcon/>
            </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
