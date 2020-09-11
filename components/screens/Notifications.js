import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const Notifications = () => {
    return (
      <View style={{ ...styles.container }}>
        <Text>Profile Screen</Text>
      </View>
    );
}

export default Notifications

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
})
