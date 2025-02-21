<template>
    <header>
        <div class="container header_container">
            <div class="logo">
                <router-link :to="{ name: 'Home' }">
                    GameSource
                </router-link>
            </div>
            <div>
                <ul>
                    <li v-if="!userStore.auth">
                        <router-link :to="{ name: 'SignIn' }">
                            Sign In
                        </router-link>
                    </li>
                    <span>
                        <li v-if="userStore.auth">
                            <span v-on:click="userStore.signOut()">
                                Logout
                            </span>
                        </li>
                        <li>
                            <router-link :to="{ name: 'DashBoard' }" v-if="userStore.auth"> Dashboard</router-link>
                        </li>
                    </span>
                </ul>
            </div>
        </div>
    </header>
</template>

<script setup>
    /// USER STORE
    import { useUserStore } from '@/stores/user';
    const userStore = useUserStore();





</script>