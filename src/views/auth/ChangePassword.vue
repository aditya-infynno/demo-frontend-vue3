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
         <div class="mt-4">
           	<x-label title="Confirm Password" />
             <x-input type="password" v-model="confirm_password" :autofocus='false'/>
        </div>

        <div class="flex items-center justify-end mt-4">

            <x-button type="button" label="Reset Password" @click.enter="onReset"/>
        </div>
    </x-card>
</template>
<script>
	import { 
		XInput, 
		XLabel, 
		XButton,
		XCard,
		ValidationError 
	} from "@/components/form";

	import { ref } from 'vue';
	import { useRouter,useRoute } from 'vue-router';
	import { resetPassword } from '@/services/AuthenticationService';

	export default{
		name: 'ChangePassword',
		components:{
			XInput,
			XLabel,
			XButton,
			XCard,
			ValidationError
		},
		setup(props,context){

			const router = useRouter();
			const route = useRoute();

			let email = ref(route.query.email);
			let password = ref("");
			let confirm_password = ref("");
			let errorStatus = ref(false);
			let errors = ref([]);


			
			const onReset = async () => {
				
				await resetPassword({
					email: email.value,
					password:password.value,
					password_confirmation: confirm_password.value,
					token: route.params.token
				})
				.then(async res => {
					errorStatus.value = false;
					errors.value = [];

					router.push({name:'Login'});
				})
				.catch(err => {
					
					if (err.response.status == 403) {
						errors.value = {error:[err.response.data.message]};
					}
					if (Object.keys(err?.response?.data?.errors).length) {
						errorStatus.value = true;
						errors.value = err?.response?.data?.errors
					}else{
						errorStatus = false;
					}
				});
				
			}

			return {
				onReset,
				email,
				errorStatus,
				password,
				confirm_password,
				errors
			}
		}
	}
</script>