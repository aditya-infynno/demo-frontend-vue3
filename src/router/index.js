import { createRouter, createWebHistory } from "vue-router";
import { Auth } from "@/services/DeveloperService";

const routes = [
  	{
    	path: "/",
    	name: "Login",
    	component:() => import("@/views/auth/Login"),
    	meta: {
			requiresAuth: false,
		}
  	},
  	{
    	path: "/forgot-password",
    	name: "ForgotPassword",
    	component:() => import("@/views/auth/ForgotPassword"),
    	meta: {
			requiresAuth: false,
		}
  	},
  	{
    	path: "/reset-password/:token",
    	name: "ResetPassword",
    	component:() => import("@/views/auth/ChangePassword"),
    	meta: {
			requiresAuth: false,
		}
  	},
  	{
    	path: "/register",
    	name: "Register",
    	component:() => import("@/views/auth/Register"),
    	meta: {
			requiresAuth: false,
		}
  	},
  	{
    	path: "/developer",
    	name: "Developer",
    	component:() => import("@/views/developer/Developer"),
    	meta: {
			requiresAuth: true,
		}
  	},
  	{
    	path: "/developer/create",
    	name: "AddDeveloper",
    	component:() => import("@/views/developer/Create"),
    	meta: {
			requiresAuth: true,
		}
  	},
  	{
    	path: "/developer/edit/:id",
    	name: "EditDeveloper",
    	component:() => import("@/views/developer/Update"),
    	meta: {
			requiresAuth: true,
		}
  	},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
	
	const token = localStorage.getItem('api_token');
	const user = await Auth(token);

	if (user.status == 200) {

		if (to.matched.some(record => record.meta.requiresAuth == true)) {

			next();

		}else{

			next({ name: 'Developer' });
		}
	}else {

		if (to.matched.some(record => record.meta.requiresAuth == false)) {

			next();

		}else{
			
			next({ name: 'Login' });
		}		
	}
})

export default router;
