import {useState} from 'react'

const Form = ({onSubmitForm,data})=>{
    
const [title,setTitle] = useState('');
const [body,setBody] = useState('');

const submitForm = (e)=>{
    e.preventDefault();
    onSubmitForm({title,body})
    setTitle('');
    setBody('');
}
    return <form onSubmit = {submitForm}>
        <input value={title} placeholder={data.title} onChange = {(e)=>setTitle(e.target.value)} />
        <textarea value={body} placeholder={data.body} onChange = {(e)=>setBody(e.target.value)} />
        <button>submit</button>
    </form>
}

Form.defaultProps={
   data:{
       title:'',
       body:''
   }
}

export {Form as default}