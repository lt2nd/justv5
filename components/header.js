import { StyleSheet, View, Pressable, Image, Text } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";


const Header = () => {
    return(
        <View style={styles.header}>
                <Pressable onPress={() => router.push("/home/profile")}>
                    <Image
                        style={styles.profileimage}
                        source={{ uri: "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=600&quality=80" }}
                    />
                </Pressable>
                <Pressable
                    style={[styles.inputbox, styles.shadowProp]}
                    onPress={() => router.push("/newPost")}
                >
                    <AntDesign
                        style={{ marginLeft: 10 }}
                        name="edit"
                        size={24}
                        color="black"
                        selectionColor="grey"
                    />
                    <Text>
                        JUST say something...
                    </Text>
                </Pressable>
                <Pressable onPress={() => router.push("/chat")}>
                    <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
                </Pressable>
            </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    header: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        //backgroundColor: "white",
    },
    profileimage: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginRight: 10,
    },
    inputbox: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 7,
        gap: 10,
        backgroundColor: "white",
        borderRadius: 3,
        height: 30,
        flex: 1,
        borderWidth: 1,
    },
    shadowProp: {
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
});