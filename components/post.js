import { StyleSheet, View, Pressable, Image, Text } from "react-native";
import { AntDesign, Ionicons, FontAwesome, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";

const Post = () => {

    const router = useRouter();
    const [isFollowing, setIsFollowing] = useState(false);

    const MAX_LINES = 2;
    const [showfullText, setShowfullText] = useState(false);
    const toggleShowFullText = () => {
        setShowfullText(!showfullText);
    };

    const [isLiked, setIsLiked] = useState(false);

    return (
        <View >

            {/* POST HEADER */}

            <View style={styles.containerpostheader} >
                <Pressable onPress={() => router.push("/home/profile")}>
                    <Image
                        style={styles.imageavatar}
                        source={{ uri: "https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1711756800&semt=sph" }}
                    />
                </Pressable>
                <View style={{ flexDirection: "column", gap: 2 }}>
                    <Pressable onPress={() => router.push("/home/profile")}>
                        <Text style={{ fontSize: 15, fontWeight: "600" }}>
                            Neo
                        </Text>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.textstyle}
                        >
                            Engineer Graduate | LinkedIn Member
                        </Text>
                        <Text style={{ color: "gray" }}>
                            2h a go
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
                        Post  description
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