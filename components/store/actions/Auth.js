import { RETRIEVE_TOKEN, LOGOUT, LOGIN, REFRESH_TOKEN, SET_ISSUES } from "./ActionTypes"
import { uiStartLoading, uiStopLoading } from "./Loading";
import axios from 'axios'
import base64 from 'react-native-base64';
import { AsyncStorage } from "react-native";
import * as Google from 'expo-google-app-auth';


export const handleAuth = (email, name, picture) => {

  const authHeader = 'Basic ' + base64.encode(`${email}:${email}`)

  return dispatch => {
    dispatch(uiStartLoading());
    axios.post('http://10.15.15.178:5000/api/users', {
      email: email,
      name: name,
      picture: picture,
      password: email,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(res.data)

        axios.post('http://10.15.15.178:5000/api/tokens', {}, {
          headers: { 'Authorization': authHeader }
        }).then((response) => {

          dispatch(uiStopLoading());
          dispatch(signIn(res.data.email, response.data.token, res.data.id, res.data.name, res.data.picture, res.data.issue_count))

        }).catch((err) => {
          console.log(err.status)
        })

      })
      .catch(error => {
        console.log(error.status)
        if (error.response.data.message === 'please use a different email address') {

          axios.post('http://10.15.15.178:5000/api/tokens', {}, {
            headers: { 'Authorization': authHeader }
          }).then((response) => {
            console.log(response.data.token)

            axios.get(`http://10.15.15.178:5000/api/users/${response.data.id}`, {
              headers: { 'Authorization': `Bearer ${response.data.token}` }
            }).then((rr) => {
              console.log(rr.data)
              dispatch(uiStopLoading());

              dispatch(signIn(rr.data.email, response.data.token, rr.data.id, rr.data.name, rr.data.picture, rr.data.issue_count))

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
  let id;
  let count;
  userToken = null;
  email = null;
  name = null;
  picture = null;
  id = null;
  count = null;


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
      id = item.id
      count = item.issue_count

    } catch (e) {
      console.log(e)
      dispatch(uiStopLoading());
    }

    dispatch(uiStopLoading());
    dispatch({ type: RETRIEVE_TOKEN, token: userToken, id: email, name: name, picture: picture, userId: id, count: count })
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

export const signIn = (email, token, userID, name, picture, count) => {

  return async dispatch => {
    let userDetails = {
      userToken: token,
      id: userID,
      name: name,
      picture: picture,
      email: email,
      count: count
    }

    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(userDetails))
    } catch (e) {
      console.log(e)
    }

    dispatch({ type: LOGIN, id: email, token: token, name: name, picture: picture, userId: userID, count: count })
  }
};


export const createIssue = (email, userId, description, latitude, longitude, picture, token) => {

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return dispatch => {
    dispatch(uiStartLoading());
    axios.post(
      'http://10.15.15.178:5000/api/issues',
      {
        lat: latitude,
        longi: longitude,
        picture: picture,
        comment: description,
        user_id: userId
      },
      config
    ).then((rr) => {
      dispatch(uiStopLoading());
      console.log(rr.data)
    }).catch((err) => {
      console.log(err.response)
      dispatch(uiStopLoading());
    })
  }
}

export const refreshToken = (email) => {

  const authHeader = 'Basic ' + base64.encode(`${email}:${email}`)

  return async dispatch => {

    axios.post('http://10.15.15.178:5000/api/tokens', {}, {
      headers: { 'Authorization': authHeader }
    }).then((response) => {
      console.log(response.data.token)

      axios.get(`http://10.15.15.178:5000/api/users/${response.data.id}`, {
        headers: { 'Authorization': `Bearer ${response.data.token}` }
      }).then(async (rr) => {
        console.log(rr.data)

        let userDetails = {
          userToken: response.data.token,
          id: rr.data.id,
          name: rr.data.name,
          picture: rr.data.picture,
          email: rr.data.email,
          count: rr.data.issue_count
        }

        try {
          await AsyncStorage.setItem('userInfo', JSON.stringify(userDetails))
        } catch (e) {
          console.log(e)
        }

        dispatch({
          type: REFRESH_TOKEN, token: response.data.token,
          id: rr.data.email, name: rr.data.name, picture: rr.data.picture,
          userId: rr.data.id, count: rr.data.issue_count
        })

      }).catch((err) => {
        console.log(err.status)
      })

    }).catch((err) => {
      console.log(err.status)
    })

  }

}

export const updateProfilePic = (email, id, picture, token) => {

  console.log(email, id, token)

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return dispatch => {
    dispatch(uiStartLoading());

    axios.put(
      `http://10.15.15.178:5000/api/users/${id}`,
      {
        picture: picture,
      },
      config
    ).then((rr) => {
      console.log(rr.data)
      dispatch(uiStopLoading());
      refreshToken(email)
    }).catch((err) => {
      console.log(err)
      dispatch(uiStopLoading());
    })
  }
}

export const updateName = (email, id, name) => {

  return dispatch => {
    dispatch(uiStartLoading());
    axios.put(`http://10.15.15.178:5000/api/users/${id}`, {
      name: name
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        // console.log(res.data)
        refreshToken(email)
        dispatch(uiStopLoading());
      })
      .catch(error => {
        console.log(error.response)
        dispatch(uiStopLoading());
      })
  }
}


export const getIssues = async (token) => {

  const issues = await axios.get('http://10.15.15.178:5000/api/issues', {
    headers: { 'Authorization': `Bearer ${token}` }
  }).catch((e) => {
    console.log(e)
  })

  return issues.data
}


export const getUserIssues = async (token, user_id) => {

  const issues = await axios.get(`http://10.15.15.178:5000/api/issues/${user_id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  }).catch((e) => {
    console.log(e)
  })

  return issues.data.issue
}



export const setIssues = issues => {
  return {
    type: SET_ISSUES,
    issues: issues
  };
};


export const signInWithGoogleAsync = async () => {
  try {
    const result = await Google.logInAsync({
      androidClientId: '385188704290-uo01oincqveb1d8ej9ckjlpoacat8hsu.apps.googleusercontent.com',
      iosClientId: '385188704290-q225hnqmqffhsk8rp3nkhdrsndpqej40.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      console.log(result)
      return result
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}

