import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, TextInput } from "react-native";

const Home = () => {
  const navigation = useNavigation();
  const [ip, onChangeIp] = React.useState(null);
  const showToast = () => {
    console.log("Toast Clicked...");
    fetch(`http://${ip !== null ? ip : "192.168.99.198"}/`)
      .then(function () {
        console.log("Connected to the RC Arm Car");
        ToastAndroid.show(
          "Connection Established",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        navigation.navigate("Control");
      })
      .catch((err) => {
        console.log("Couldnt reach the RC Arm Car Server");
        ToastAndroid.show(
          `Couldn't connect! ${err}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      });
  };
  return (
    <View style={styles.container}>
      {/*This is the welcome message*/}
      <Text style={styles.text}>Welcome to the RC Car with Arm robot!</Text>
      <StatusBar style="auto" />

      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeIp}
          value={ip}
          placeholder="Enter the IP address"
        />
      </SafeAreaView>

      {/*This is the Connect button*/}
      <TouchableOpacity style={styles.button} onPress={() => showToast()}>
        <Text style={{ color: "#fff" }}>Connect</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#030C1F",
    fontSize: 20,
    padding: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    borderRadius: 10,
    backgroundColor: "#29b6f6",
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
