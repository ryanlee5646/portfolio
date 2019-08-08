<template>
  <div>
    <transition name="fadeRight">
      <div class="chatbot-dialog" v-show="dialogShow">
        <div class="container">
          <div class="chatbot-dialog-head">
            <v-icon @click="showDialog(false)">keyboard_arrow_right</v-icon>
          </div>

          <div class="chat-output scrollbar" id="chat-output">
              <Message v-for="(dialog, idx) in dialogs" :key="idx"
                :speaker="dialog.speaker"
                :type="dialog.type"
                :text="dialog.text"
                :cover="dialog.cover"
              ></Message>
          </div>
          <div class="chat-input">
            <form action="#0" id="user-input-form">
              <v-text-field
                v-model="input"
                label="궁금하신 사항을 물어보세요"
                append-icon="send"
                ></v-text-field>
            </form>
          </div>
        </div>
      </div>
    </transition>
    <v-speed-dial
      class="tool-btn"
      v-model="fab"
      direction="top"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          fab
        >
          <v-icon v-if="fab">close</v-icon>
          <v-icon v-else>more</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
        @click="routePage('/post/write#postWriter')"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
        @click="routePage('/portfolio/write#portfolioWriter')"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
        @click="showDialog(true)"
      >
        <v-icon>chat</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>


<script>
import Message from './Message.vue';
import axios from 'axios';

export default {
  data() {
    return {
      fab: false,
      dialogShow: false,
      input: '',
      dialogs: [
        {
          speaker: 'bot',
          type: 'text',
          text: '안녕하세요. 무엇을 도와드릴까요? 사이트에 대해서 물어보시거나 개발자들에 대해 물어보세요!',
        },
      ],
    };
  },
  components: {
    Message,
  },
  methods: {
    showDialog(flag) {
      this.dialogShow = flag;
    },
    routePage(target, event) {
      this.$router.push({ path: target });
    },
    dialogScrollDown() {
      const outputArea = document.getElementById('chat-output');
      outputArea.scrollTop = outputArea.scrollHeight;
    },
    sendMessage(params) {
      axios
        .post('/api', params)
        .then((response) => {
          response.data.bubbles.forEach((element) => {
            if (element.type === 'template') {
              this.dialogs.push({
                speaker: 'bot',
                type: 'template',
                text: element.data.contentTable,
                cover: element.data.cover,
              });
            } else {
              this.dialogs.push({
                speaker: 'bot',
                type: 'text',
                text: element.data.description,
              });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          this.dialogScrollDown();
        });
    },
  },
  mounted() {
    const userInput = document.getElementById('user-input-form');
    userInput.addEventListener('submit', (event) => {
      event.preventDefault();

      this.dialogs.push({
        speaker: 'user',
        type: 'text',
        text: this.input,
      });

      let params = {
        message: this.input,
        action: 'send',
        userid: 'dbsrhksdnd@gmail.com',
      };

      this.sendMessage(params);

      this.input = '';
    });
  },
};
</script>

<style lang="scss" scoped>

.container {
  box-sizing: border-box;
  // font-size: %;
  padding: 20px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 100%;
}

.chat-output {
  flex: 1;
  padding: 10px;
  display: flex;
  background: white;
  overflow-y: auto;
  flex-direction: column;
  > div {
    margin: 0 0 20px 0;
  }
}
.chat-input {
  padding: 5px 10px 5px 10px;
  border-bottom: 0;
  align-self: flex-end;
  width: 100%;
  .user-input {
    width: 100%;
    font-size: 2rem;
  }
}

.tool-btn{
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.chatbot-dialog{
  position: fixed;
  bottom: 80px;
  right: 80px;
  width: 350px;
  height: 450px;
  border-radius: 15px;
  border: 1px solid white;
  background-color: white;
}

.chatbot-dialog-head{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px;
  margin: 5px 5px 10px 5px;
}
.scrollbar {
  &::-webkit-scrollbar {
    width: 3px;
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    background: #f8f7fb;
    opacity: .4;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }
}
</style>
