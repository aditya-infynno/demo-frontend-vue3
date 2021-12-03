<template>
	<x-card>
		<validation-error :showError="errorStatus" :errors="errors"/>
		<div>
           	<x-label title="Email" />
            <x-input type="email" v-model="email" autofocus/>
        </div>

        <div class="mt-4">
           	<x-label title="Password" />
             <x-input type="password" v-model="password" :autofocus='false'/>
        </div>

        <div class="flex items-center justify-end mt-4">

          	<router-link 
          		:to="{name:'ForgotPassword'}"
           		class="underline text-sm text-gray-600 hover:text-gray-900"
           	>
           		Forgot your password?
           	</router-link>
            <x-button type="button" label="Sign In" @click.enter="signIn"/>
        </div>
        <div class="flex items-center justify-end mt-4">

           	<router-link 
           		:to="{name:'Register'}"
          		class="underline text-sm text-gray-600 hover:text-gray-900"
           	>
           		Sign Up
           	</router-link>
        </div>
    </x-card>
</template>
<script>
	import { 
		XInput, 
		XLabel, 
		XCheckBox,
		XButton,
		XCard,
		ValidationError 
	} from "@/components/form";

	import { ref } from 'vue';
	import { useRouter } from 'vue-router';
	import { login } from '@/services/AuthenticationService';

	export default{
		name: 'Login',
		components:{
			XInput,
			XLabel,
			XCheckBox,
			XButton,
			XCard,
			ValidationError
		},
		setup(props,context){

			let email = ref("");
			let password = ref("");
			let errorStatus = ref(false);
			let errors = ref([]);

			const router = useRouter();

			const signIn = async () => {
				
				await login({
					email: email.value,
					password:password.value
				})
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
				signIn,
				email,
				errorStatus,
				password,
				errors
			}
		}
	}
</script>