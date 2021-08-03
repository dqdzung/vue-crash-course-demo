<template>
	<div v-if="person.firstName">
		<img :class="person.gender" :src="person.picture" :alt="person.firstName" />
		<h1>{{ person.firstName }} {{ person.lastName }}</h1>
		<h3>Email: {{ person.email }}</h3>
		<h3>Phone: {{ person.phone }}</h3>
		<button v-on:click="getUser" :class="person.gender">Get Random User</button>
	</div>
	<h2 v-else>Loading Person...</h2>
</template>

<script>
import { ref } from "vue";

export default {
	setup() {
		const person = ref({});

		const getUser = async () => {
			const res = await fetch("https://randomuser.me/api");
			const { results } = await res.json();

			person.value.firstName = results[0].name.first;
			person.value.lastName = results[0].name.last;
			person.value.email = results[0].email;
			person.value.phone = results[0].phone;
			person.value.gender = results[0].gender;
			person.value.picture = results[0].picture.large;
		};

		getUser();

		return { getUser, person };
	},
};
</script>

<style>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

html,
body {
	font-family: Arial, Helvetica, sans-serif;
}

#app {
	width: 400px;
	height: 100vh;
	margin: auto;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

h1,
h3 {
	margin-bottom: 1rem;
	font-weight: normal;
}

img {
	border-radius: 50%;
	border: 5px #333 solid;
	margin-bottom: 1rem;
}

.male {
	border-color: steelblue;
	background-color: steelblue;
}

.female {
	border-color: pink;
	background-color: pink;
	color: #333;
}

button {
	cursor: pointer;
	display: inline-block;
	background: #333;
	color: white;
	font-size: 18px;
	border: 0;
	padding: 1rem 1.5rem;
}

button:focus {
	outline: none;
}

button:hover {
	transform: scale(0.98);
}
</style>
