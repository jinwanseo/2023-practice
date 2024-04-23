import { useState } from "react";
import AppLoading from "expo-app-loading";
import { IonIcons } from "@expo/vector-icons/Ionicons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { NavigationContainer } from "@react-navigation/native";
import { Appearance } from "react-native";

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

  const subscription = Appearance.addChangeListener(({ colorScheme }) => {
    console.log(colorScheme);
  });

  return (
    <NavigationContainer>
      <LoggedOutNav />
    </NavigationContainer>
  );
}
