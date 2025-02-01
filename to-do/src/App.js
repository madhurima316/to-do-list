import React from 'react';
import './index.css';

function App() {
  const [task,setTask]= React.useState(()=>{
    return (JSON.parse(localStorage.getItem('taskList')) || [])
  });
  
  React.useEffect(()=>{
    localStorage.setItem('taskList',JSON.stringify(task));
  },[task])

  function addItem(event){
    if (event.key==='Enter'){
      setTask([...task,event.target.value]);
      event.target.value='';
    }
  }
  function newItem(){
    setTask([...task,document.getElementById('inputBox').value]);
    document.getElementById('inputBox').value='';
  }
  function delItem(val){
    setTask(prevTask=>prevTask.filter(item => item!==val));
  }
  function edit(value){
    document.getElementById('inputBox').value=value;
    delItem(value);
  }

  return (
    <div className="App">
      <h1 id='heading'>TO-DO LIST</h1>
      <div className='searchBox'>
      <input id='inputBox' type='text' placeholder='Enter task' onKeyDown={addItem} /> 
      <i onClick={newItem} className="fa-solid fa-plus"></i>
      </div>

      {task.map((value,index)=> (<li key={index}>
        <input className='checkBox' type='checkbox' name={value}/>
        <label htmlFor={value}>{value}</label>

        <div className='icons'>
        <i className="fa-solid fa-pen-to-square" onClick={()=>edit(value)}></i>
        <i className="fa-solid fa-trash" onClick={()=>delItem(value)}></i></div>

        </li>))}

    </div>
  );
}

export default App;
