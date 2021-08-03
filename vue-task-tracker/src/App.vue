<template>
	<div class="container">
		<Header
			title="Task Tracker"
			@toggle-add-form="toggleAddForm"
			:showAddForm="showAddForm"
		/>
		<div v-show="showAddForm">
			<AddTask @add-task="addTask" />
		</div>
		<div v-if="tasks.length">
			<Tasks
				:tasks="tasks"
				@toggle-reminder="toggleReminder"
				@delete-task="deleteTask"
			/>
		</div>
		<div v-else>Loading Tasks...</div>
	</div>
</template>

<script>
import Header from "./components/Header.vue";
import Tasks from "./components/Tasks.vue";
import AddTask from "./components/AddTask.vue";

import getTasks from "./composables/getTasks";

import { ref } from "vue";

export default {
	name: "App",
	components: {
		Header,
		Tasks,
		AddTask,
	},
	setup() {
		const showAddForm = ref(false);
		const { tasks, loadTasks } = getTasks();

		loadTasks();

		const addTask = async (task) => {
			const res = await fetch("http://localhost:5000/tasks", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(task),
			});
			const data = await res.json();

			tasks.value = [...tasks.value, data];
		};

		const deleteTask = async (id) => {
			const res = await fetch(`http://localhost:5000/tasks/${id}`, {
				method: "DELETE",
			});
			res.status === 200
				? (tasks.value = tasks.value.filter((task) => task.id !== id))
				: alert("Delete task failed");
		};

		const toggleReminder = async (id) => {
			const taskToToggle = await fetchTask(id);
			const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

			const res = await fetch(`http://localhost:5000/tasks/${id}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(updatedTask),
			});

			const data = await res.json();

			tasks.value = tasks.value.map((task) =>
				task.id === id ? { ...task, reminder: data.reminder } : task
			);
		};

		const toggleAddForm = () => {
			showAddForm.value = !showAddForm.value;
		};

		const fetchTask = async (id) => {
			const res = await fetch(`http://localhost:5000/tasks/${id}`);
			return await res.json();
		};

		return {
			tasks,
			showAddForm,
			addTask,
			deleteTask,
			toggleReminder,
			toggleAddForm,
		};
	},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
body {
	font-family: "Poppins", sans-serif;
}
.container {
	max-width: 500px;
	margin: 30px auto;
	overflow: auto;
	min-height: 300px;
	border: 1px solid steelblue;
	padding: 30px;
	border-radius: 5px;
}
.btn {
	display: inline-block;
	background: #000;
	color: #fff;
	border: none;
	padding: 10px 20px;
	margin: 5px;
	border-radius: 5px;
	cursor: pointer;
	text-decoration: none;
	font-size: 15px;
	font-family: inherit;
}
.btn:focus {
	outline: none;
}
.btn:active {
	transform: scale(0.98);
}
.btn-block {
	display: block;
	width: 100%;
}
</style>
