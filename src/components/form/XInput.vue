<template>
	<input  
	class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block mt-1 w-full" 
	:type="type"
	:autofocus="autofocus"
	@input="onChanged"
    :value="modelValue"
	>
</template>
<script>
	import { defineComponent } from 'vue';

	export default defineComponent({
		name:'XInput',
		
		emits: ['update:modelValue'],

		props:{
			modelValue: String,
			type: String,
			autofocus: Boolean
		},
		setup(props, { emit }){

			const onChanged = (e) => {
        		emit('update:modelValue', e.currentTarget.value);
      		}

      		return {
        		onChanged
      		}
		}
	})
</script>