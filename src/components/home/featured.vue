<template>
    <v-row v-masonry transition-duration="0.3s" class="mt-4">
        <v-col v-masonry-tile v-for="(article) in articleStore.getHomeArticles" :key="article.id" sm="4">
            <v-card>
                <v-img
                    height="200"
                    :src="article.img"
                    cover
                    class="text-white"
                />
                <v-card-item>
                    <v-card-title>
                        {{ article.title }}
                    </v-card-title>
                    <v-card-subtitle>
                        {{ article.game }}
                    </v-card-subtitle>
                </v-card-item>
                <v-card-text>
                    {{ article.excerpt }}
                </v-card-text>

                <v-card-actions>
                    <RouterLink :to="{name:'article',params:{id:article.id}}">
                        <v-btn> 
                            Read Article
                        </v-btn>
                    </RouterLink>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>

</template>

<script setup>
    /// Article Store
    import { useArticleStore } from '@/stores/articles';

    const articleStore = useArticleStore();

</script>