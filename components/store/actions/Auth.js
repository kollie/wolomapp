import { RETRIEVE_TOKEN, LOGOUT, LOGIN } from "./ActionTypes"
import { uiStartLoading, uiStopLoading } from "./Loading";
import axios from 'axios'
import base64 from 'react-native-base64';
import { AsyncStorage } from "react-native";


export const handleAuth = (email, name, password) => {

    const authHeader = 'Basic ' + base64.encode(`${email}:${email}`)

    return dispatch => {
        dispatch(uiStartLoading());
        axios.post('http://192.168.137.142:5000/api/users', {
                email: email, 
                name: name,
                password: email
            }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
            })
            .then(res => { 
                console.log(res.data)

                axios.post('http://192.168.137.142:5000/api/tokens', {}, {
                  headers: { 'Authorization': authHeader }
                }).then((response) => {
                    
                    dispatch(uiStopLoading());
                    dispatch(signIn(res.data.email,response.data.token, res.data.id, res.data.name, res.data.picture))

                }).catch((err) => {
                  console.log(err.status)
                })

            })
            .catch(error => {
                console.log(error.status)
                if (error.response.data.message === 'please use a different email address') {
                  
                  axios.post('http://192.168.137.142:5000/api/tokens', {}, {
                  headers: { 'Authorization': authHeader }
                }).then((response) => {
                    console.log(response.data.token)

                    axios.get(`http://192.168.137.142:5000/api/users/${response.data.id}`, {
                      headers: { 'Authorization': `Bearer ${response.data.token}`}
                    }).then((rr) => {
                      console.log(rr.data)
                      dispatch(uiStopLoading());

                      dispatch(signIn(rr.data.email,response.data.token, rr.data.id, rr.data.name, rr.data.picture))

                    }).catch((err) => {
                      console.log(err.status)
                      dispatch(uiStopLoading());
                    })

                }).catch((err) => {
                  console.log(err.status)
                  dispatch(uiStopLoading());
                })

            }
        })
     }
  }

export const retrieveToken = () => {

        let userToken;
        let email;
        let name;
        let picture;
        userToken = null;
        email = null;
        name = null;
        picture = null;
    

    return async dispatch => {
        dispatch(uiStartLoading());

        try {
        const retrieveItem = await AsyncStorage.getItem('userInfo')
        const item = JSON.parse(retrieveItem);

        console.log(item.id, item.userToken);

        userToken = item.userToken
        email = item.email
        name = item.name
        picture = item.picture

        } catch (e) {
        console.log(e)
        dispatch(uiStopLoading());
        }

        dispatch(uiStopLoading());
        dispatch({ type: RETRIEVE_TOKEN, token: userToken, id: email, name: name, picture: picture })
    }
};

export const signOut = () => {

  return async dispatch => {
    dispatch(uiStartLoading());

    try {
      await AsyncStorage.removeItem('userInfo')
    } catch (e) {
      console.log(e)
      dispatch(uiStopLoading());
    }

    dispatch(uiStopLoading());
    dispatch({ type: LOGOUT })
  }
};

export const signIn = (email, token, userID, name, picture) => {

  return async dispatch => {
    let userDetails = {
      userToken: token,
      id: userID,
      name: name,
      picture: picture,
      email: email
    }
    
    try {
        await AsyncStorage.setItem('userInfo', JSON.stringify(userDetails))
    } catch (e) {
        console.log(e)
    }

    dispatch({ type: LOGIN, id: email, token: token, name: name, picture: picture })
  }
};

const refreshToken = (email) => {

  const authHeader = 'Basic ' + base64.encode(`${email}:${email}`)

  return async dispatch => {

    dispatch(uiStartLoading());

    axios.post('http://192.168.137.142:5000/api/tokens', {}, {
      headers: { 'Authorization': authHeader }
        }).then((response) => {
          console.log(response.data.token)

          axios.get(`http://192.168.137.142:5000/api/users/${response.data.id}`, {
             headers: { 'Authorization': `Bearer ${response.data.token}`}
              }).then(async (rr) => {
                  console.log(rr.data)
                  dispatch(uiStopLoading());

                  let userDetails = {
                    userToken: response.data.token,
                    id: rr.data.id,
                    name: rr.data.name,
                    picture: rr.data.picture
                  }

                  try {
                    await AsyncStorage.setItem('userInfo', JSON.stringify(userDetails))
                  } catch (e) {
                      console.log(e)
                  }

                  dispatch({ type: RETRIEVE_TOKEN, token: response.data.token, id: rr.data.email, name: rr.data.name, picture: rr.data.picture })

              }).catch((err) => {
                  console.log(err.status)
                  dispatch(uiStopLoading());
              })

        }).catch((err) => {
          console.log(err.status)
          dispatch(uiStopLoading());
    })

  }    

}

