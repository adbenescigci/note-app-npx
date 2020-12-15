import {useContext} from 'react';
import Note from './Note';
import NotesContext from '../context/notes-context';


const NoteList = () =>{

    const { state } = useContext(NotesContext)
    return state.notes.filter((note)=>note.title.includes(state.filters.text))
                .map((note)=>(
                    <Note key={note.key} note={note} />
                ))
}

export {NoteList as default}