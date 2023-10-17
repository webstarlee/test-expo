import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import ImageViewer from "./components/ImageViewer";

import Button from "./components/Button";
const PlaceholderImage = require("./assets/images/background-image.png");
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function App() {
  const [videos, setVideos] = useState([]);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      console.log(result.assets);
      setVideos((prev) => [...prev, result.assets[0]]);
    } else {
      alert("You did not select any image.");
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();
    videos?.map((video, index) => {
      data.append("videos", {
        uri: video.uri,
        type: "video/*",
        name: `video_${index}.mp4`,
      });
    });
    const res = await fetch(
      "http://192.168.107.140:8082/api/product/savetest",

      {
        method: "POST",
        body: data,
      }
    );
    console.log(res);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button
          label="Choose a photo"
          theme="primary"
          onPress={pickImageAsync}
        />
        <Button theme="primary" label="Use this photo" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
