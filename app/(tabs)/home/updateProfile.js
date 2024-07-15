import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabase"
import { StyleSheet, View, Alert } from "react-native"
import { useAuth } from "../../../providers/AuthProvider"
import Avatar from "../../../components/Avatar"
import { ScrollView, TextInput, Button } from "react-native"
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ProfileScreen() {
  const { session } = useAuth()
  const [loading, setLoading] = useState(true)
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [website, setWebsite] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error("No user on the session!")

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url, full_name`)
        .eq("id", session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }
      
      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
        setFullName(data.full_name)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, website, avatar_url, full_name }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error("No user on the session!")

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        full_name,
        updated_at: new Date()
      }
      
      const { error } = await supabase.from("profiles").upsert(updates)
      
      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <ScrollView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={{ alignItems: "center" }}>
          <Avatar
            size={200}
            url={avatarUrl}
            onUpload={url => {
              setAvatarUrl(url)
              updateProfile({
                username,
                website,
                avatar_url: url,
                full_name: fullName
              })
            }}
          />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20, styles.input]}>
          <MaterialIcons
            style={{ marginLeft: 8 }}
            name="email"
            size={24}
            color="gray"
          />
          <TextInput
            style={{
              color: "gray",
              marginVertical: 10,
              width: 300,
            }}
            label="Email"
            value={session?.user?.email} disabled
          />
        </View>
        <View style={[styles.verticallySpaced, styles.input, styles.mt20]}>
          <TextInput
            style={{
              color: "gray",
              marginVertical: 10,
              width: 300,
              marginLeft: 8
            }}
            placeholderTextColor={"gray"}
            placeholder="Enter Full Name"
            value={fullName || ""}
            onChangeText={text => setFullName(text)}
          />
        </View>
        <View style={[styles.verticallySpaced, styles.input, styles.mt20]}>
          <TextInput
            style={{
              color: "gray",
              marginVertical: 10,
              width: 300,
              marginLeft: 8
            }}
            placeholderTextColor={"gray"}
            placeholder="Enter Username"
            value={username || ""}
            onChangeText={text => setUsername(text)}
          />
        </View>
        <View style={[styles.verticallySpaced, styles.input, styles.mt20]}>
          <TextInput
            style={{
              color: "gray",
              marginVertical: 10,
              width: 300,
              marginLeft: 8
            }}
            placeholderTextColor={"gray"}
            placeholder="Enter Website"
            value={website || ""}
            onChangeText={text => setWebsite(text)}
          />
        </View>

        <View style={[styles.verticallySpaced, styles.marginbottom]}>
          <Button
            title={loading ? "Loading ..." : "Update"}
            onPress={() =>
              updateProfile({
                username,
                website,
                avatar_url: avatarUrl,
                full_name: fullName
              })
            }
            disabled={loading}
          />
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch"
  },
  mt20: {
    marginTop: 20
  },
  marginbottom: {
    marginBottom: 12
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    paddingVertical: 5,
    borderRadius: 5,
  },
})
