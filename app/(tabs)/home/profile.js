import { View, Text, StyleSheet, Button, Pressable, TextInput, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign, Ionicons, Entypo, Feather } from '@expo/vector-icons';
import Post from '../../../components/post';
import { Link, useRouter, Href, router, Redirect } from "expo-router";
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../../providers/AuthProvider';
import Avatar from '../../../components/Avatar';
import Prfimage from '../../../components/getProfileImage'

const profile = () => {

  const { session } = useAuth();

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [fullName, setFullname] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
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
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        setFullname(data.full_name);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
    <Image
        style={{ width: "100%", height: 170 }}
        source={{
          uri: "https://akshitphotography.com/wp-content/uploads/2021/08/Nature-Photography-105.jpg",
        }}
      />

      <Pressable

        style={{ position: "absolute", top: 130, left: 10 }}
      >
        <Prfimage
          size={130}
          url={avatarUrl}
        />

      </Pressable>
      <Text style={{ fontSize: 17, fontWeight: "bold", marginLeft: 150, marginTop: 10 }}>
        { username }
      </Text>
      <Text style={{ fontSize: 14, marginLeft: 150, marginTop: 10, color: "grey" }}>
        Location or not
      </Text>
      <View style={{ marginTop: 40, marginHorizontal: 10 }}>

        <Pressable >
          <Text>Here goes user description</Text>
        </Pressable>



        <Text style={{ marginTop: 12, fontWeight: "500", fontSize: 15 }}>
          Youtube • Linkedin Member
        </Text>
        <Text style={{ fontSize: 15, color: "gray" }}>
          Bengaluru, Karnataka, India
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
          marginHorizontal: 10,
          justifyContent: "center"
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#0072b1",
            paddingVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 25,
            height: 30,
          }}
          onPress={() => router.push("/home/updateProfile")}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>
            Update profile
          </Text>
        </Pressable>
        
      </View>

      <View style={{ marginHorizontal: 10, marginTop: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Analytics</Text>
        <Text style={{ fontSize: 15, color: "gray", marginTop: 2 }}>
          Private to you
        </Text>

        <Pressable onPress={() => router.push("/MyNetwork")}>
          <View style={{ flexDirection: "row", gap: 7, marginTop: 10 }}>

            <Ionicons name="people" size={28} color="black" />
            <View style={{ marginLeft: 7 }}>
              <Text style={{ fontSize: 15, fontWeight: "600", color: "blue" }}>
                350 friends
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "500",
                  color: "gray",
                  marginTop: 1,
                }}
              >
                Discover who's viewed your profile
              </Text>
            </View>
          </View>
        </Pressable>

        <View style={{ flexDirection: "row", gap: 7, marginTop: 10 }}>
          <Entypo name="bar-graph" size={24} color="black" />
          <View style={{ marginLeft: 7 }}>
            <Text style={{ fontSize: 15, fontWeight: "600" }}>
              1242 posts
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                color: "gray",
                marginTop: 1,
              }}
            >
              Checkout who's engaing with your posts
            </Text>
          </View>
        </View>

        <Pressable onPress={() => router.push("/home/photos")}>
          <View style={{ flexDirection: "row", gap: 7, marginTop: 10 }}>
            <Feather name="camera" size={24} color="black" />
            <View style={{ marginLeft: 7 }}>
              <Text style={{ fontSize: 15, fontWeight: "600", color: "blue" }}>
                45 photos
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "500",
                  color: "gray",
                  marginTop: 1,

                }}
              >
                see how often you appear in search results
              </Text>
            </View>
          </View>
        </Pressable>
      </View>

      <View style={{ flex: 1, height: 1, backgroundColor: 'black', marginTop: 4 }} />
      <View style={{ padding: 5 }}>
        <Post />
       
      </View>
      
      <Button
        style={{
          backgroundColor: "#0072b1",
          paddingVertical: 4,
          paddingHorizontal: 10,
          borderRadius: 25,
          marginTop: 60,
          marginLeft: 140,
          marginRight: 140,
        }}
        title="Sign Out" onPress={() => supabase.auth.signOut()}

      >

      </Button>
      </ScrollView>
  )
}

export default profile