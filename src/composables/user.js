import * as yup from 'yup'
import { ref } from 'vue'

// UserStore
import { useUserStore } from '@/stores/user'


export const updateProfile= () => {
    const userStore = useUserStore();

    const firstname = ref(userStore.user.firstname)
    const lastname = ref(userStore.user.lastname)

    const loading = ref(false);

    const formSchema = yup.object({
        firstname: yup.string().required('First name is required').max(50, 'First name must be less than 100 characters'),
        lastname: yup.string().required('Last name is required').max(50, 'Last name must be less than 100 characters'),
    });

    function onSubmit(values , {resetForm}){
        debugger;
        loading.value = true;
        userStore.updateProfile(values)
        .finally(()=>{
            loading.value = false;
        })
    }

    return {
        firstname,
        lastname,
        loading,
        formSchema,
        onSubmit
    }
}