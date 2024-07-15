import { StyleSheet, View, Pressable, Image, Text, Alert } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { supabase } from "../app/lib/supabase";
import { useAuth } from "../providers/AuthProvider";
import Prfimage from "./getProfileImage";
import React, { useState, useEffect } from 'react';
import { router } from "expo-router";

const Header = () => {

    const {session} = useAuth();
    const [avatarUrl, setAvatarUrl] = useState('');
    const [profile,setProfile] = useState(null);

    useEffect(() => {
        if (session) getProfile();
      }, [session]);
    
      async function getProfile() {
        try {
          if (!session?.user) throw new Error('No user on the session!');
    
          const { data, error, status } = await supabase
            .from('profiles')
            .select(`username, website, avatar_url, full_name`)
            .eq('id', session?.user.id)
            .single();
          if (error && status !== 406) {
            throw error;
          }
    
          if (data) {
            //setUsername(data.username);
            //setWebsite(data.website);
            setAvatarUrl(data.avatar_url);
            //setFullname(data.full_name);
          }
        } catch (error) {
          if (error instanceof Error) {
            Alert.alert(error.message);
          }
        } 
      }

    return(
        <View style={styles.header}>
                <Pressable onPress={() => router.push("/home/profile")}>
                    <Prfimage
                        size={40}
                        url={avatarUrl}
                    />
                </Pressable>
                <Pressable
                    style={[styles.inputbox, styles.shadowProp]}
                    onPress={() => router.push("/newPost")}
                >
                    <AntDesign
                        style={{ marginLeft: 10 }}
                        name="edit"
                        size={24}
                        color="black"
                        selectionColor="grey"
                    />
                    <Text>
                        JUST say something...
                    </Text>
                </Pressable>
                <Pressable onPress={() => router.push("/chat")}>
                    <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
                </Pressable>
            </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    header: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        //backgroundColor: "white",
    },
    profileimage: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginRight: 10,
    },
    inputbox: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 7,
        gap: 10,
        backgroundColor: "white",
        borderRadius: 3,
        height: 30,
        flex: 1,
        borderWidth: 1,
    },
    shadowProp: {
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
});