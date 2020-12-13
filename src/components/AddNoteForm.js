import {useContext} from 'react';
import Form from './Form';
import NotesContext from '../context/notes-context';
import useMousePosition from '../hooks/useMousePosition';
import {uid} from 'uid';

import database from '../firebase/firebase';

const AddNoteForm = ()=>{
  
const {dispatch} = useContext(NotesContext);
const position = useMousePosition();
const id = uid();

const addNote= ({title,body})=>{

    database.ref('notes').push({title, body, id}).then((ref)=>{
      dispatch({
        type: 'ADD_NOTE', 
        title, 
        body,
        id,
        key: ref.key
      })
    })
}
   return (
       <>
            <p>Add Note {position.x} - {position.y}</p>
            <Form onSubmitForm={(e)=>addNote(e)}/>
       </>
   )
}

export { AddNoteForm as default}