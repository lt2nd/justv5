import { View, Text, StyleSheet, Button, Pressable, TextInput, Image, ScrollView } from 'react-native'
import React from 'react'
import { AntDesign, Ionicons, Entypo, Feather } from '@expo/vector-icons';
import Post from '../../../components/post';
import { Link, useRouter, Href } from "expo-router";

const profile = () => {
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
        <Image
          style={{ width: 120, height: 120, borderRadius: 60 }}
          source={{ uri: "https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1711756800&semt=sph" }}
        />

      </Pressable>
      <Text style={{ fontSize: 17, fontWeight: "bold", marginLeft: 150, marginTop: 10 }}>
        Neo the hacker
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
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#0072b1",
            paddingVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 25,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Open to</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#0072b1",
            paddingVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 25,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Add Section
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