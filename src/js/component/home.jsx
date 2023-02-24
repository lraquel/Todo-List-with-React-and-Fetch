import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	/*estas son las constantes para crear-modificar la lista*/
	const [inputValue, SetInputValue]=useState("");
	const [list, setList]=useState([]);

	/*acá creo el usuario*/
	const newUser = () => {
		fetch('http://assets.breatheco.de/apis/fake/todos/user/Lraquelr6', {
			method: "POST",
			headers: { 
				"Content-Type" : "application/json",
			},
			body: JSON.stringify([]),
		})
		.then((res) => res.json())
		.then((data) => setList(data))
		.catch((error) => console.log(error));
	};

	/*obtengo las tareas*/
	const getTask = () => {
		fetch('http://assets.breatheco.de/apis/fake/todos/user/Lraquelr6')
		.then((res) => res.json())
		.then((data) => console.log(data))
		.catch((error) => console.log(error));
	};

	/*actualizo tareas*/
	const actualizarTasks = (tasks) => {
		fetch('http://assets.breatheco.de/apis/fake/todos/user/Lraquelr6', {
			method: "PUT",
			headers: { 
				"Content-Type" : "application/json",
			},
			body: JSON.stringify([tasks]),
		})
		.then((res) => res.json())
		.then((data) => setList(data))
		.catch((error) => console.log(error));

	};

	/*elimino tareas*/ 
	const eliminar = () => {
		setList([]);
		fetch('http://assets.breatheco.de/apis/fake/todos/user/Lraquelr6', {
			method: "PUT",
			headers: { 
				"Content-Type" : "application/json",
			},
			body: JSON.stringify([]),
		})
		.then((res) => res.json())
		.then((data) => setList(data))
		.catch((error) => console.log(error));

	};

	useEffect( () => {
		/*traigo lista de tareas*/ 
		getTask();
	}, []);

	return (
		<div className="container text-center" style={{
			padding: "5%",
			border: "10%",
			background: 'url("https://static.vecteezy.com/system/resources/thumbnails/009/360/076/small/watercolor-pastel-cloud-background-free-vector.jpg")',
			width: "100%", 
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
			
			
		  }} >

			<div>
				<h1 className="text-center mt-5 mb-3 text-info" style={{fontFamily: "cursive", fontWeight: "bold"}}>Mi Lista de Tareas</h1>
			</div>

			<div className="barrainput">
				       <input className="form-control  border border-info mb-3 bg-light" type="text" 
				       onChange={ (e) => SetInputValue(e.target.value)}
					   value={inputValue}
					   onKeyDown={(e) => {
						if (e.key === "Enter"){
							setList(list.concat({label: inputValue, done: false}));
							SetInputValue("");
							actualizarTasks(list.concat({label: inputValue, done: false}));
						}
					   }
					   }
					   placeholder="Agregar Lista de Tareas... "/>
					   
			</div>

			<div>
				<ul>
					{list.map((item,index)=> (
						<li className="list-group-item d-flex justify-content-between mb-1 border border-light">
						
							  {item.label}
							
							<button className="btn btn-outline-info"
							    onClick={ ()=> setList(list.filter((t,currentIndex)=> index !== currentIndex)) }><i class="fa fa-trash-alt"></i></button>
						</li>
					))}
					
				</ul>
			</div>
			
			<div className="text-danger mb-3" style={{fontFamily: "cursive" }}>
				{list.length} Tareas Pendientes
			</div>

			<div>
				<button className="btn btn-outline-info" onClick={eliminar}>
					Eliminar Listado
				</button>
			</div>
			
		</div>
	);
};

export default Home;
