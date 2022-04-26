import Cookies from 'js-cookie'
import { removeToken } from '@/utils/auth'
import setting from '@/setting.js';
import { setLocalStorage, getLocalStorage } from '@/utils/local-storage.js';

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    language: Cookies.get('language') || 'zh',
    size: Cookies.get('size') || 'small',
    bashApi: Cookies.get('bashApi') || process.env.VUE_APP_BASE_API,
    setting: setting
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      // 是否显示侧边导航栏
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      // 主内容是否全屏
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      // state.device = 'desktop'
      state.device = device // 显示遮罩层
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_SIZE: (state, size) => {
      state.size = size
      Cookies.set('size', size)
    },
    // 改变基地址
    CHANGE_BASH_API: (state, params) => {
      state.bashApi = params
      Cookies.set('bashApi', params)
      removeToken()
    },
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setSize({ commit }, size) {
      commit('SET_SIZE', size)
    },
  }
}

export default app
