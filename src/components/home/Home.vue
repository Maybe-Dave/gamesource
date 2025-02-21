<template>
<div>
    <Carousel/>
    <Featured/>
</div>
</template>
    
<script setup>
    import Carousel from '@/utils/carousel.vue';

    /// Article Store
    import { useArticleStore } from '@/stores/articles';
    import Featured from './featured.vue';

    const articleStore = useArticleStore();

    if (!articleStore.homeArticles) {
        articleStore.getArticles(8)
    }
</script>