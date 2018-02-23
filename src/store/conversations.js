import Vue from 'vue'
import uuidv4 from 'uuid/v4'

const state = {
  all: {},
  allIds: [],
  allMsgIds: []
}

const mutations = {
  SET_CONVERSATION(state, {convo}) {
    const data = convo.data()
    state.all = {
      ...state.all,
      [convo.id]: {users: data.users, created: data.created, messages: []}
    }
    state.allIds.push(convo.id)
  },

  ADD_MESSAGE(state, {conversationId, message}) {
    if (!state.allMsgIds.includes(message.id)) {
      state.all[conversationId].messages.push(message)
      state.allMsgIds.push(message.id)
    }
  }
}

const actions = {
  seed({rootState}) {
    let convoRef = rootState.db.collection('conversations')

    convoRef.add({
      created: Date.now(),
      users: ['mr_a', 'mr_b'],
      messages: [
        { id: uuidv4(), text: 'Hey firestore Cal World', sender: 'mr_a', created: Date.now() },
        { id: uuidv4(), text: 'Hey yourself... wierdo', sender: 'mr_b', created: Date.now() }
      ]
    })

    convoRef.add({
      created: Date.now(),
      users: ['mr_a', 'mr_c'],
      messages: []
    })
  },
  async get({commit, rootState}) {
    let convoRef = rootState.db.collection('conversations')
    let convos = await convoRef.get()

    convos.forEach((convo) => {
      commit('SET_CONVERSATION', {convo})
    })
  },

  sendMessage({commit, rootState}, {text, created, sender, conversationId}) {
    const convoRef = rootState.db.collection('conversations').doc(conversationId)

    convoRef.update({
      messages: [
        ...state.all[conversationId].messages,
        {id: uuidv4(), created, sender, text}
      ]
    })
    .then((res) => console.log('message sent'))
    .catch((err) => console.log('Error', err))
  }
}

export default {namespaced: true, state, mutations, actions}
