import { View, Text, Button, ScrollView, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Pressable } from 'react-native'
import { useAuth } from '../../../providers/AuthProvider'
import { Redirect } from 'expo-router'
import Post from '../../../components/post'
import Header from '../../../components/header'

const index = () => {
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profile,setProfile] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    let { data, error } = await supabase
      .from('posts')
      .select('*, user:profiles(*)')
      // .eq('id', 49) // show only my posts
      //.eq('my_likes.user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      Alert.alert('Something went wrong');
    }
    // console.log(JSON.stringify(data, null, 2));
    setPosts(data);
    setLoading(false);
  };

  if (!user) {
    <Redirect href={'/(auth)/login'} />
  }

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
      data={posts}
      renderItem={({item}) => <Post post={item} />}
      />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    gap: 1,
    padding: 5,
  },
});