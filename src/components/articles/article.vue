<template>
    <div class="container p_top">
        <div class="text-center" v-if="loading">
            <v-progress-circular
            indeterminate
            color="primary"
            />
        </div>
        <div class="article_page" v-else>
            <div class="game_tag">
                    {{ article.game }}               
            </div>
            <div class="article_featured" :style="{backgroundImage:`url(${article.img})`}">

            </div>
            <div class="article_content">
                <div class="owner">
                    Article written By <b>{{ article.owner.firstname }} {{ article.owner.lastnme}}</b>
                </div>
                <hr>
                <h1>{{ article.title }}</h1>
                <div class="editor" v-html="article.editor"></div>

                <hr>
                <div class="article_rating">Our Rating is:  <b>{{ article.rating }}</b></div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    /// STORE
    import { useArticleStore } from '@/stores/articles';

    import { useRoute } from 'vue-router';

    const route = useRoute();

    const articleStore = useArticleStore();

    const loading = ref(true);

    const article = ref(null);

    articleStore.getArticleById(route.params.id)
    .then((data) => {
        article.value = data;
    })
    .finally(() => {
        loading.value = false;
    });



</script>