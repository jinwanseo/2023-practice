import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import { IonIcons } from "@expo/vector-icons/Ionicons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";

export default function App() {
  const [loading, setLoading] = useState(true);

  const onFinish = () => setLoading(false);
  const preload = () => {
    const fontToLoad = [IonIcons.font];
    const fontPromise = fontToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [
      require("./assets/logo.png"),
      "https://image.similarpng.com/very-thumbnail/2020/06/Instagram-name-logo-transparent-PNG.png",
    ];
    const imagesPromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    console.log("Hello React JS!");
    return Promise.all([...fontPromise, ...imagesPromises]);
  };

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
