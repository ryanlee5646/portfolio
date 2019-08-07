<template>
  <!-- https://codepen.io/andgordy/pen/dxoPvj -->
<div  class="text-black antialiased">
<div class="fixed w-screen h-screen bg-gray-300 top-0 left-0 flex items-center justify-center px-4 py-5">
  <div class="w-full max-w-lg rounded-lg bg-white shadow-lg flex flex-col" style="height: 100%; max-height: 500px;">
    <!--header-->
    <div class="h-16 border-b border-gray-400 px-4 flex items-center">
      <div class="leading-tight">
        <div class="font-bold text-lg">#general</div>
        <div class="text-sm opacity-25">Stuff for everyone</div>
      </div>
    </div>
    <!--messages-->
    <div class="flex-1 overflow-hidden">
      <div class="flex flex-col min-h-full">
        <div class="flex-1"></div>
        <div v-for="mess,k in messages" class="flex items-start px-4 py-3">
          <div class="w-12 h-12 rounded bg-pink-500 mr-3 bg-cover" :style="{backgroundImage: 'url(' + users[mess.user].userpic + ')'}"></div>
          <div class="flex-1">
            <div class="leading-none pt-1">
              <span class="font-bold">{{users[mess.user].username}}</span>
              <span class="opacity-50 text-xs pl-1">{{mess.time}}</span>
            </div>
            <div class="pt-1 leading-tight">
              {{mess.text}}
            </div>
            <!--theresAReply-->
            <transition name="theresAReply">
              <div v-if="mess.doesHaveReplies" class="flex items-center mt-2 h-6">
                <div class="w-6 h-6 mr-2 rounded bg-blue-500 bg-cover" :style="{backgroundImage: 'url(' + users[0].userpic + ')'}"></div>
                <div class="text-xs">
                  <span class="text-blue-600 font-medium">1 reply</span>
                  <span class="opacity-50 pl-1">Last reply now</span>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div class="h-3"></div>
      </div>
    </div>
    <!--new thread-->
    <transition name="newThreadMess">
      <div v-if="selectedThread !== null" class="bg-blue-600 flex items-center text-white overflow-hidden">
        <div class="text-sm font-medium pl-4 pr-2 flex-1 truncate" style="padding-top: 7px; padding-bottom: 7px;">
          <!-- Replying to {{users[selectedUser].name}}: {{suggMessages[selectedThread].text}} -->
        </div>
        <button class="ion-md-close text-white p-1 mr-3" style="padding-top: 7px;" @click="selectedThread = null"></button>
      </div>
    </transition>
    <!--new message-->
    <div class="border-t border-gray-400 px-3 relative">
      <!--mention suggs-->
      <transition name="mentionSuggs">
        <div class="absolute border bottom-0 left-0 py-1 bg-white rounded shadow" style="bottom: 40px; width: calc(100% - 24px); margin: 0 12px" v-if="doShowMentionSuggs">
          <div v-for="user,i in users" class="px-3 py-2 flex items-center" :class="{'bg-blue-600 text-white': selectedMentionSugg === i}">
            <div class="w-6 h-6 mr-3 rounded bg-blue-500 bg-cover" :style="{backgroundImage: 'url(' + user.userpic + ')'}">
            </div>
            <div class="font-medium">{{user.name}}</div>
            <div class="mx-2 rounded-full bg-green-400 w-2 h-2"></div>
            <div class="opacity-50">{{user.username}}</div>
          </div>
        </div>
      </transition>
      <!--thread suggs-->
      <transition name="threadSuggs">
        <div class="absolute border bottom-0 left-0 py-1 bg-white rounded shadow flex flex-col-reverse" style="bottom: 40px; width: calc(100% - 24px); margin: 0 12px" v-if="doShowThreadSuggs">
          <div v-for="mess,i in suggMessages" class="px-3 py-2 flex items-center" :class="{'bg-blue-600 text-white': selectedThreadSugg === i}">
            <div class="ion-ios-undo text-lg opacity-25 mr-3"></div>
            <div class="mr-2 truncate">{{mess.text}}</div>
            <div class="opacity-50 text-sm">2:30pm</div>
          </div>
        </div>
      </transition>
      <!--input-->
      <div class="h-12 flex items-center">
        <button class="ion-md-attach text-xl text-gray-600 px-2"></button>
        <input type="text" id="newMesInput" class="flex-1 px-2" v-model="newMesInput" @keydown.up.prevent="upPressed()" @keydown.down.prevent="downPressed()" @keydown.enter.prevent="enterPressed()" @keydown.esc.prevent="escPressed()">
        <button class="ion-ios-at text-xl text-gray-600 px-2" :class="{'text-blue-500': doShowMentionSuggs}"></button>
        <button class="ion-ios-undo text-xl text-gray-600 px-2" :class="{'text-blue-500': doShowThreadSuggs}"></button>
        <button class="ion-md-happy text-xl text-gray-600 px-2"></button>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<style>
input,
textarea,
button:focus,
select {
  outline: none;
  resize: none;
}

input::placeholder,
textarea::placeholder {
  color: #A0AEC0;
  opacity: 1;
}

select {
  -webkit-appearance: none;
  background: center right 12px / 12px url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1703172/shevron.png) no-repeat;
}

.mentionSuggs-enter-active,
.mentionSuggs-leave-active {
  transition: all .2s;
}

.mentionSuggs-enter,
.mentionSuggs-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
  transform: translateY(8px)
}

.threadSuggs-enter-active {
  transition: all .2s .2s;
}

.threadSuggs-leave-active {
  transition: all .2s;
}

.threadSuggs-enter,
.threadSuggs-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
  transform: translateY(8px)
}

.newThreadMess-enter-active {
  transition: all .2s .2s;
}

.newThreadMess-leave-active {
  transition: all .2s;
}

.newThreadMess-enter,
.newThreadMess-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
  height: 0;
}

.theresAReply-enter-active {
  transition: all .2s;
}

.theresAReply-leave-active {
  transition: all .2s;
}

.theresAReply-enter,
.theresAReply-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
  height: 0;
}
</style>

<script>
export default {
  name: 'reply',
  data: {
    newMesInput: '',
    users: [{
        name: 'And Gordy',
        username: 'andgordy',
        userpic: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1703172/slack-thread-ava-3.png'
      },
      {
        name: 'Jane Lee',
        username: 'Jane Lee',
        userpic: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1703172/slack-thread-ava-2.png'
      },
      {
        name: 'Steve Allen',
        username: 'Steve Allen',
        userpic: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1703172/slack-thread-ava-1.png'
      },
    ],
    messages: [{
        user: 1,
        time: '2:30 PM',
        text: 'Morning, everyone!',
        doesHaveReplies: false,
      },
      {
        user: 1,
        time: '2:30 PM',
        text: 'We need some experts for the upcoming design sprint 🙄',
        doesHaveReplies: false,
      }
    ],
    isWatcherPaused: false,
    //
    doShowMentionSuggs: false,
    selectedMentionSugg: 0,
    selectedUser: 0,
    //
    doShowThreadSuggs: false,
    selectedThread: null
  },
  computed: {
    suggMessages() {
      return this.messages.filter(mess => mess.user === this.selectedUser)
    },
    selectedThreadSugg() {
      return this.suggMessages.length - 1 || 0
    }
  },
  watch: {
    newMesInput() {
      if (this.newMesInput.endsWith("@")) this.doShowMentionSuggs = true
      else this.doShowMentionSuggs = false
      if (!this.isWatcherPaused) this.doShowThreadSuggs = false
    }
  },
  methods: {
    upPressed() {
      if (this.doShowMentionSuggs) {
        if (this.selectedMentionSugg !== 0) {
          this.selectedMentionSugg = this.selectedMentionSugg - 1
        } else {
          this.selectedMentionSugg = this.users.length - 1
        }
      } else if (this.doShowThreadSuggs) {
        if (this.selectedThreadSugg !== 0) {
          this.selectedThreadSugg = this.selectedThreadSugg - 1
        } else {
          this.selectedThreadSugg = this.suggMessages.length - 1
        }
      }
    },
    downPressed() {
      if (this.doShowMentionSuggs) {
        if (this.selectedMentionSugg !== this.users.length - 1) {
          this.selectedMentionSugg = this.selectedMentionSugg + 1
        } else {
          this.selectedMentionSugg = 0
        }
      } else if (this.doShowThreadSuggs) {
        if (this.selectedThreadSugg !== this.suggMessages.length - 1) {
          this.selectedThreadSugg = this.selectedThreadSugg + 1
        } else {
          this.selectedThreadSugg = 0
        }
      }
    },
    enterPressed() {
      if (this.doShowMentionSuggs) {
        this.newMesInput = this.newMesInput + this.users[this.selectedMentionSugg].username + ' '
        this.doShowMentionSuggs = false
        this.selectedUser = this.selectedMentionSugg
        this.selectedMentionSugg = 0
        this.doShowThreadSuggs = true
        this.isWatcherPaused = true
        setTimeout(() => {
          this.isWatcherPaused = false
        }, 1000)
      } else if (this.doShowThreadSuggs) {
        this.selectedThread = this.selectedThreadSugg
        this.selectedThreadSugg = 0
        this.doShowThreadSuggs = false
      } else {
        if (this.selectedThread === null) {
          this.messages.push({
            user: 0,
            time: 'now',
            text: this.newMesInput
          })
        } else {
          this.messages.filter(mess => mess.user === this.selectedUser)[this.selectedThread].doesHaveReplies = true
        }
        this.newMesInput = ''
        this.selectedThread = null
      }
    },
    escPressed() {
      this.doShowMentionSuggs = false
      this.selectedMentionSugg = 0
      this.doShowThreadSuggs = false
      this.selectedThreadSugg = 0
    }
  },
  created() {
    setTimeout(() => {
      this.messages.push({
        user: 2,
        time: '2:30 PM',
        text: 'Sorry, will skip this time 😓',
        doesHaveReplies: false,
      })
    }, 1000)
  },
  mounted() {
    document.getElementById('newMesInput').focus()
  }
}
</script>
