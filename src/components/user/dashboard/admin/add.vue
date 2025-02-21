<template>
    <h1>Add Article</h1>
    <hr>

    <div class="text-center m-3" v-show="loading">
        <v-progress-circular
            indeterminate
            size="32"
            color="primary"/>

    </div>


    <Form  v-show="!loading" class="mb-5" @submit="onSubmit" :validation-schema="ArticleSchema">
        <!-- Name of Game -->
        <div class="mb-4">
            <Field name="game" v-slot="{ field, errors, errorMessage }">
                <input type="text" class="form-control" placeholder="Name of Game " v-bind="field"
                    :class="{ 'is-invalid': errors.length !== 0 }">
                <div class="input_alert" v-if="errors.length !== 0">
                    {{ errorMessage }}
                </div>

            </Field>
        </div>

        <!-- Title of Game -->
        <div class="mb-4">
            <Field name="title" v-slot="{ field, errors, errorMessage }">
                <input type="text" class="form-control" placeholder="title of article" v-bind="field"
                    :class="{ 'is-invalid': errors.length !== 0 }">
                <div class="input_alert" v-if="errors.length !== 0">
                    {{ errorMessage }}
                </div>

            </Field>
        </div>

        <!-- Excerpt -->
        <div class="mb-4">
            <Field name="excerpt" v-slot="{ field, errors, errorMessage }">
                <textarea rows="4" class="form-control" placeholder="Add an excerpt" v-bind="field"
                    :class="{ 'is-invalid': errors.length !== 0 }"></textarea>
                <div class="input_alert" v-if="errors.length !== 0">
                    {{ errorMessage }}
                </div>

            </Field>
        </div>

        <!-- WYSIWYG -->
         <div class="mb-4">
             <wysiwyg @update="updateEditor"/>

             <Field name="editor" v-model="veditor" v-slot="{ field, errors, errorMessage }">
                <input
                    type="hidden"
                    id="veditor"
                    v-bind="field"
                    
                >

             </Field>
         </div>


        <!-- RATING -->
        <div class="mb-4">
            <Field name="rating" value="Select a rating" v-slot="{ field, errors, errorMessage }">
                <select class="form-select" v-bind="field" :class="{ 'is-invalid': errors.length !== 0 }">
                    <option value="Select a rating">Select a rating</option>
                    <option v-for="rating in ratingArray" :key="rating" :value="rating">{{ rating }}</option>
                </select>
                <div class="input_alert" v-if="errors.length !== 0">
                    {{ errorMessage }}
                </div>

            </Field>
        </div>

        <!-- IMG -->
        <div class="mb-4">
            <Field name="img" v-slot="{ field, errors, errorMessage }">
                <input type="text" class="form-control" placeholder="Add the source of the img" v-bind="field"
                    :class="{ 'is-invalid': errors.length !== 0 }">
                <div class="input_alert" v-if="errors.length !== 0">
                    {{ errorMessage }}
                </div>

            </Field>
        </div>

        <v-btn type="submit" variant="outlined" rounded="xl">
            Add Article
        </v-btn>


    </Form>
</template>

<script setup>
import { ref } from 'vue';
import { Field, Form } from 'vee-validate';
import ArticleSchema from './schema';

/// WYSIWYG
import wysiwyg from '@/utils/wysiwyg.vue';

// Article Store
import { useArticleStore } from '@/stores/articles';
const articleStore = useArticleStore();

// Toast 
import { useToast } from 'vue-toast-notification';
const $toast = useToast();


const ratingArray = [0, 1, 2, 3, 4, 5]

const veditor = ref('');

const loading = ref(false);

function onSubmit(values, { resetForm }) {
    loading.value = true
    articleStore.addArticle(values)
    .then(()=>{
        $toast.success('New Article created')
    })
    .catch((error)=>{
        $toast.error(error.message)

    })
    .finally(()=>{
        loading.value = false
    })
}

function updateEditor(value) {
    veditor.value = value
}

</script>