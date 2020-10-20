---
title: Building a location based app for sewage and garbage alert
sidebar_label: Wolomapp Tutorial
---

# Building a location based app for sewage and garbage alert

October 20, 2020

By [Israel Kollie](https://www.linkedin.com/in/israel-z-kollie-a0395b95/)

<img src="./assets/into screen.jpeg" width="100%" />
<br/><br/>

Ok, so I get up one morning and hearing outrageous outburst of people both on 
radio and social media about the over pouring of garbage and sewage systems
around the city of Monrovia. I saw this as major blow as this, especially looking
at the huge impact it would have on human health and the environment.
[News](https://allafrica.com/stories/201907160575.html)

I found out that there is a major gab between authorities responsible for clearing
the garbage and the people in the communities. No reporting tool, delay from authorities
due to limited workforce, hard to reach communities, no digital workflow, etc.

So, I recently began building a location based app that will allow community dwellers to raise an alert when there is garbage overflow. This will help both the community and the authorities to digitally handle garbage collection issues and keep the community clean, healthy and safe. The community dweller share a picture of the garbage and share it along with their location and the authorities dispitch a team to clear it in real time.

In this tutorial, I'm going to show you how I built the first version of the app. 

## Tools
* Expo
* React
* React Native
* Flask
* Heroku
* AWS S3 Bucket

## How will it work?

Reporting garbage overflow, first time user.

1. Launch the mobile app
1. Sign in with google
1. Click the big plus button to report a new issue
1. Accept permission to access you location
1. Take/upload a picture of the garbage
1. Add a description
1. And share

Here in action:

<img src="./assets/wolomapp.gif" width="100%" />

## Flow

<img src="/rust-tutorial/img/application_logic.png" width="100%" />

## Prerequisites
I installed the following to begin:

* Expo
* Nodejs
* Git
* Git bash, since I'm on Windows

## Create a new Expo project

Run the command:

```
bash
Expo init
```

I supplied name as Wolomapp and chose empty project template.

Configure screens:

```
const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#03989e"
      barStyle={{ backgroundColor: '#f9f9f9', height: 45 }}      
    >
      <Tab.Screen
        name="Feed"
        component={HomeStackScreen}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
      />
    </Tab.Navigator>
)

export default MainTabScreen

```

Check that the user has a valid token stored to take them to the home screen and they should signin:

```
const AppEntry = ({ isLoading, userToken, getToken }) => {


  useEffect(() => {

    setTimeout(() => {
      getToken()
    }, 1000)
  }, [])


  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }


  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {userToken !== null ? (
          <MainTabScreen />
        ) : <RootStackScreen />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


const mapStateToProps = state => {
  return {
    isLoading: state.loading.isLoading,
    userToken: state.auth.userToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getToken: () => dispatch(retrieveToken())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppEntry)

```

Get client IDs for IOs and Android from google developer console with Expo host and request the user to signin with google:

```
<View style={styles.button}>
      <TouchableOpacity
        style={styles.signIn}
        onPress={() => { handLogin() }}
      >
        <LinearGradient
          colors={['#08d4c4', '#01ab9d']}
          style={styles.signIn}
        >
          <Text style={[styles.textSign, {
            color: '#fff'
          }]}> <AntDesign name="google" size={24} color="#ff5757"
            style={{ paddingTop: 20 }}
            />  Sign In with Google</Text>
        </LinearGradient>
      </TouchableOpacity>
</View>
```

Get the user details upon success:

```
export const signInWithGoogleAsync = async () => {
  try {
    const result = await Google.logInAsync({
      androidClientId: 'clientIDAndroid',
      iosClientId: 'clientIDIos',
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


const handLogin = () => {
    const sign = signInWithGoogleAsync()
    sign.then((res) => {
      onLogin(res.user.email, res.user.name, res.user.photoUrl)
    }).catch((e) => {
      console.log(e)
    })
  }
```

I'm using Flask backend to store the user details from google and create a token. The token will then be returned to the client and stored in local storage. Everytime the user launches the app, I'm going to retrieve that token and refresh it at the backend and update it in the client.

```
export const handleAuth = (email, name, picture) => {

  const authHeader = 'Basic ' + base64.encode(`${email}:${email}`)

  return dispatch => {
    dispatch(uiStartLoading());
    axios.post(`${backendURL}/api/users`, {
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

        axios.post(`${backendURL}/api/tokens`, {}, {
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

          axios.post(`${backendURL}/api/tokens`, {}, {
            headers: { 'Authorization': authHeader }
          }).then((response) => {
            console.log(response.data.token)

            axios.get(`${backendURL}/api/users/${response.data.id}`, {
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
```

If the email does not exist, I'm creating a new user, otherwise I'm generating a new token and pass it to the cleint.

```
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
}

```

Retrieving the token:

```
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
}

```

## Reporting new garbage issue

Once the user is signed in, they can report a new garbage issue by sharing a picture and location.

```
export const createIssue = (email, userId, description, latitude, longitude, picture, token) => {

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return dispatch => {
    dispatch(uiStartLoading());
    axios.post(
      `${backendURL}/api/issues`,
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

```

This api route requires token authorization, so you must pass bearer to the post request. The picture that is shared by the user is stored in an S3 bucket. The configuration is done on the backed.

Creating a new user route in Flask api:

```
@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json() or {}
    if 'email' not in data or 'password' not in data:
        return bad_request('must include username, email and password fields')
    if User.query.filter_by(email=data['email']).first():
        return bad_request('please use a different email address')
    user = User()
    user.from_dict(data, new_user=True)
    db.session.add(user)
    db.session.commit()
    response = jsonify(user.to_dict())
    response.status_code = 201
    response.headers['Location'] = url_for('get_user', id=user.id)
    return response
```

Storing the garbage request:

```
def upload_file(file_name, bucket):
    object_name = file_name
    s3_client = boto3.client('s3')
    response = s3_client.upload_file(file_name, bucket, object_name)
    return response


@app.route('/api/issues', methods=['POST'])
@token_auth.login_required
def create_isses():
    data = request.get_json() or {}
    if 'user_id' not in data:
        return bad_request('must include user id field')
    if User.query.filter_by(id=data['user_id']).first() is None:
        return bad_request('invalid user id')
    data['picture'] = convert_and_save(data['picture'])
    issue = Issues()
    issue.from_dict(data, new_issue=True)
    db.session.add(issue)
    db.session.commit()
    response = jsonify(issue.to_dict())
    response.status_code = 201
    response.headers['Location'] = url_for('get_issue', id=issue.id)
    return response


def convert_and_save(b64_string):
    unique_filename = str(uuid.uuid4())
    filename = unique_filename + '.jpg'
    with open(filename, "wb") as fh:
        fh.write(base64.decodebytes(b64_string.encode()))
        upload_file(filename, BUCKET)
    return filename

```

The image received is in base64 and will be converted to jpg. I have changed the file name and uploaded it to S3 and save that name in my db. When I make the get request on the client side, I will append the file name to the S3 URL.

```
<ScrollView>

        {
          data.map((item, key) => {
            return (
              <Card
                key={key}
                style={{ backgroundColor: '#f1f1f1', marginBottom: 10 }}
              >
                <Card.Title title={item.user.name}
                 />

                <MapView
                  initialRegion={{
                    latitude: parseFloat(item.lat),
                    longitude: parseFloat(item.longi),
                    latitudeDelta: 0.0122,
                    longitudeDelta:
                      Dimensions.get("window").width /
                      Dimensions.get("window").height *
                      0.0122
                  }}
                  style={styles.map}
                >
                  <MapView.Marker coordinate={{ latitude: parseFloat(item.lat), longitude: parseFloat(item.longi) }} />
                </MapView>

                <Card.Cover source={{ uri: {item.picture` }}
                  style={{ marginTop: 1 }}
                />
                <Card.Actions>
                  <MaterialIcons name="comment" size={30} color="#03989e" />
                </Card.Actions>
                <Card.Content>
                  <Paragraph
                    style={{
                      color: "#52575D"
                    }}
                  >{item.comment}
                  </Paragraph>
                </Card.Content>

              </Card>
            )
          })
        }

</ScrollView>

```

I'm using react-native-maps to display the location on a map.

You can find the repo for the full frontend code [here]()


You can find the repo for the full backend api code [here]()


Useful link on create an api with flask [here]()


The api will be deployed on [Heroku](http://heroku.com/)
