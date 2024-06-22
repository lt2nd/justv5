import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useAuth } from "../../../providers/AuthProvider";


export default function HomeStack() {
  

  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title: 'Home',
        headerRight: () =>
          <Link href="/notifications" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="bell"
                  size={18}
                  //color={Colors[colorScheme ?? 'light'].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
      }}

      />
    </Stack>
  );
}