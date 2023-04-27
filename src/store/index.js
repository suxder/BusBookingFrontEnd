/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import {
  SET_ROLE,
  REMOVE_ROLE,
} from './mutations-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accountInfo: {
      role: '',
      accountId: -1,
      username: '',
      pwd: '',
      tel: '',
      gender: '',
      identityCard: ''
    }
  },
  getters: {
    getRole(state) {
      return state.accountInfo.role ? state.accountInfo.role : localStorage.getItem("role")
    },
  },
  mutations: {
    [SET_ROLE](state, {
      role,
      accountId,
      username,
      pwd,
      tel,
      gender,
      identityCard
    }) {
      state.accountInfo.role = role
      state.accountInfo.accountId = accountId
      state.accountInfo.username = username
      state.accountInfo.pwd = pwd
      state.accountInfo.tel = tel
      state.accountInfo.gender = gender
      state.accountInfo.identityCard = identityCard
      localStorage.setItem("role", role)
      localStorage.setItem("accountId", accountId)
      localStorage.setItem("username", username)
      localStorage.setItem("pwd", pwd)
      localStorage.setItem("tel", tel)
      localStorage.setItem("gender", gender)
      localStorage.setItem("identityCard", identityCard)
    },
    [REMOVE_ROLE](state) {
      state.accountInfo.role = ''
      state.accountInfo.accountId = -1
      state.accountInfo.username = ''
      state.accountInfo.pwd = ''
      state.accountInfo.tel = ''
      state.accountInfo.gender = ''
      state.accountInfo.identityCard = ''
      localStorage.clear()
    }
  },
})
