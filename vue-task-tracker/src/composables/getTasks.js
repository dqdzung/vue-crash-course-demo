import { ref } from "vue";

const getTasks = () => {
	const tasks = ref([]);
	const err = ref(null);

	const loadTasks = async () => {
		try {
			const res = await fetch("http://localhost:5000/tasks");

			if (!res.ok) {
				throw Error("Fetch tasks failed..");
			}

			tasks.value = await res.json();
		} catch (err) {
			err.value = err.message;
		}
	};

	return { tasks, err, loadTasks };
};

export default getTasks;
