<template>
	<div class="mb-4">
        <div class="font-medium text-red-600" v-if="showError">
            Whoops! Something went wrong.
        </div>

        <ul class="mt-3 list-disc list-inside text-sm text-red-600">
            <li v-for="(error,index) in  errors" :key="index"> {{ error[0] }} </li>
        </ul>
    </div>
</template>
<script>
	export default {
		name:'ValidationError',
		props:{
			showError: Boolean,
			errors: Array
		}
	}
</script>