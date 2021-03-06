import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Avatar,
    Title,
    Caption,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
    Paragraph
} from 'react-native-paper'
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'
import { connect } from 'react-redux';


import { signOut } from '../store/actions/index'


const DrawerContent = ({ props, onLogOut, isLoading, email, name }) => {

    const [isDarkTheme, setIsDarkTheme] = useState(false)

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme)
    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        )
    }


    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={{ ...styles.drawerContent }}>
                    <View style={{ ...styles.userInfoSection }}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcScDstgJkG45NsAFs4jdsFAw7ChW2MBHkjGhw&usqp=CAU'
                                }}
                                size={50}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={{ ...styles.title }}>{name}</Title>
                                <Caption style={{ ...styles.caption }}>{email}</Caption>
                            </View>
                        </View>

                        <View style={{ ...styles.row }}>
                            <View style={{ ...styles.section }}>
                                <Paragraph style={{
                                    ...styles.paragraph,
                                    ...styles.caption
                                }}>100</Paragraph>
                                <Caption style={{ ...styles.caption }}>Following</Caption>
                            </View>
                            <View style={{ ...styles.section }}>
                                <Paragraph style={{
                                    ...styles.paragraph,
                                    ...styles.caption
                                }}>500</Paragraph>
                                <Caption style={{ ...styles.caption }}>Follower</Caption>
                            </View>
                        </View>

                    </View>
                    <Drawer.Section style={{ ...styles.drawerSection }}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icons name='home-outline' color={color} size={size} />
                            )}
                            label='Home'
                            onPress={() => { props.navigation.navigate('Home') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icons name='account-outline' color={color} size={size} />
                            )}
                            label='Profile'
                            onPress={() => { props.navigation.navigate('Profile') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icons name='bookmark-outline' color={color} size={size} />
                            )}
                            label='Bookmarks'
                            onPress={() => { }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icons name='settings-outline' color={color} size={size} />
                            )}
                            label='Settings'
                            onPress={() => { }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icons name='account-check-outline' color={color} size={size} />
                            )}
                            label='Support'
                            onPress={() => { }}
                        />
                    </Drawer.Section>
                    <Drawer.Section title='Preferences'>
                        <TouchableRipple onPress={() => toggleTheme()}>
                            <View style={{ ...styles.preference }}>
                                <Text>Dark Mode</Text>
                                <View pointerEvents='none'>
                                    <Switch value={isDarkTheme} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={{ ...styles.bottomDrawerSection }}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icons name='exit-to-app' color={color} size={size} />
                    )}
                    label='Sign Out'
                    onPress={() => { onLogOut() }}
                />
            </Drawer.Section>
        </View>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)


const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
