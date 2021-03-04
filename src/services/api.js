import AsyncStorage from '@react-native-community/async-storage'
import {create} from 'apisauce'


const api = create ({
    baseURL: 'http://localhost:3000',

})

api.addAsyncRequestTransform(request => async () => {
    const token = await AsyncStorage.getItem('@CodeApi:token')

    

    if(token){
        request.headers['Authorization'] = `Beare ${token}`
    }
})

api.addResponseTransform(response =>{
    if(!response.ok) throw response
})

export default api