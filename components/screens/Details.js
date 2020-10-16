import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { signOut, refreshToken, updateProfilePic } from "../store/actions";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Modal, Portal, Provider } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import PickImage from "../utils/PickImage";
import { LinearGradient } from 'expo-linear-gradient'
import { getUserIssues } from "../store/actions/Auth";

const Details = ({ navigation, onLogOut, isLoading,
    name, onTokenRefresh, email, id,
    onUpdatePic, token, picture, count }) => {


    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);

    const hideModal = () => setVisible(false);

    const [dataSync, setDataSync] = useState([]);

    const [data, setData] = useState({
        images: null,
        imageValid: false,
    })

    navigation.setOptions({

        headerBackTitle: (<Text style={{ fontSize: 30, margin: 10 }}>{name}</Text>),
        headerRight: () => (
            <MaterialIcons name="edit" size={26}
                color='#777777'
                style={{
                    margin: 10
                }}
                onPress={() => { navigation.navigate('Details') }}
            ></MaterialIcons>
        )

    });

    useEffect(() => {
        const fetchData = async () => {
            const issues = await getUserIssues(token, id)
            console.log(issues)
            setDataSync(issues)
        };
        fetchData()
    }, []);

    useEffect(() => {

        setTimeout(() => {
            onTokenRefresh(email)
        }, 1000)
    }, [])

    const imagePickedHandler = images => {
        setData({
            ...data,
            images: images,
            imageValid: true
        })
    };

    const handSave = () => {
        if (!data.imageValid) {
            Alert.alert('No image', 'You must select an image', [
                { text: 'Okay' }
            ]);
            return
        }

        onUpdatePic(email, id, data.images.uri.base64, token)
        navigation.navigate('Details')
    }


    if (isLoading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>

                        {
                            picture != null ?
                                <Avatar.Image source={{
                                    uri: picture || `https://wolomapp.s3.amazonaws.com/${picture}`
                                }} style={{
                                    ...styles.image,
                                    borderColor: '#03989e',
                                    borderWidth: 2,
                                    backgroundColor: '#fff',
                                }} resizeMode="center" size={147} />
                                :
                                <Avatar.Icon
                                    style={{
                                        ...styles.image,
                                        borderColor: '#03989e',
                                        borderWidth: 2,
                                        backgroundColor: '#fff',
                                    }}
                                    size={240} icon="account-circle" />
                        }


                    </View>

                    <View style={{ ...styles.add, backgroundColor: '#03989e' }}>
                        <Ionicons
                            onPress={showModal}
                            name="ios-add" size={30} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}>
                        </Ionicons>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{name}</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Lakpazee Community</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{count}</Text>
                        <Text style={[styles.text, styles.subText]}>Shared</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>0</Text>
                        <Text style={[styles.text, styles.subText]}>Resolved</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>0</Text>
                        <Text style={[styles.text, styles.subText]}>Pending</Text>
                    </View>
                </View>

                <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                        {
                            dataSync.map((item, key) => {
                                return (
                                    <View key={key} style={styles.mediaImageContainer}>
                                        <Image source={{
                                            uri: `https://wolomapp.s3.amazonaws.com/${item.picture}`
                                        }} style={styles.image} resizeMode="cover"></Image>
                                    </View>
                                )
                            })
                        }

                    </ScrollView>
                    <View style={styles.mediaCount}>
                        <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>{count}</Text>
                        <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Issues</Text>
                    </View>
                </View>
                <Text style={[styles.subText, styles.recent]}>Keep sharing to keep your community clean and safe</Text>
                <TouchableOpacity
                    style={{ ...styles.recent, alignItems: 'center', justifyContent: 'center', height: 50, width: 300, borderWidth: 1, borderRadius: 70, borderColor: '#03989e' }}
                    onPress={() => onLogOut()}
                >
                    <Text style={{ color: '#03989e', fontSize: 20 }}>Sign Out</Text>
                </TouchableOpacity>

                <Modal visible={visible} onDismiss={hideModal}
                    contentContainerStyle={{
                        backgroundColor: '#41444B', height: '60%', width: '80%',
                        left: '10%', bottom: '5%', padding: 20, paddingBottom: 100,
                    }}
                >
                    <PickImage onImagePicked={imagePickedHandler} />
                    <TouchableOpacity
                        style={{ ...styles.signIn, marginTop: 10 }}
                        onPress={() => { handSave() }}
                        disabled={!data.imageValid}
                    >
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff',
                                fontSize: 20
                            }]}>Save</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Modal>

            </ScrollView>
        </SafeAreaView>
    );
}

const mapStateToProps = state => {
    return {
        isLoading: state.loading.isLoading,
        name: state.auth.name,
        email: state.auth.email,
        id: state.auth.userId,
        token: state.auth.userToken,
        picture: state.auth.picture,
        count: state.auth.issue_count
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch(signOut()),
        onTokenRefresh: email => dispatch(refreshToken(email)),
        onUpdatePic: (email, id, picture, token) => dispatch(updateProfilePic(email, id, picture, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0"
    },
    text: {
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
        width: 150,
        height: 150,
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
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
});