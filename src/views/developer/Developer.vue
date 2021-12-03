<template>

	<router-link
	class="px-4 py-1 text-sm text-white bg-green-400 rounded m-20"
	:to="{name:'AddDeveloper'}"
	>Add More Developer</router-link>
	<x-button type="button" label="Delete" @click="deleteMultiple"/>
	<a href="#" @click.prevent="onLogOut" class="px-4 py-1 text-sm text-white bg-red-400 rounded m-20">Logout</a>
	<div class="container flex justify-center mx-auto m-20">

    <div class="flex flex-col">
        <div class="w-full">
            <div class="border-b border-gray-200 shadow">
                <table>
                    <thead class="bg-gray-50">
                        <tr>
                        	<th class="px-6 py-2 text-xs text-gray-500">
                              	<input 
                              		@click='checkAll()' v-model='isCheckAll'
									type="checkbox" 
									class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								/>
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500">
                                ID
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500">
                                First Name
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500">
                                Last Name
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500">
                                Email
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500">
                                Phone Number
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500">
                                Address
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500">
                                Avatar
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500">
                                Edit
                            </th>
                            <th class="px-6 py-2 text-xs text-gray-500">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white">
                        <tr class="whitespace-nowrap" v-for="(developer,index) in developers" :key="developer.id">
                        	<td class="px-6 py-4 text-sm text-gray-500">
                        		<input 
									type="checkbox" 
									:value="developer.id"
									v-model="ids"
									@change='updateCheckall()'
									class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								/>
                        	</td>
                            <td class="px-6 py-4 text-sm text-gray-500">
                                {{ ++index }}
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500">
                                {{ developer.first_name || '' }}
                            </td>
                             <td class="px-6 py-4 text-sm text-gray-500">
                                {{ developer.last_name || '' }}
                            </td>
                             <td class="px-6 py-4 text-sm text-gray-500">
                                {{ developer.email || '' }}
                            </td>
                             <td class="px-6 py-4 text-sm text-gray-500">
                                {{ developer.phone_number || '' }}
                            </td>
                             <td class="px-6 py-4 text-sm text-gray-500">
                             	
                                {{ developer.address || '' }}
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500">
                            	<img :src="assetPath+developer.avatar" width="80" height="80">
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500">
                            	<router-link
                            	class="px-4 py-1 text-sm text-white bg-yellow-400 rounded"
                            	:to="{name:'EditDeveloper',params:{id:developer.id}}"
                            	>Edit</router-link>
                                
                            </td>
                             <td class="px-6 py-4 text-sm text-gray-500">
                                <a href="#" @click.prevent="onDelete(developer.id)" class="px-4 py-1 text-sm text-white bg-blue-400 rounded">Delete</a>
                            </td>
                            
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>

<script>
	import { 
		XButton,
	} from "@/components/form";

	import { 
		index, 
		destroyMany, 
		store, 
		update,
		destroy 
	} from '@/services/DeveloperService';
	import Swal from 'sweetalert2';
	import BaseUrl from '@/utils/BaseUrl'

	export default {
		name: 'Dashboard',
		components: {XButton},

		data(){
			return {
				developers: [],
				isCheckAll: false,
				ids: [],
				assetPath: BaseUrl+'storage/'
			}
		},
		computed:{
			token(){
				return localStorage.getItem('api_token');
			}
		},
		async mounted(){

			await this.allDevelopers();

		},
		methods: {
			async allDevelopers(){
				await index(this.token).then(res => {

					this.developers = res.data.data;
				
				}).catch(err => {
					console.log(err);
				})
			},
	        checkAll(){
      			
      			this.isCheckAll = !this.isCheckAll;
      			this.ids = [];
      			if(this.isCheckAll){ 
      				this.developers.map(developer => {
      					
      					this.ids.push(developer.id);
      				})
      			}
      		},
    		updateCheckall(){
      			if(this.ids.length == this.developers.length){
         			this.isCheckAll = true;
      			}else{
         			this.isCheckAll = false;
      			}
    		},
    		onDelete(id){
    			
    			if (id) {

    				Swal.fire({
						title: 'Are you sure?',
						text: "You won't be able to revert this!",
						icon: 'warning',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Yes, delete it!'
					}).then(async (result) => {
					  if (result.isConfirmed) {

					  	await destroy(this.token,id)
					  	.then(async () => {
					  		Swal.fire(
						      	'Deleted!',
						      	'Developer Deleted',
						      	'success'
					    	);
					    	await this.allDevelopers();
					  	}).catch(() => {
					  		Swal.fire({
							  	icon: 'error',
							  	title: 'Oops...',
							  	text: 'Something went wrong!',
							})
					  	});
					   
					  }
					})
    			}else{
    				Swal.fire({
					  	icon: 'error',
					  	title: 'Oops...',
					  	text: 'Please select atleast one',
					})
    			}

    		},
    		deleteMultiple(){
    			if (this.ids.length) {

    				Swal.fire({
						title: 'Are you sure?',
						text: "You won't be able to revert this!",
						icon: 'warning',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Yes, delete it!'
					}).then(async (result) => {
					  if (result.isConfirmed) {

					  	await destroyMany(this.token,{developer_id:this.ids})
					  	.then(async () => {
					  		Swal.fire(
						      	'Deleted!',
						      	'Developers Deleted',
						      	'success'
					    	);
					    	await this.allDevelopers();
					  	}).catch(() => {
					  		Swal.fire({
							  	icon: 'error',
							  	title: 'Oops...',
							  	text: 'Something went wrong!',
							})
					  	});
					   
					  }
					})
    			}else{
    				Swal.fire({
					  	icon: 'error',
					  	title: 'Oops...',
					  	text: 'Please select atleast one',
					})
    			}
    		},
    		onLogOut(){

    			localStorage.removeItem('api_token');
    			this.$router.push({name:'Login'});
    		}
    	}

	}
</script>