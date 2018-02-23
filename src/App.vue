<template>
  <div>
    <Initialize />
    <ConversationContainer
      class="conversation-container"
      v-for="id in convoIds"
      :conversation="conversations[id]"
      :id="id"
      :key="id"
    />
  </div>
</template>

<script>
import Initialize from './Initialize'
import ConversationContainer from './ConversationContainer'

import {mapState} from "vuex"

export default {
  name: 'app',

  // created() {
  //   console.log(this.$store.state.db)
  // },

  components: {
    Initialize,
    ConversationContainer
  },

  computed: {
    ...mapState({
      conversations: (state) => state.conversations.all,
      convoIds: (state) => state.conversations.allIds
    })
  }
}
</script>

<style>
  .conversation-container {
    margin-top: 20px
  }
</style>

