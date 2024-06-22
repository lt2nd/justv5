import { View, Text, Button, ScrollView } from 'react-native'
import React from 'react'
import { supabase } from '../../lib/supabase'
import { Pressable } from 'react-native'
import { useAuth } from '../../../providers/AuthProvider'
import { Redirect } from 'expo-router'
import Post from '../../../components/post'
import Header from '../../../components/header'

const index = () => {
  const { user } = useAuth();

  if (!user) {
    <Redirect href={'/(auth)/login'} />
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'white',
        gap: 1,
        padding: 5,
      }}
    >
      <Header />
      < Post />
    </ScrollView>
  )
}

export default index