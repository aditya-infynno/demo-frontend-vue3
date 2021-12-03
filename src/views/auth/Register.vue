<template>
	<x-card>
		<validation-error :showError="errorStatus" :errors="errors"/>

			<div>
            	<x-label title="Name" />
                <x-input type="text" v-model="data.name" autofocus/>
            </div>

            <div class="mt-4">
            	<x-label title="Email" />
               	<x-input type="email" v-model="data.email" :autofocus='false'/>
            </div>

            <div class="mt-4">
            	<x-label title="Password" />
               	<x-input type="password" v-model="data.password" :autofocus='false'/>
            </div>

            <div class="mt-4">
            	<x-label title="Confirm Password" />
               	<x-input type="password" v-model="data.password_confirmation" :autofocus='false'/>
            </div>

            <div class="flex items-center justify-end mt-4">

            	<router-link 
            		:to="{name:'Login'}"
            		class="underline text-sm text-gray-600 hover:text-gray-900"
            	>
            		Already registered?
            	</router-link>

                <x-button type="button" label="Sign Up" @click="onSignUp"/>
            </div>
    </x-card>
</template>
<script>
	import { 
		XInput, 
		XLabel, 
		XCheckBox,
		XButton,
		XCard ,
		ValidationError
	} from "@/components/form";
	import { reactive,ref } from 'vue';
	import { useRouter } from 'vue-router';
	import { register } from '@/services/AuthenticationService';

	export default {
		name: "Register",
		components:{
			XInput,
			XLabel,
			XCheckBox,
			XButton,
			XCard,
			ValidationError
		},
		setup(){

			let data = reactive({
				name:'',
				email:'',
				password:'',
				password_confirmation:''
			});
			let errorStatus = ref(false);
			let errors = ref([]);
			const router = useRouter();

			const onSignUp = async () => {

				await register(data)
				.then(async res => {
					errorStatus.value = false;
					errors.value = [];

					await localStorage.setItem('api_token',res.data.token);

					router.push({name:'Developer'});
				})
				.catch(err => {
					
					if (Object.keys(err?.response?.data?.errors).length) {
						errorStatus.value = true;
						errors.value = err?.response?.data?.errors
					}else{
						errorStatus = false;
					}
				});
			}

			return {
				data,
				onSignUp,
				errorStatus,
				errors
			}
		}
	}
</script>