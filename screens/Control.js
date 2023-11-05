import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";

import Button from "../components/button";
// import SliderButton from "../components/slider";

const Control = () => {
  const navigation = useNavigation();
  const [sliderValue1, setSliderValue1] = useState(0);
  const [sliderValue2, setSliderValue2] = useState(0);
  const [sliderValue3, setSliderValue3] = useState(0);
  const [sliderValue4, setSliderValue4] = useState(0);
  const [canSendRequest, setCanSendRequest] = useState(true);

  const sendMessage = (message) => {
    if (canSendRequest) {
      fetch(`http://192.168.1.199/${message}`, { timeout: 100000000 })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          console.log(`${message} message sent to the robot`);
        })
        .catch(function (error) {
          console.error("Error:", error);
          console.log("Lost connection to the Robot!");
          ToastAndroid.show(
            "Lost connection to the Robot!",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
          navigation.navigate("Home");
        });

      setCanSendRequest(false); // Set the rate limit
      setTimeout(() => setCanSendRequest(true), 50); // Reset the rate limit after 50 milliseconds (20 requests per second)
    } else {
      console.log("Rate limit exceeded. Please wait.");
    }
  };

  useEffect(() => {
    // Ensure the rate limit is reset when the component unmounts
    return () => {
      setCanSendRequest(true);
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          paddingTop: 20,
          textAlign: "center",
        }}
      >
        Control the Robot
      </Text>
      <View style={styles.group}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          Directions
        </Text>
        <View
          onTouchStart={() => {
            sendMessage("move");
          }}
          onTouchEnd={() => {
            sendMessage("stop");
          }}
          style={styles.buttonContainer}
        >
          <Button title="&#5169;" />
        </View>
        <View style={styles.rightleft}>
          {/*Left Button*/}
          <View
            onTouchStart={() => {
              sendMessage("left");
            }}
            onTouchEnd={() => {
              sendMessage("stop");
            }}
          >
            <Button title="&#5176;" />
          </View>
          {/*RightButton*/}
          <View
            onTouchStart={() => {
              sendMessage("right");
            }}
            onTouchEnd={() => {
              sendMessage("stop");
            }}
          >
            <Button title="&#5171;" />
          </View>
        </View>
        <View
          onTouchStart={() => {
            sendMessage("back");
          }}
          onTouchEnd={() => {
            sendMessage("stop");
          }}
          style={styles.buttonContainer}
        >
          <Button title="&#5167;" />
        </View>
      </View>
      <View style={styles.sliderContainer}>
        <View style={styles.slider}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              margin: 20,
            }}
          >
            Base
          </Text>
          <Slider
            style={{ width: "100%" }}
            minimumValue={0}
            maximumValue={180}
            value={sliderValue1}
            step={10} // Set the step to 10
            onValueChange={(value) => {
              setSliderValue1(value);
              sendMessage(`base?value=${value}`);
            }}
          />
          <Text style={{ fontSize: 18, textAlign: "center", margin: 15 }}>
            Value: {sliderValue1}
          </Text>
        </View>
        <View style={styles.slider}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              margin: 15,
            }}
          >
            Forward
          </Text>
          <Slider
            style={{ width: "100%" }}
            minimumValue={0}
            maximumValue={110}
            value={sliderValue2}
            step={10} // Set the step to 10
            onValueChange={(value) => {
              setSliderValue2(value);
              sendMessage(`forward?value=${value}`);
            }}
          />
          <Text style={{ fontSize: 18, textAlign: "center", margin: 15 }}>
            Value: {sliderValue2}
          </Text>
        </View>
        <View style={styles.slider}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              margin: 15,
            }}
          >
            Backward
          </Text>
          <Slider
            style={{ width: "100%" }}
            minimumValue={0}
            maximumValue={180}
            value={sliderValue3}
            step={10} // Set the step to 10
            onValueChange={(value) => {
              setSliderValue3(value);
              sendMessage(`backward?value=${value}`);
            }}
          />
          <Text style={{ fontSize: 18, textAlign: "center", margin: 20 }}>
            Value: {sliderValue3}
          </Text>
        </View>
        <View style={styles.slider}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              margin: 15,
            }}
          >
            Gripper
          </Text>
          <Slider
            style={{ width: "100%" }}
            minimumValue={0}
            maximumValue={80}
            value={sliderValue4}
            step={10} // Set the step to 10
            onValueChange={(value) => {
              setSliderValue4(value);
              sendMessage(`gripper?value=${value}`);
            }}
          />
          <Text style={{ fontSize: 18, textAlign: "center", margin: 15 }}>
            Value: {sliderValue4}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
    margin: 0,
  },
  group: {
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 0,
  },
  rightleft: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  sliderContainer: {
    width: "100%",
  },
  slider: {
    marginBottom: 0,
  },
});

export default Control;
