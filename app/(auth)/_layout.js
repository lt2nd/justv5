import { Stack, Redirect } from "expo-router";
import { useAuth } from "../../providers/AuthProvider";

export default function Auth() {

    const {user} = useAuth();

    if (user) {
        return <Redirect href={'/(tabs)/home/'} />;
    }

    return <Stack />;
}