<template>

	<label class="block font-medium text-sm text-gray-700"> {{ title }} </label>

</template>

<script>
	export default {

		name:'XLabel',

		props:{
			title: String,
		}
	}
</script>