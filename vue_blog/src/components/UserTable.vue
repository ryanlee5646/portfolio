<template>
  <v-container>

        <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="11"
          class="elevation-1"
        >
        <template slot="items" slot-scope="props">
        <td >{{ props.item.name }}</td>
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

  export default {
    name: 'UserTable',
    data () {
    return {
      headers: [
        {
          text: 'NickName',
          align: 'center',
          sortable: true,
          value: 'name'
        },
        { text: 'Portfolio', value: 'portfolio', align: 'right' },
        { text: 'Post', value: 'post', align: 'right' },
        { text: 'Reply', value: 'reply', align: 'right' },
        { text: 'Date', value: 'date', align: 'right' },
        { text: 'Actions', value: 'name', sortable: false, align: 'center' }
      ],
      desserts: []
    }
  },
  mounted(){
    this.getUserData();
  },
  methods:{
    async getUserData(){
      const users = await FirebaseService.getAllUserInfo();
      users.forEach(async (user) => {
        const portfolioNum = await FirebaseService.getUserPortfolioNumber(user.nickName);
        // console.log(portfolioNum);
        const postNum = await FirebaseService.getUSerPostNumber(user.nickName);
        // console.log(postNum);
        let d = new Date(user.created_at.toDate());
        d = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
        // console.log(d);
        const replyNum = 0;
        // const replyNum = await FirebaseService.getUSerReplyNumber();
        // console.log(replyNum);
        this.desserts.push({value: false, name: user.email, portfolio: portfolioNum, post: postNum, reply: replyNum, date: d});
      });
    }
  }
  }
</script>
