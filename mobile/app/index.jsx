import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="mt-10 flex flex-col gap-10">
        <Link href={"/(auth)/signup"}>Signup</Link>
        <Link href={"/(auth)"} className="mt-20">
          LoginPage
        </Link>
      </View>
    </View>
  );
}
