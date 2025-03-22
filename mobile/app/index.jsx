import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This my First React Native Project.</Text>
      <TouchableOpacity
        style={{
          marginTop: 100,
          backgroundColor: "red",
          borderCurve: 10,
          padding: 10,
        }}
        onPress={() => console.log("pressed")}
      >
        <Text>Touch</Text>
      </TouchableOpacity>
    </View>
  );
}
