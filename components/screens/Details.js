import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { signOut } from "../store/actions";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

const Details = ({ onLogOut, isLoading, name }) => {


  if (isLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Avatar.Image source={{
                          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcScDstgJkG45NsAFs4jdsFAw7ChW2MBHkjGhw&usqp=CAU'
                        }} style={{...styles.image, 
                          borderColor: '#03989e',
                          borderWidth: 2,
                          backgroundColor: '#fff',
                        }} resizeMode="center" size={200} />
                    </View>
                    {/* <View style={styles.dm}>
                        <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
                    </View>
                    <View style={styles.active}></View> */}
                    <View style={{...styles.add, backgroundColor: '#03989e'}}>
                        <Ionicons name="ios-add" size={30} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{name}</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Lakpazee Community</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>10</Text>
                        <Text style={[styles.text, styles.subText]}>Shared</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>3</Text>
                        <Text style={[styles.text, styles.subText]}>Resolved</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>6</Text>
                        <Text style={[styles.text, styles.subText]}>Pending</Text>
                    </View>
                </View>

                <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.mediaImageContainer}>
                            <Image source={{
                              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcScDstgJkG45NsAFs4jdsFAw7ChW2MBHkjGhw&usqp=CAU'
                            }} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={{
                              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcScDstgJkG45NsAFs4jdsFAw7ChW2MBHkjGhw&usqp=CAU'
                            }} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={{
                              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcScDstgJkG45NsAFs4jdsFAw7ChW2MBHkjGhw&usqp=CAU'
                            }} style={{...styles.image}} resizeMode="cover"></Image>
                        </View>
                    </ScrollView>
                    <View style={styles.mediaCount}>
                        <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>10</Text>
                        <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Issues</Text>
                    </View>
                </View>
                <Text style={[styles.subText, styles.recent]}>Keep sharing to keep your community clean and safe</Text>
                <TouchableOpacity 
                style={{...styles.recent, alignItems: 'center', justifyContent: 'center', height: 50, width: 300, borderWidth: 1, borderRadius: 70, borderColor: '#03989e'}}
                onPress={() => onLogOut()}
                >
                  <Text style={{color: '#03989e', fontSize: 20}}>Sign Out</Text>
                </TouchableOpacity>
                <View style={{ alignItems: "center" }}>
                    {/* <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Started following <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
                            </Text>
                        </View>
                    </View> */}

                    {/* <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Started following <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
                            </Text>
                        </View>
                    </View> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const mapStateToProps = state => {
  return {
    isLoading: state.loading.isLoading,
    email: state.auth.email,
    name: state.auth.name
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => dispatch(signOut())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 70,
        overflow: "hidden",
        marginTop: 15
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 40,
        height: 40,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }
});