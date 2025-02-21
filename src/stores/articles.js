import { defineStore } from "pinia";
import router from '@/router';
import { useUserStore } from '@/stores/user';

/// FIREBASE
import { DB } from '@/utils/firebase';
import {  collection, getDoc, doc, setDoc, serverTimestamp, updateDoc, query, orderBy, 
getDocs, limit, startAfter, deleteDoc } from 'firebase/firestore';

/// Toasts
import { useToast } from "vue-toast-notification";

const $toast = useToast();

let articlesCol = collection(DB,'articles');

export const useArticleStore = defineStore('article',{
    state:()=>({
        homeArticles:'',
        adminArticles:'',
        adminLastVisible:''
    }),
    getters:{
        getFeaturesSlides(state){
            return state.homeArticles.slice(0,2)
        },
        getHomeArticles(state){
            return state.homeArticles
        }
    },
    actions:{
        async updateArticle(id, formData){
            try {
                const docRef = doc(DB,'articles', id)
                await updateDoc(docRef,{...formData});

                $toast.success('Updated !!')

                return transformWithEsbuild;
                
            } catch (error) {
                throw new Error(error.message)
                
            }
        },
        async getArticleById(id){
            try{
                const docRef = await getDoc(doc(DB,'articles',id));
                if(!docRef.exists()){
                    throw new Error('Could not find document')
                }
                return docRef.data()
            } catch(error){
                router.push({name:'404'})
            }
        },  
        async addArticle(formData){
            try{
                // GET USER PROFILE
                const userStore = useUserStore();
                const user = userStore.getUserData;
                // POST DOC IN DB
                const newArticle = doc(articlesCol);
                await setDoc(newArticle,{
                    timestamp: serverTimestamp(),
                    owner:{
                        uid:user.uid,
                        firstname: user.firstname,
                        lastnme: user.lastname
                    },
                    ...formData
                });
                // REDIRECT USER
                router.push({name:'AdminArticles', query:{reload:true}})
                return true;
            }catch(error){
                throw new Error(error)
            }
        },
        async adminGetArticles(docLimit){
            try {
                const q = query(articlesCol,orderBy('timestamp','desc'),limit(docLimit));
                const querySnapshot = await getDocs(q);

                const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                const articles = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
                
                /// Update Admin Articles State
                this.adminArticles = articles
                this.adminLastVisible= lastVisible

            } catch (error) {
                $toast.error(error.message)
                throw new Error(error);
                
            }
        },
        async adminGetMoreArticles(docLimit){
            try {
                if(this.adminLastVisible){
                    let oldArticles = this.adminArticles;

                    const q = query(
                        articlesCol,
                        orderBy('timestamp','desc'),
                        startAfter(this.adminLastVisible),
                        limit(docLimit)
                    );

                    const querySnapshot = await getDocs(q);
                    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                    const newArticles = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
                    this.adminArticles = [...oldArticles, ...newArticles];
                    
                    this.adminLastVisible = lastVisible;
                }

            } catch (error) {
                throw new Error(error)
            }
        },
        async adminDeleteArticle(id){
            try {
                const docRef = doc(DB,'articles',id);
                await deleteDoc(docRef);

                const newList = this.adminArticles.filter(x=>{
                    return x.id != id
                })

                this.adminArticles = newList

                $toast.success('Article Deleted !!')
                return true;
            } catch (error) {
                $toast.error(error.message)
                throw new Error(error)
            }
        },
        async getArticles(docslimit){
            try {
                const q = query(articlesCol,orderBy('timestamp', 'desc'),limit(docslimit))

                const querySnapshot = await getDocs(q)
                const articles = querySnapshot.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data()
                }));
                this.homeArticles = articles
            } catch (error) {
                throw new Error(error)
                
            }
        }
    }
})