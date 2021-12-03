<template>
	<x-card>
		<validation-error :showError="errorStatus" :errors="errors"/>

			<div>
            	<x-label title="Avatar" />
                <x-input type="file"  @change="onUploadAvatar" :autofocus='false'/>
            </div>
			<div class="mt-4">
            	<x-label title="First Name" />
                <x-input type="text" v-model="data.first_name" autofocus/>
            </div>

            <div class="mt-4">
            	<x-label title="Last Name" />
               	<x-input type="text" v-model="data.last_name" :autofocus='false'/>
            </div>

            <div class="mt-4">
            	<x-label title="email" />
               	<x-input type="email" v-model="data.email" :autofocus='false'/>
            </div>

            <div class="mt-4">
            	<x-label title="Phone Number" />
               	<x-input type="text" v-model="data.phone_number" :autofocus='false'/>
            </div>
            <div class="mt-4">
            	<x-label title="Address" />
            	<x-text-area  v-model="data.address" :autofocus='false'/>
            </div>

            <div class="flex items-center justify-end mt-4">

                <x-button type="button" label="Submit" @click="onSubmit"/>

                <x-button type="button" label="Cancel" @click="onCancel"/>
            </div>

    </x-card>
</template>
<script>
	import { 
		XInput, 
		XLabel, 
		XButton,
		XCard,
		XTextArea,
		ValidationError 
	} from "@/components/form";

	import { 
		index, 
		destroyMany, 
		store, 
		update,
		destroy 
	} from '@/services/DeveloperService';

	import { reactive,ref,computed } from 'vue';
	import Swal from 'sweetalert2';
	import { useRouter } from 'vue-router';

	export default{
		name: "Create",
		components:{
			XInput,
			XLabel,
			XButton,
			XCard,
			XTextArea,
			ValidationError
		},
		setup(){

			let data = reactive({
				first_name: '',
				last_name: '',
				email: '',
				phone_number: '',
				address: '',
				avatar: ''
			});

			let errorStatus = ref(false);
			let errors = ref([]);
			const router = useRouter();
			const token = localStorage.getItem('api_token');

			const onSubmit = async () => {

				let formData = new FormData;

				formData.set('first_name',data.first_name);
				formData.set('last_name',data.last_name);
				formData.set('email',data.email);
				formData.set('phone_number',data.phone_number);
				formData.set('address',data.address);
				formData.set('avatar',data.avatar);

				await store(token,formData).then(() => {
				
					clearForm();
					Swal.fire('New Developer Added');

				}).catch(err => {
					if (Object.keys(err?.response?.data?.errors).length) {
						errorStatus.value = true;
						errors.value = err?.response?.data?.errors
					}else{
						errorStatus = false;
					}
				})
			};
			const onUploadAvatar = (event) => {

				data.avatar = event.target.files[0];
			};
			const clearForm = () => {

				errorStatus.value = false;
				errors.value = [];
				data.first_name = "";
				data.last_name = "";
				data.email = "";
				data.phone_number = "";
				data.address = "";
				data.avatar = ""
			};

			const onCancel = () => {
				router.push({name:'Developer'});
			}

			return {
				data,
				errorStatus,
				errors,
				onSubmit,
				onUploadAvatar,
				onCancel
			}
		}
	}
</script>