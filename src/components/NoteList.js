import {useContext} from 'react';
import Note from './Note';
import NotesContext from '../context/notes-context';


const NoteList = () =>{

    const { notes } = useContext(NotesContext)
   
    return notes.map((note)=>(
        <Note key={note.key} note={note} />
       ))
}

export {NoteList as default}