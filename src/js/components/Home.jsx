import React, { useState, useEffect } from "react";
import { TaskList } from "./TaskList";


const Home = () => {

	const [newtask, setNewTask] = useState('')
	const [taskList, setTaskList] = useState([])

	const getTodos = async () => {
		try {
			const response = await fetch('https://playground.4geeks.com/todo/users/Pedro')
			if (!response.ok){
				createPedro()
				return
			}
			const data = await response.json()
			setTaskList(data.todos)

		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		getTodos()
	}, [])
	const createPedro = async () => {
		try {
			const response = await fetch('https://playground.4geeks.com/todo/users/Pedro', {
			 method: 'POST',
			})
			getTodos()

		} catch (error) {
			console.log(error)
		}
	}

	const onChange = (e) => {
		setNewTask(e.target.value)

	}
	const onKeyDown = (e) => {
		if (e.keyCode === 13 && newtask.trim() !== "") {
			try {
				const addTodos = async () => {
					const response = await fetch('https://playground.4geeks.com/todo/todos/Pedro', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"label": newtask,
							"is_done": false,
						})
					})
					if (response.status === 201) {
						getTodos()
						setNewTask('')
					}
				}
				addTodos()

			} catch (error) {
				console.log(error);
			}
		}
	}
	const removeTask = async (id) => {
		const response = await fetch('https://playground.4geeks.com/todo/todos/' + id, {
						method: 'DELETE',
					})
					getTodos()
		
	}

	return (
		<div className="text-center">
			<h1>Todo List</h1>
			<br />
			<div >
				<input className="text-center border w-50 " placeholder="Escribe tu Tarea" onChange={onChange} onKeyDown={onKeyDown} value={newtask} />
			</div>
			<div className="d-flex justify-content-center h-50">
				{taskList.length === 0 ? (
					<p>Añadir tus tareas</p>
				) : (
					<TaskList tasks={taskList} removeTask={removeTask} />
				)}
			</div>
			<div className="d-flex justify-content-center ">
				{taskList.length === 0 ? (
					<p>No hay tareas, añadir tareas!</p>
				) : (<p className="border w-50 text-start last-page" >{taskList.length} Tareas pendientes</p>)}
			</div>
		</div>
	);
};

export default Home;