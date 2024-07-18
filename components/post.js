import { StyleSheet, View, Pressable, Image, Text, Alert } from "react-native";
import { AntDesign, Ionicons, FontAwesome, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState, useEffect, Component } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import Prfimage from "./getProfileImage";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from "../app/lib/supabase";
import TimeAgo from 'react-native-timeago';

const Post = ({ post }) => {

    const router = useRouter();
    const { session } = useAuth();
    const [isFollowing, setIsFollowing] = useState(false);

    const [avatarUrl, setAvatarUrl] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [fullName, setFullname] = useState('');
    const [website, setWebsite] = useState('');
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');
    const [created_at, setCreated_at] = useState('');

    const MAX_LINES = 2;
    const [showfullText, setShowfullText] = useState(false);
    const toggleShowFullText = () => {
        setShowfullText(!showfullText);
    };

    useEffect(() => {
        fetchPosts();
    }, []);


    const fetchPosts = async () => {
        setLoading(true);
        let { data, error } = await supabase
            .from('posts')
            .select('*')
        // .eq('id', 49) // show only my posts
        //.eq('my_likes.user_id', user.id)
        .order('created_at', { ascending: false });

        if (error) {
            Alert.alert('Something went wrong');
        }
        // console.log(JSON.stringify(data, null, 2));
        setPosts(data);
        if (data) {
            setContent(data.content);
            setCreated_at(data.created_at);
        }
        setLoading(false);

    };

    const [isLiked, setIsLiked] = useState(false);

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
        <View >

            {/* POST HEADER */}

            <View style={styles.containerpostheader} >
                <Pressable onPress={() => router.push("/home/profile")} style={{ marginRight: 10 }}>
                    <Prfimage
                        size={60}
                        url={post?.user.avatar_url}
                    />
                </Pressable>
                <View style={{ flexDirection: "column", gap: 2 }}>
                    <Pressable onPress={() => router.push("/home/profile")}>
                        <Text style={{ fontSize: 15, fontWeight: "600" }}>
                            {post?.user.username}
                        </Text>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.textstyle}
                        >
                            Engineer Graduate | LinkedIn Member
                        </Text>
                        <Text style={{ color: "gray" }}>
                            <TimeAgo time={post?.created_at} />
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.follow}>
                    <Pressable onPress={() => setIsFollowing(!isFollowing)}>
                        {!isFollowing ?
                            <SimpleLineIcons name="user-follow" size={24} color="black" /> :
                            <SimpleLineIcons name="user-following" size={24} color="blue" backgroundColor="lightgrey" />
                        }
                    </Pressable>
                </View>
            </View>

            {/*  POST BODY */}

            <View style={{ marginHorizontal: 2 }}>
                <View>
                    <Text style={styles.description}>
                        {post?.content}
                    </Text>
                </View>
                <Pressable onPress={toggleShowFullText}>
                    <Text style={{ color: "grey", marginLeft: 10 }}>
                        See more
                    </Text>
                </Pressable>

                <Pressable>
                    <Image
                        style={styles.postimage}
                        source={{ uri: "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=600&quality=80" }}
                    />
                </Pressable>
            </View>

            {/* POST FOOTER */}

            <View style={styles.containerpostfooter} >
                <Pressable //onPress={() => handleLikePost(item?._id)}
                    onPress={() => setIsLiked(!isLiked)}
                >
                    <AntDesign
                        style={{ textAlign: "center" }}
                        name="like2"
                        size={24}
                        color={isLiked ? "#0072b1" : "gray"}
                    />
                    <Text style={{
                        textAlign: "center",
                        fontSize: 12,
                        color: isLiked ? "#0072b1" : "gray",
                        marginTop: 2,
                    }} >
                        <Text style={styles.likedBy}>
                            11
                        </Text>
                    </Text>
                </Pressable>
                <Pressable onPress={() => router.push("/home/comments")}>
                    <FontAwesome
                        name="comment-o"
                        size={20}
                        color="gray"
                        style={{ textAlign: "center" }}
                    />
                    <Text style={styles.comment} >
                        <Text style={styles.likedBy}>
                            3
                        </Text>
                    </Text>
                </Pressable>
                <Pressable >
                    <Feather name="send" size={20} color="gray" style={{ textAlign: "center" }} />
                    <Text style={styles.share}>
                        <Text style={styles.likedBy}>
                            1
                        </Text>
                    </Text>
                </Pressable>
                <Pressable onPress={() => router.push("/home/savedPosts")}>
                    <Ionicons
                        name="save-outline"
                        size={20}
                        color="gray"
                        style={{ textAlign: "center" }}
                    />
                    <Text style={styles.likedBy} >
                        <Text >

                        </Text>
                    </Text>
                </Pressable>
            </View>

        </View>
    );
};

export default Post;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        gap: 1,
        padding: 5,
    },
    containerpostheader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
    },
    postimage: {
        width: "100%",
        resizeMode: 'contain',
        aspectRatio: 1,
        marginTop: -55,
    },
    description: {
        marginBottom: 5,
        alignItems: 'flex-start',
        marginLeft: 10,
        marginTop: 5,
    },
    containerpostfooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        padding: 10,
        marginTop: -60,
    },
    imageavatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    textstyle: {
        width: 270,
        color: "gray",
        fontSize: 15,
        fontWeight: "400",
    },
    follow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingRight: 5,
        marginLeft: 10,
        marginRight: 10
    },
    comment: {
        textAlign: "center",
        marginTop: 2,
        fontSize: 12,
        color: "gray",
    },
    share: {
        marginTop: 2,
        fontSize: 12,
        color: "gray",
        textAlign: "center",
    },
    likedBy: {
        marginTop: 2,
        fontSize: 12,
        color: "gray",
        textAlign: "center",
    },
});