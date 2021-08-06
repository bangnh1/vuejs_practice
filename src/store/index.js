import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations.js'
import actions from './actions.js'
import modules from './modules.js'
import getters from './getters.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  getters
})
