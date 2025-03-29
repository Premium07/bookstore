import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-7xl font-bold">Welcome!</Text>
      <View className="mt-52 flex flex-col absolute z-10 bottom-5">
        <Link href={"/(auth)/signup"} className=" border border-black p-4">
          Signup
        </Link>
        <Link href={"/(auth)"} className="mt-2 border border-black p-4">
          LoginPage
        </Link>
      </View>
    </View>
  );
}
