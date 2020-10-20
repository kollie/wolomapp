import React, { useEffect, useState } from 'react'
import { Text, StatusBar, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Avatar, Card, Paragraph } from 'react-native-paper'
import moment from 'moment'
import MapView from 'react-native-maps';
import { getIssues, refreshToken } from '../store/actions/Auth';
import { connect } from 'react-redux';


const Home = ({ navigation, isLoading, email, token, picture, onRefreshToken }) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    onRefreshToken(email)
    const fetchData = async () => {
      const issues = await getIssues(token)
      setData(issues)
    };
    fetchData()
  }, []);

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Details')}
        style={{ margin: 20 }}
      >
        {
          picture != null ?
            <Avatar.Image source={{ uri: picture || `https://wolomapp.s3.amazonaws.com/${picture}` }}
              size={35}
            />
            :
            <Avatar.Icon
              style={{ backgroundColor: '#03989e' }}
              size={35}
              icon="account-circle" />
        }
      </TouchableOpacity>
    ),
  });


  return (
    <SafeAreaView style={{ ...styles.container }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <ScrollView>

        {
          data.map((item, key) => {
            return (
              <Card
                key={key}
                style={{ backgroundColor: '#f1f1f1', marginBottom: 10 }}
              >
                <Card.Title title={item.user.name}
                  subtitle={
                    <Text>
                      {item.user.address != null ? item.user.address : 'Shared from community'} | {moment(item.timestamp).fromNow()} <FontAwesome5 name="times-circle" size={10} color="#ff5757" />
                    </Text>
                  }
                  left={props =>
                    item.user.picture != null ?
                      <Avatar.Image {...props} source={{
                        uri: item.user.picture || `https://wolomapp.s3.amazonaws.com/${item.user.picture}`
                      }} />
                      :
                      <Avatar.Icon
                        {...props}
                        style={{ backgroundColor: '#03989e' }}
                        icon="account-circle" />
                  } />

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

                <Card.Cover source={{ uri: `https://wolomapp.s3.amazonaws.com/${item.picture}` }}
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

      <TouchableOpacity style={{ ...styles.addButton }}
        onPress={() => navigation.navigate('Notifications')}
      >
        <AntDesign name="pluscircleo" color='#03989e' size={50} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    isLoading: state.loading.isLoading,
    email: state.auth.email,
    picture: state.auth.picture,
    token: state.auth.userToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetIssues: (token) => dispatch(getIssues(token)),
    onRefreshToken: (email) => dispatch(refreshToken(email))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    zIndex: 100
  },
  map: {
    flex: 1,
    height: 250,
    borderWidth: 0.2,
    borderColor: '#03989e'
  },
})
