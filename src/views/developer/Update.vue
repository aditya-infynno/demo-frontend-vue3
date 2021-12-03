<template>
	<x-card>
		<validation-error :showError="errorStatus" :errors="errors"/>

			<div>
            	<img :src="assetPath+avatar" width="200" height="200">
            </div>
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

                <x-button type="button" label="Update" @click="onUpdate"/>

                <x-button type="button" label="Cancel" @click="onCancel"/>
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
		XTextArea,
		ValidationError 
	} from "@/components/form"
	import { reactive,ref,onMounted,computed } from 'vue';
	import { 
		index, 
		destroyMany, 
		store, 
		update,
		destroy,
		show 
	} from '@/services/DeveloperService';

	import Swal from 'sweetalert2';
	import { useRouter, useRoute } from 'vue-router';
	import BaseUrl from '@/utils/BaseUrl';

	export default{
		name: "Update",
		components:{
			XInput,
			XLabel,
			XCheckBox,
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
			let avatar = ref("");
			let errorStatus = ref(false);
			let errors = ref([]);
			let assetPath = ref(BaseUrl+'storage/');
			const router = useRouter();
			const route = useRoute();
			const token = localStorage.getItem('api_token');

			onMounted(() => {

				show(token,route.params.id).then(res => {
					data.first_name = res.data.first_name;
					data.last_name = res.data.last_name;
					data.email = res.data.email;
					data.phone_number = res.data.phone_number;
					data.address = res.data.address;
					avatar.value = res.data.avatar
					
				}).catch(err => {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Something went wrong!',
					})
				})
			})

			const onUpdate = async () => {

				let formData = new FormData;

				formData.set('first_name',data.first_name);
				formData.set('last_name',data.last_name);
				formData.set('email',data.email);
				formData.set('phone_number',data.phone_number);
				formData.set('address',data.address);
				formData.set('avatar',data.avatar);
				formData.set('_method','PUT');

				await update(token,formData,route.params.id).then(res => {
					
					console.log(res.data.data.avatar);
					avatar.value = res.data.data.avatar;
					clearForm();
					Swal.fire('Developer Updated');

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
			};

			const onCancel = () => {
				router.push({name:'Developer'});
			}

			return {
				data,
				errorStatus,
				errors,
				onUpdate,
				onUploadAvatar,
				onCancel,
				assetPath,
				avatar
			}
		}
	}
</script>