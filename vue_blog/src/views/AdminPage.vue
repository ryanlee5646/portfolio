<template>
    <v-container grid-list-md text-center>
        <v-layout wrap>
            <v-flex xs12>
                <h2>Admin Page</h2>
            </v-flex>
            <v-flex xs6>
                <v-card max-width="400" class="mx-auto">
                    <v-layout py-4 pl-4>
                        <v-flex shrink>
                            <v-img height="100" width="100" src="https://image.flaticon.com/icons/svg/1980/1980736.svg"></v-img>
                        </v-flex>
                        <v-flex text-center>
                            <v-container grid-list-lg pa-0>
                                <v-layout column>
                                    <v-flex>
                                        <h1>Portfolios</h1>
                                    </v-flex>
                                    <v-flex id="wrapper">
                                        <number
                                            class="bold transition"
                                            :class="{scaleBig: scaleClass}"
                                            ref="number1"
                                            from="0"
                                            :to="NumberOfPortfolios"
                                            duration="4"
                                            easing="Power4.easeOut"
                                            @complete="completed"
                                        />
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
            <v-flex xs6>
                <v-card max-width="400" class="mx-auto">
                    <v-layout py-4 pl-4>
                        <v-flex shrink>
                            <v-img height="100" width="100" src="https://image.flaticon.com/icons/svg/1992/1992576.svg"></v-img>
                        </v-flex>
                        <v-flex text-center>
                            <v-container grid-list-lg pa-0>
                                <v-layout column>
                                    <v-flex>
                                        <h1>Posts</h1>
                                    </v-flex>
                                    <v-flex id="wrapper">
                                        <number
                                            class="bold transition"
                                            :class="{scaleBig: scaleClass}"
                                            ref="number2"
                                            from="0"
                                            :to="NumberOfPosts"
                                            duration="4"
                                            easing="Power4.easeOut"
                                            @complete="completed"
                                        />
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>

            <!-- draggable -->
            <v-container>
                <div class="drag-container" v-drag-and-drop:options="options">
                    <ul class="drag-list">
                        <li class="drag-column" v-for="group in groups" :key="group.id">
                            <span class="drag-column-header">
                                <h2>{{ group.name }}</h2>
                                <feather-icon type="more-vertical"></feather-icon>
                             </span>
                            <vue-draggable-group
                                v-model="group.items"
                                :groups="groups"
                                :data-id="group.id"
                                @change="onGroupsChange"
                            >
                                <v-flex class="drag-inner-list" :data-id="group.id">
                                    <v-card class=" drag-item" v-for="item in group.items" :key="item.id" :data-id="item.id">
                    <v-layout py-4 pl-4>
                        <v-flex shrink>
                            <v-img height="30" width="30" src="https://image.flaticon.com/icons/svg/1992/1992576.svg"></v-img>
                        </v-flex>
                        <v-flex text-center>
                            <v-container grid-list-lg pa-0>
                                <v-layout column>
                                    <v-flex class="drag-item-text">
                                        {{item.name}}
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-flex>
                    </v-layout>
                </v-card>
                                </v-flex>
                            </vue-draggable-group>
                        </li>
                    </ul>
                </div>
            </v-container>
        <!-- <v-flex v-for="user in users" :key="user">
            <h2> <img :src="getPhotoURL(user)" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;"> {{user.email}} {{user.name}} {{user.auth}}</h2>
             <select v-model="user.auth">
                <option disabled value="">select auth</option>
                <option>Visitor</option>
                <option>MyTeam</option>
                <option>Admin</option>
            </select> 
        </v-flex>    -->
        </v-layout>
    </v-container>
</template>
<script>
import FirebaseService from '@/services/FirebaseService'

export default{
    name: 'ManagePage',
    data(){
        return{
            users : [],
            userss : [],
            selected : '',
            NumberOfPortfolios : 0,
            NumberOfPosts : 0,
            scaleClass: false,
            groups: [
        {
          id: 1,
          name: "Manager",
          items: []
        },
        {
          id: 2,
          name: "Team",
          items: []
        },
        {
          id: 3,
          name: "Visitor",
          items: []
        }
      ],
      options: {
        dropzoneSelector: ".drag-inner-list",
        draggableSelector: ".drag-item"
      }
        }
    },
    methods:{
        async getAllUserInfo(users, groups){
            users = await FirebaseService.getAllUserInfo();
            var idNum = 11;
            users.forEach(function(user){
                console.log("hell"+ user.auth)
                if(user.auth === 'visitor'){
                    groups.forEach(function(group){
                        if(group.id === 3){
                            group.items.push({id: idNum, name: user.name, groupid: 3});
                            ++idNum;
                        }
                    });
                }
                else if(user.auth === 'manager'){
                    groups.forEach(function(group){
                        if(group.id === 1){
                            group.items.push({id: idNum, name: user.name, groupid: 1});
                            ++idNum;
                        }
                    });
                }
                else if(user.auth === 'team'){
                    groups.forEach(function(group){
                        if(group.id === 2){
                            group.items.push({id: idNum, name: user.name, groupid: 2});
                            ++idNum;
                        }
                    });
                }
            });

            console.log(users);
        },
        getPhotoURL(user){
            if(user.photoURL != undefined){
               return user.photoURL;
            }
            return 'https://pondokindahmall.co.id/assets/img/default.png';
        },
        async getDocumentsNumber(){
            this.NumberOfPortfolios = await FirebaseService.getPortfolioNumber();
            this.NumberOfPosts = await FirebaseService.getPostNumber();
            this.playAnimation();
        },
        async getPostNumber(){
            
            console.log(this.NumberOfPortfolios);
            this.playAnimation();
        },
        theFormat(number) {
            return number.toFixed(1);
        },
        completed() {
            console.log("Animation ends!");
                this.scaleClass = true;
            },
        playAnimation() {
            console.log("Animation starts!");
            this.scaleClass = false;
            this.$refs.number2.play();
        },
        onGroupsChange(e) {
      console.log({ e });
    }
    },
    mounted(){
        this.getDocumentsNumber();
        this.getAllUserInfo(this.users, this.groups);
       
    }
}
</script>

<style>
.bold {
  font-weight: bold;
  font-size: 25px;
}
.transition {
  transition: all 0.3s ease-in;
}
.scaleBig {
  font-size: 35px;
}
</style>

<style lang="scss">
$ease-out: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
$to-do: #f4ce46;
$in-progress: #2a92bf;
$approved: #00b961;

* {
  box-sizing: border-box;
}

body {
  background: #33363d;
  color: white;
  font-family: "Roboto Mono", serif;
  font-weight: 300;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.drag-container {
  max-width: 1000px;
  margin: 20px auto;
}

.drag-list {
  display: flex;
  align-items: flex-start;

  @media (max-width: 690px) {
    display: block;
  }
}

.drag-column {
  flex: 1;
  margin: 0 10px;
  position: relative;
  background: rgba(black, 0.2);
  overflow: hidden;

  @media (max-width: 690px) {
    margin-bottom: 30px;
  }

  h2 {
    font-size: 0.8rem;
    margin: 0;
    text-transform: uppercase;
    font-weight: 600;
  }

  &-to-do {
    .drag-column-header,
    .drag-options {
      background: $to-do;
    }
  }

  &-in-progress {
    .drag-column-header,
    .drag-options {
      background: $in-progress;
    }
  }

  &-approved {
    .drag-column-header,
    .drag-options {
      background: $approved;
    }
  }
}

.drag-column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  user-select: none;
}

.drag-inner-list {
  height: 85vh;
  overflow: auto;
}

.drag-item {
  margin: 10px;
  height: 50px;
  background: rgba(black, 0.1);
  transition: $ease-out;

  /* items grabbed state */
  &[aria-grabbed="true"] {
    background: #5cc1a6;
    color: #fff;
  }

  .drag-item-text {
    font-size: 2rem;
    padding-left: 2rem;
    padding-top: 2rem;
  }
}

.drag-header-more {
  cursor: pointer;
}

@keyframes nodeInserted {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 0.8;
  }
}

.item-dropzone-area {
  height: 6rem;
  background: #888;
  opacity: 0.8;
  animation-duration: 0.5s;
  animation-name: nodeInserted;
  margin-left: 0.6rem;
  margin-right: 0.6rem;
}
</style>
