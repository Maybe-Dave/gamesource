<template>
    <div class="text-center m-3" v-show="loading">
        <v-progress-circular indeterminate color="primary">

        </v-progress-circular>
    </div>

    <div v-show="!loading">
        <v-table theme="dark">
            <thead>
                <tr>
                    <th class="text-left">
                        Name
                    </th>
                    <th class="text-left">
                        Owner
                    </th>
                    <th class="text-left">
                        Rating
                    </th>
                    <th class="text-left">
                        Date
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(article) in articleStore.adminArticles">
                    <td>{{ article.game }}</td>
                    <td>{{ article.owner.firstname }} {{ article.owner.lastnme }}</td>
                    <td>{{ article.rating }}</td>
                    <td>{{ article.timestamp.toDate().toDateString() }}</td>
                    <td>
                        <v-btn @click="removeHandler(article.id)" variant="outlined" color="red" size="small">
                            Remove
                        </v-btn>
                    </td>
                    <td>
                        <v-btn variant="outlined" color="yellow" size="small"
                            @click="router.push({ name: 'AdminEdit', params: { id: article.id } })">
                            Edit
                        </v-btn>
                    </td>
                </tr>

            </tbody>
        </v-table>

        <div class="text-center m-3" v-if="btnLoad">
            <v-progress-circular indeterminate color="primary">

            </v-progress-circular>
        </div>

        <v-btn v-else variant="outlined" class="mt-3" @click="loadMoreHandler">
            Get More Articles
        </v-btn>

    </div>

</template>

<script setup>
import { ref } from 'vue';

/// Router
import { useRouter, useRoute } from 'vue-router';

/// Article Store
import { useArticleStore } from '@/stores/articles';

const route = useRoute();
const router = useRouter();

const articleStore = useArticleStore();

const loading = ref(false)
const btnLoad = ref(false)


/// Get first Articles
if (!articleStore.adminArticles || route.query.reload) {
    loading.value = true;
    articleStore.adminGetArticles(3)
        .finally(() => {
            loading.value = false
        })
}


/// Load More Articles
const loadMoreHandler = () => {
    btnLoad.value = true;
    articleStore.adminGetMoreArticles(3)
        .finally(() => {
            btnLoad.value = false
        })
}

/// Remove By Id

const removeHandler = (articleId) =>{
    loading.value = true;
    articleStore.adminDeleteArticle(articleId)
    .finally(()=>{
        loading.value = false
    })
}

</script>