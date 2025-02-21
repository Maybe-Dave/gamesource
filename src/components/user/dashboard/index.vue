<template>
    <div class="container-fluid">
        <div class="row">
            <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div class="position-sticky pt-3">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <RouterLink class="nav-link" :to="{ name: 'DashBoard' }"> <v-icon icon="mdi-view-dashboard"/>  Dashboard</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link" :to="{ name: 'UserProfile' }"> <v-icon icon="mdi-account"/>Profile</RouterLink>
                        </li>
                        <li class="nav-item" v-if="userStore.user.isAdmin">
                            <RouterLink class="nav-link" :to="{ name: 'AdminArticles' }"> <v-icon icon="mdi-note-outline"/>Articles</RouterLink>
                        </li>
                        <li class="nav-item" v-if="userStore.user.isAdmin">
                            <RouterLink class="nav-link" :to="{ name: 'AdminAdd' }"> <v-icon icon="mdi-note-edit-outline"/>Add Articles</RouterLink>
                        </li>
                    </ul>
                </div>

            </nav>
            <main id="admin_body" class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div>
                    <RouterView></RouterView>
                </div>
            </main>
        </div>

    </div>
</template>

<script setup>
/// User Store
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();



</script>