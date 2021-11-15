import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from "react";
import './index.css';

const App = () => {
    const [taskName, setTaskName] = useState({ label: "", done: false });
    const [task, setTask] = useState([]);

    const put = async (data = []) => {
        if (!data.length) return
        console.log("PUT Func Data: ", data)
        console.log("Data en JSON: ", JSON.stringify(data))

        try {
            const res = await fetch("https://assets.breatheco.de/apis/fake/todos/user/JairoMaxter", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })

            console.log("Status PUT: ", res.status)
            const text = await res.json()
            console.log("Text PUT: ", text)
        } catch (e) {
            console.log("Error: ", e)
        }
    }

    const get = async () => {
        console.log("In GET")
        const res = await fetch("https://assets.breatheco.de/apis/fake/todos/user/JairoMaxter", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await res.json()
        const map = data.map(it => it.label !== "sample task" && it)
        console.log("Test Map:", map)
        !map[0] ? setTask([]) : setTask(map)
    }

    const crear = async () => {
        console.log("Funcion Creacion...")
        try {
            const res = await fetch("https://assets.breatheco.de/apis/fake/todos/user/JairoMaxter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: "[]"
            })
            if (res.status === 400) {
                console.log("Codigo 400, El usuario ya existe...")
                get()
                return
            } else {
                console.log("Usuario creado codgio: 200")
                const data = await res.json()
                console.log(data)
                get()
            }
        } catch (e) {
            console.log("Error en Creacion: ", e)
        }

    }

    const del = async () => {
        try {
            const res = await fetch("https://assets.breatheco.de/apis/fake/todos/user/JairoMaxter", {
                method: "DELETE",
                headers: {                    
                    "Content-Type": "application/json"
                }
            })

            console.log("DEL Func: ")
            console.log("DEL STATUS: ", res.status)
            const data = await res.json()
            console.log("DEL TEXT: ", data)

            crear()

        } catch (e) {
            console.log("Error: ", e)
        }
    }

    put(task)
    useEffect(() => {
        crear();
    }, [])

    return (
        <div className="contenedor">
            <div className="cabecera">
                <div>
                    <h1 className= "texth">Cosas por hacer:</h1>
                    <input className="entrada" placeholder="Que quieres agregar a la lista?" onChange={(e) => {
                        setTaskName({...taskName, label: e.target.value})
                    }
                    } onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            setTask([...task, taskName]);
                            setTaskName({label: "", done: false});
                            console.log("Tarea a Procesar: ", taskName)
                        }
                    }} value={taskName.label}></input>                    
                </div>
                <div>
                <button onClick={() => {
                    setTask([])
                }}>Eliminar</button>
                </div>
            </div>
            {
                task.map((value, key) => {
                    return (
                        <div key={key} id={key} className="tarea">
                            <label className="tareaNombre">{value.label}</label><label className="borrar" onClick={(e) => {
                                let arr = [...task];
                                arr.splice(e.target.parentElement.id, 1)
                                setTask(arr);
                                setTaskName({label: "", done: false})
                                put(arr)
                            }}></label>
                        </div>
                    )
                })
            }
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'));