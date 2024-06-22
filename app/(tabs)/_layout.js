import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AuthProvider from '../../providers/AuthProvider'


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon() {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} />;
}

export default function TabLayout() {


  return (
    <AuthProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'grey',

          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: true,
        }}>

        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color }) => <Ionicons name="home" color={color} size={24} />,
            headerRight: () => (
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={25}
                      color={color}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name="MyNetwork"
          options={{
            title: ' MyNetwork ',
            tabBarIcon: ({ color }) => <Ionicons name="people" color={color} size={24} />,
          }}
        />
        <Tabs.Screen
          name="newPost"
          options={{
            title: ' New Post ',
            tabBarIcon: ({ color }) => <AntDesign name="plussquare" color={color} size={24} />,
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: ' Chat ',
            tabBarIcon: ({ color }) => <AntDesign name="wechat" color={color} size={24} />,
          }}
        />
      </Tabs>
    </AuthProvider>

  );
}
