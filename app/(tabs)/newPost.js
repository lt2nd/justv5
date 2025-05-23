import { View, Text, StyleSheet, TextInput, Pressable, Button } from 'react-native'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../../providers/AuthProvider'
import { router } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';

const newPost = () => {

  const { session } = useAuth();

  const [content, setContent] = useState('')
  const [image, setImage] = useState(null);

  function SharePost() {
    supabase.from('posts').insert({
      author: session.user.id,
      content: content,
    }).then(response => {
      if (!response.error) {
        setContent('');

        alert('Post Created');
      }
    })
    router.push("/home/")
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });



    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      <View style={[styles.verticallySpaced, styles.mt20, styles.input]}>
        <TextInput
          multiline
          numberOfLines={7}
          maxLength={1000}
          leftIcon={{ type: 'font-awesome', name: 'pencil' }}
          onChangeText={(text) => setContent(text)}
          value={content}
          placeholder="JUST say something..."
        />
      </View>
      <Pressable style={styles.button} onPress={SharePost}>
        <Text style={styles.text}>Share</Text>
      </Pressable>
    </View>
  )
}

export default newPost

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    flex: 1,
    alignItems: 'center',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    height: 80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',

  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  image: {
    width: 200,
    height: 200,
  },
})