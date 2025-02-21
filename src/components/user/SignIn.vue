<template>
    <div class="signin_container">
        <!-- loader -->

        <div class="text-center" v-show="userStore.loading">
            <v-progress-circular indeterminate color="primary" />
        </div>


        <Form @submit="onSubmit" :validation-schema="formSchema" v-show="!userStore.loading">
            <h1 v-text="!type ? 'Sign In' : 'Register'"></h1>

            <div class="form-group">
                <Field name="email" :value="'david@gmail.com'" v-slot="{ field, errors, errorMessage }">
                    <input type="text" class="form-control" placeholder="Email" v-bind="field"
                        :class="{ 'is-invalid': errors.length !== 0 }">
                    <div class="input_alert" v-if="errors.length !== 0">
                        {{ errorMessage }}
                    </div>

                </Field>
            </div>
            <div class="form-group">
                <Field name="password" :value="'password123'" v-slot="{ field, errors, errorMessage }">
                    <input type="password" class="form-control" placeholder="Password " v-bind="field"
                        :class="{ 'is-invalid': errors.length !== 0 }">
                    <div class="input_alert" v-if="errors.length !== 0">
                        {{ errorMessage }}
                    </div>

                </Field>
            </div>

            <button type="submit" class="btn mb-3 btn-block" v-text="!type ? 'Sign In' : 'Register'"></button>
            <hr>

            <div class="form_swap" @click="type = !type">
                <span v-if="type">
                    I want to <b>Sign In</b>
                </span>
                <span v-else>
                    I want to <b>Register</b>
                </span>
            </div>
        </Form>
    </div>
</template>

<script setup>
import { Field, Form } from 'vee-validate'
import * as yup from 'yup'
import { ref } from 'vue';


///TOASTS
import { useToast } from 'vue-toast-notification';
const $toast = useToast();



/// Auth Store
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();



const type = ref(false)

const formSchema = yup.object({
    email: yup.string().required("The email is required").email("Not a valid email"),
    password: yup.string().required("The password is required").min(6)
})

function onSubmit(values, { resetForm }) {

    if (type.value) {
        /// register
        userStore.register(values)


    } else {
        userStore.signIn(values)

    }
    // useUserStore.register(values)
}

// Subscribe to an error
userStore.$onAction(({name,after,onError }) => {
    if (name === 'register' || name === 'signIn') {
        after(()=>{
            $toast.success('Welcome !!')

        })
        onError((error)=>{
            $toast.error(error.message)
        })
    }
})

</script>