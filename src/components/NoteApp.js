import {useEffect, useReducer} from 'react';
import notesReducer from '../reducers/notes';
import NoteList from './NoteList';
import AddNoteForm from './AddNoteForm';
import NotesContext from '../context/notes-context';

import database from '../firebase/firebase';

import '../styles/styles.scss';

const NoteApp = () => {

const [notes,dispatch] = useReducer(notesReducer,[])

const initialNotes= () => {
  return database.ref('notes').once('value')
}

const commonNotes = () => {
  return database.ref('ortak').once('value')
}

//Async Function with await
async function start() {
  const notesOrtak= [];
  const notesPersonal= [];

  const ortak = commonNotes().then((snapshot)=>{
    snapshot.forEach((child)=>{
    notesOrtak.push({...child.val(), key: child.key})
    })
    return notesOrtak
   }) ;
   
  const personal = initialNotes().then((snapshot)=>{
    snapshot.forEach((child)=>{
    notesPersonal.push({...child.val(), key: child.key})
    }) 
    return notesPersonal
  });

const notes = [...await personal, ...await ortak] 

  if(notes) {
    dispatch({type: 'POPULATE_NOTES', notes})
  }
  
} 

useEffect(()=>{
  start()
},[])

  return (
    <NotesContext.Provider value = {{notes, dispatch}}>
      <AddNoteForm />
      <h1>Notes</h1>
      <NoteList />
    </NotesContext.Provider>
  )
}

export {NoteApp as default};

