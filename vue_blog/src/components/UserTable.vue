<template>
  <v-container>
        <h1>User Information</h1>
        <v-flex xs12 sm12>
            <v-text-field
              v-model="search"
              label="Search User"
              outline
            >
            <v-icon slot="append" color="grey">search</v-icon>
            </v-text-field>
          </v-flex>
        <v-data-table
          :headers="headers"
          :items="filteredList"
          :items-per-page="5"
          class="elevation-1"
          :loading = "loading"
          disable-initial-sort
        >
        <template slot="items" slot-scope="props">
        <td >{{ props.item.email }}</td>
        <td class="text-xs-right">{{ props.item.portfolio }}</td>
        <td class="text-xs-right">{{ props.item.post }}</td>
        <td class="text-xs-right">{{ props.item.reply }}</td>
        <td class="text-xs-right">{{ props.item.date }}</td>
        <td class="justify-center layout px-0">
            <v-btn icon class="mx-0" @click="editItem(props.item)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </td>
      </template>
        </v-data-table>

  </v-container>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import { maxHeaderSize } from 'http';

  export default {
    name: 'UserTable',
    data () {
    return {
      search:'',
      loading: true,
      headers: [
        {
          text: 'Email',
          align: 'center',
          sortable: false,
          value: 'email'
        },
        { text: 'Portfolio', value: 'portfolio', align: 'right' },
        { text: 'Post', value: 'post', align: 'right' },
        { text: 'Reply', value: 'reply', align: 'right' },
        { text: 'Date', value: 'date', align: 'right' },
      ],
      users: []
    }
  },
  mounted(){
    this.getUserData();
  },
  methods:{
    async getUserData(){
      const allUsers = await FirebaseService.getAllUserInfo();
        allUsers.forEach(async (user) => {
        const portfolioNum = await FirebaseService.getUserPortfolioNumber(user.email);
        // console.log(portfolioNum);
        const postNum = await FirebaseService.getUSerPostNumber(user.email);
        // console.log(postNum);
        let d = new Date(user.created_at.toDate());
        let month = d.getMonth();
        let date = d.getDate();
        if(month < 10){
          month = `0${month}`;
        }
        if(date < 10){
          date = `0${date}`;
        }
        d = `${d.getFullYear()}-${month}-${date}`;
        const replyNum = await FirebaseService.getUserReplyNumber(user.email);
        this.users.push({value: false, email: user.email, name: user.name ,portfolio: portfolioNum, post: postNum, reply: replyNum, date: d});
      });
    }
  },
  computed: {
    filteredList() {
      return this.users.filter(user => {
        return (user.name.toLowerCase().includes(this.search.toLowerCase()) || user.email.toLowerCase().includes(this.search.toLowerCase()));
      })
    }
  },
  watch: {
    users : function(val){
      if(val !== []){
        this.loading = false;
      }
    }
  }
  }
</script>
