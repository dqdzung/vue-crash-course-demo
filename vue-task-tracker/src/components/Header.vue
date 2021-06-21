<template>
	<header>
		<h1>{{ title }}</h1>
		<Button
			:text="showAddForm ? 'Close' : 'Add Task'"
			:color="showAddForm ? 'red' : 'green'"
			@btn-click="$emit('toggle-add-form')"
		/>
	</header>
</template>

<script>
import Button from "./Button";
export default {
	name: "Header",
	props: {
		title: String,
		showAddForm: Boolean,
	},
	components: {
		Button,
	},
};
</script>

<style scoped>
header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}
</style>
