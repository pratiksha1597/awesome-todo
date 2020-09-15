import { LocalStorage } from 'quasar'

const state = {
settings: {
    show12HourTimeFormat:false,
    showTasksInOneList : false,
    }
}

const mutations = {
    setshow12HourTimeFormat(state , value){
        state.settings.show12HourTimeFormat = value
    },
    setshowTasksInOneList(state , value){
        state.settings.showTasksInOneList = value
    },
    setSettings(state,settings){
        Object.assign(state.settings, settings)
    }
}

const actions = {
    setshow12HourTimeFormat({ commit , dispatch }, value){
        commit('setshow12HourTimeFormat' , value)
        dispatch('saveSettings')
        
    },
    setshowTasksInOneList({ commit , dispatch }, value){
        commit('setshowTasksInOneList' , value)
        dispatch('saveSettings')
    },
    saveSettings({ state }){
        LocalStorage.set('settings', state.settings)
    },
    getSettings({ commit }) {
        let settings = LocalStorage.getItem('settings')
        //console.log('settings :' , settings)
        if (settings) {
            commit('setSettings', settings)
        }
    }

}

const getters = {
settings : state => {
return state.settings
}
}


export default {
    namespaced :true,
     state,
     mutations,
     actions,
     getters
}