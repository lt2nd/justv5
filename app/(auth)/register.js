import { View, Text, SafeAreaView, Image, Alert, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { supabase } from '../lib/supabase'

const register = () => {

    const image = "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg";

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    //const [image, setImage] = useState("");
    const [username, setUsername] = useState("");
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const [loading, setLoading] = useState(false);

    async function handleRegister() {
        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
    
        if (error) Alert.alert(error.message);
        setLoading(false);
      }

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
        >
            <View style={{ marginTop: 20 }}>
                <Image
                    style={{ width: 150, height: 100, resizeMode: "contain", backgroundColor: 'black', borderRadius: 5 }}
                    source={require('../../assets/logo-just.png')}
                />
            </View>

            <KeyboardAwareScrollView >
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 25 }}>
                        Register to Your Account
                    </Text>
                </View>

                {/* <View style={{ marginTop: 30 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            paddingVertical: 5,
                            borderRadius: 5,
                        }}
                    >
                        <Ionicons
                            style={{ marginLeft: 8 }}
                            name="person"
                            size={24}
                            color="gray"
                        />
                        <TextInput
                            value={name}
                            onChangeText={(text) => setName(text)}
                            placeholderTextColor={"gray"}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: name ? 16 : 16,
                            }}
                            placeholder="Enter Your Name"
                        />
                    </View>
                </View>

                <View style={{ marginTop: 30 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            paddingVertical: 5,
                            borderRadius: 5,
                        }}
                    >
                        <Ionicons
                            style={{ marginLeft: 8 }}
                            name="albums"
                            size={24}
                            color="gray"
                        />
                        <TextInput
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                            placeholderTextColor={"gray"}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: username ? 16 : 16,
                            }}
                            placeholder="Enter Your Username"
                        />
                    </View>
                </View> */}

                <View style={{ marginTop: 30 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            paddingVertical: 5,
                            borderRadius: 5,
                        }}
                    >
                        <MaterialIcons
                            style={{ marginLeft: 8 }}
                            name="email"
                            size={24}
                            color="gray"
                        />
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholderTextColor={"gray"}
                            autoCapitalize='none'
                            inputMode='email'
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: email ? 16 : 16,
                            }}
                            placeholder="Enter Your Email"

                        />

                    </View>

                    <View style={{ marginTop: 30 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 5,
                                borderColor: "#D0D0D0",
                                borderWidth: 1,
                                paddingVertical: 5,
                                borderRadius: 5,
                            }}
                        >
                            <AntDesign
                                style={{ marginLeft: 8 }}
                                name="lock"
                                size={24}
                                color="gray"
                            />
                            <TextInput
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                placeholderTextColor={"gray"}
                                style={{
                                    color: "gray",
                                    marginVertical: 10,
                                    width: 300,
                                    fontSize: password ? 16 : 16,
                                }}
                                placeholder="Enter Your Password"
                            />
                            <Ionicons
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={24}
                                color="#aaa"
                                style={{ marginLeft: 10 }}
                                onPress={toggleShowPassword}
                            />
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 45 }} />

                <Pressable
                    onPress={handleRegister}
                    disabled={loading}
                    style={{
                        width: 200,
                        backgroundColor: "black",
                        padding: 15,
                        marginTop: 5,
                        marginLeft: "auto",
                        marginRight: "auto",
                        borderRadius: 6,
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: 16,
                            color: "white",
                        }}
                    >
                        Register
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => router.replace("/login")}
                    style={{ marginTop: 10 }}
                >
                    <Text style={{ textAlign: "center", fontSize: 16 }}>
                        Already have an account? {' '}
                        <Text style={{ color: 'blue' }}>
                            Sign In
                        </Text>
                    </Text>
                </Pressable>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default register