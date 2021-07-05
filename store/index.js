export const state = () => ({
    login : false,
    mail: false,
    pair: []
})

export const mutations = {
    loging (state){
        state.login = true
    }
}