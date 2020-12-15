import {useEffect, useReducer} from 'react';
import combineReducers from 'react-combine-reducers';
import notesReducer from '../reducers/notes';
import filterReducer from '../reducers/filter';
import NoteList from './NoteList';
import AddNoteForm from './AddNoteForm';
import NotesContext from '../context/notes-context';

import database from '../firebase/firebase';

import '../styles/styles.scss';

const NoteApp = () => {
  
const initNotes = [];
const initFilters = {text:'', date:0};

const [reducer, initial] = combineReducers({
  notes: [notesReducer, initNotes],
  filters: [filterReducer, initFilters]
});

const [state, dispatch] = useReducer(reducer, initial);

const initialNotes= () => {
  return database.ref('notes').once('value')
}

const commonNotes = () => {
  return database.ref('ortak').once('value')
}

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

const onSetText = (e)=>{
  dispatch({type: 'SET_TEXT', text: e.target.value})
}

useEffect(()=>{
},[state])

useEffect(()=>{
  start()
},[])

  return (
    <NotesContext.Provider value = {{state, dispatch}}>
      <AddNoteForm />
      <h1>Notes</h1>
      <input value = {state.filters.text} onChange = {(e)=>onSetText(e)}/>
      <NoteList />
    </NotesContext.Provider>
  )
}

export {NoteApp as default};

