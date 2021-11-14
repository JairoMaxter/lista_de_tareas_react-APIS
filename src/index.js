import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import './index.css';

const App = () =>{
    const [taskName, setTaskName] = useState("");
    const [task, setTask] = useState([]);

    return (
        <div className = "contenedor">
            <div  className = "cabecera">
                <h1>Cosas por hacer:</h1>
                <input className = "entrada" placeholder = "Que quieres agregar a la lista?" onChange = {(e) =>{
                    setTaskName(e.target.value)}
                    } onKeyPress = {(e) =>{
                        if(e.key === "Enter"){
                            setTask([...task, taskName]);
                            setTaskName("");
                            e.target.value = "";
                        }
                    }} value = {taskName}></input>
            </div>
            {
                task.map((value, key) =>{
                    return(
                        <div key = {key} id = {key} className = "tarea">
                        <label className = "tareaNombre">{value}</label><label className = "borrar" onClick = {(e) => {
                            let arr = [...task];
                            arr.splice(e.target.parentElement.id, 1)
                            setTask(arr);
                        }}></label>
                    </div>
                    )
                })
            }
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'));