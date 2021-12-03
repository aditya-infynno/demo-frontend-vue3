<template>
	<x-card>
		 <div class="mb-4 text-sm text-gray-600">
            Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
        </div>
			<div>
            	<x-label title="Email" />
                <x-input type="email" v-model="email" autofocus/>
            </div>

            <div class="flex items-center justify-end mt-4">

            	<router-link 
            		:to="{name:'Login'}"
            		class="underline text-sm text-gray-600 hover:text-gray-900"
            	>
            		Login
            	</router-link>

                <x-button type="button" label="Sending ... " v-if="isLoading"/>
                <x-button type="button" label="Email Password Reset Link" @click="onReset"  v-else/>
            </div>
    </x-card>
</template>
<script>
	import { 
		XInput, 
		XLabel, 
		XButton,
		XCard,
	} from "@/components/form";

	import { ref } from 'vue';
	import { useRouter } from 'vue-router';
	import { forgotPassword } from '@/services/AuthenticationService';
	import Swal from 'sweetalert2';

	export default{
		name: 'ForgotPassword',
		components:{
			XInput,
			XLabel,
			XButton,
			XCard
		},
		setup(props,context){

			const router = useRouter();
			let email = ref("");
			let isLoading = ref(false);
			let errorStatus = ref(false);
			let errors = ref([]);

			const onReset = async () => {

				isLoading.value = true;

				await forgotPassword({email: email.value})
				.then(() => {
					isLoading.value = false;
					email.value = "";
					Swal.fire('We have emailed your password reset link!');
				}).catch(err => {
					isLoading.value = false;

					if (err.response.data.message == 'passwords.throttled') {
						Swal.fire("Please wait before retrying.");	
					}else{
						Swal.fire("We can't find a user with that email address.");	
						
					}
					
				})
			}

			return {
				onReset,
				email,
				errorStatus,
				errors,
				isLoading
			}
		}
	}
</script>