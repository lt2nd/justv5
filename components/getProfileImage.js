

import { useState, useEffect } from "react"
import { supabase } from "../app/lib/supabase"
import { StyleSheet, View, Alert, Image, Button } from "react-native"
import * as ImagePicker from "expo-image-picker"

export default function Prfimage({ url, size = 150, onUpload }) {
  const [uploading, setUploading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const avatarSize = { height: size, width: size }

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path)

      if (error) {
        throw error
      }

      const fr = new FileReader()
      fr.readAsDataURL(data)
      fr.onload = () => {
        setAvatarUrl(fr.result)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message)
      }
    }
  }

  return (
    <View>
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          accessibilityLabel="Avatar"
          style={[avatarSize, styles.avatar, styles.image]}
        />
      ) : (
        <View style={[avatarSize, styles.avatar, styles.noImage]} />
      )}
      
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 150,
    overflow: "hidden",
    maxWidth: "100%"
  },
  image: {
    objectFit: "cover",
    paddingTop: 0
  },
  noImage: {
    backgroundColor: "#333",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(200, 200, 200)",
    borderRadius: 50
  }
})