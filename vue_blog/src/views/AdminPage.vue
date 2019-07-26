<template>
    <div>
        <h2>Admin Page</h2>
        <v-flex v-for="user in users" :key="user">
            <h2> <img :src="getPhotoURL(user)" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;"> {{user.email}} {{user.name}} {{user.auth}}</h2>
            <!-- <select v-model="user.auth">
                <option disabled value="">select auth</option>
                <option>Visitor</option>
                <option>MyTeam</option>
                <option>Admin</option>
            </select> -->
        </v-flex>    
    </div>
</template>
<script>
import FirebaseService from '@/services/FirebaseService'

export default{
    name: 'ManagePage',
    data(){
        return{
            users : [],
            selected : ''
        }
    },
    methods:{
        async getAllUserInfo(){
            this.users = await FirebaseService.getAllUserInfo();
            console.log(users);
        },
        getPhotoURL(user){
            if(user.photoURL != undefined){
               return user.photoURL;
            }
            return 'https://pondokindahmall.co.id/assets/img/default.png';
        }
    },
    mounted(){
        this.getAllUserInfo();
    }
}
</script>