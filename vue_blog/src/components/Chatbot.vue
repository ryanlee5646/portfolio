<template>
  <div>
    <transition name="fadeUp">
      <div class="chatbot-dialog" v-show="dialogShow">
        <div class="container">
          <div class="chat-output" id="chat-output">
            <div class="user-message">
              <div class="message">Hi! I'm a bot. What's up?</div>
            </div>
          </div>

          <div class="chat-input">
            <form action="#0" id="user-input-form">
              <input type="text" id="user-input" class="user-input" placeholder="Talk to the bot.">
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
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
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
export default {
  data() {
    return {
      fab: false,
      dialogShow: false,
    };
  },
  methods: {
    showDialog(flag) {
      this.dialogShow = flag;
    },
  },
  mounted() {
    const outputArea = document.getElementById('chat-output');
    const userInput = document.getElementById('user-input-form');
    userInput.addEventListener('submit', (event) => {
      event.preventDefault();

      const message = document.getElementById('user-input').value;

      outputArea.innerHTML += `
        <div class='bot-message'>
          <div class='message'>
            ${message}
          </div>
        </div>
        `;

      setTimeout(() => {
        outputArea.innerHTML += `
          <div class='user-message'>
            <div class='message'>
              I'm like 20 lines of JavaScript i can't actually talk to you.
            </div>
          </div>
        `;
      }, 250);

      document.getElementById('user-input').value = '';
    });
  },
};
</script>

<style scoped>
.container {
  box-sizing: border-box;
  font-size: 115%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 100%;
}

.chat-output {
  flex: 1;
  padding: 20px;
  display: flex;
  background: white;
  flex-direction: column;
  > div {
    margin: 0 0 20px 0;
  }
  .user-message {
    .message {
      background: #0FB0DF;
      color: white;
    }
  }
  .bot-message {
    text-align: right;
    .message {
      background: #eee;
    }
  }
  .message {
    display: inline-block;
    padding: 12px 20px;
    border-radius: 10px;
  }
}
.chat-input {
  padding: 20px;
  background: #eee;
  border: 1px solid #ccc;
  border-bottom: 0;
  align-self: flex-end;
  width: 100%;
  .user-input {
    width: 100%;
    font-size: 2rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
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
  background-color: white;
}
</style>
