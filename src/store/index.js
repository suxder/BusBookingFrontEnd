/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import {
  SET_ROLE,
  REMOVE_ROLE,
  SET_USERINFO,
  SET_ADMININFO,
  SET_SUPERADMININFO
} from './mutations-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accountInfo: {
      role: 'tourist',
      accountID: -1,
    },
    userInfo: {
      telephone: '',
      userName: '',
      userGender: 1,
      userIDCard: '',
      userEmail: '',
      userAddress: '',
    },
    ptcAdminInfo: {
      telephone: '',
      adminName: '',
      adminPtc: ''
    },
    superAdminInfo: {
      telephone: '',
      adminName: '',
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
      accountID,
    }) {
      state.accountInfo.role = role
      state.accountInfo.accountId = accountID
      localStorage.setItem("role", role)
      localStorage.setItem("accountID", accountID)
    },
    [REMOVE_ROLE](state) {
      state.accountInfo.role = 'tourist'
      state.accountInfo.accountID = -1
      localStorage.clear() 
      localStorage.setItem('role', 'tourist')
      localStorage.setItem('accountID', -1)
    },
    [SET_USERINFO](state , {
      telephone,
      userName,
      userGender,
      userIDCard,
      userEmail,
      userAddress,
    }) {
      state.userInfo.telephone = telephone
      state.userInfo.userName = userName
      state.userInfo.userGender = userGender
      state.userInfo.userIDCard = userIDCard
      state.userInfo.userEmail = userEmail
      state.userInfo.userAddress = userAddress
      localStorage.setItem('telephone', telephone)
      localStorage.setItem('userName', userName)
      localStorage.setItem('userGender', userGender)
      localStorage.setItem('userIDCard', userIDCard)
      localStorage.setItem('userEmail', userEmail)
      localStorage.setItem('userAddress', userAddress)
    },
    [SET_ADMININFO](state, {
      telephone,
      adminName,
      adminPtc
    }) {
      state.ptcAdminInfo.telephone = telephone
      state.ptcAdminInfo.adminName = adminName
      state.ptcAdminInfo.adminPtc = adminPtc
      localStorage.setItem('telephone', telephone)
      localStorage.setItem('adminName', adminName)
      localStorage.setItem('adminPtc', adminPtc)
    },
    [SET_SUPERADMININFO](state, {
      telephone,
      adminName
    }) {
      state.superAdminInfo.telephone = telephone
      state.superAdminInfo.adminName = adminName
      localStorage.setItem('telephone', telephone)
      localStorage.setItem('adminName', adminName)
    }
  },
})
