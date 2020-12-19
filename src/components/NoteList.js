import {useContext} from 'react';
import Note from './Note';
import NotesContext from '../context/notes-context';


const NoteList = () =>{

    const { state } = useContext(NotesContext)
    const endDate = state.filters.endDate;
    const startDate = state.filters.startDate;

    return state.notes.filter((note)=>{
                          return note.title.includes(state.filters.text) && 
                          (!endDate || endDate >= note.eDate) && 
                          (!startDate || note.sDate >= startDate)
                        })
                      .map((note)=>(
                        <Note key={note.key} note={note} />
                       ))
}

export {NoteList as default}