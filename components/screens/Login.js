import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  AsyncStorage,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { LoginAction } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../utils/spinner";

const Login = ({ navigation }) => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const { loading, err } = useSelector((state) => state.loginReducer);

  if (err) {
    Alert.alert("Xatolik!", "Xatolik mavjud! Qaytadan urinib ko'ring.");
  }

  const onPressHandler = (val) => {
    if (val.length === 0) {
      Alert.alert("Ogohlantirish!", "Ismingizni kiriting");
    } else {
      dispatch(LoginAction(val, navigation));
    }
  };

  const getData = async () => {
    const data = await AsyncStorage.getItem("name");
    if (data) {
      navigation.navigate("Start");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {loading && <Spinner color='#fff'/>}
      <Image style={styles.img} source={require("../../assets/login.png")} />
      <TextInput
        style={styles.input}
        placeholder="Ismingizni kiriting..."
        onChangeText={(value) => setName(value)}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={() => onPressHandler(name)}
      >
        <LinearGradient
          colors={["#ff2000", "#ff6600"]}
          style={styles.background}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        <Text style={styles.text}>Tasdiqlash </Text>
        <FontAwesomeIcon size={35} icon={faAngleRight} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4511e",
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#888999",
    fontSize: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginVertical: 20,
  },
  img: {
    width: 100,
    height: 100,
  },
  background: {
    position: "absolute",
    backgroundColor: "transparent",
    left: 0,
    right: 0,
    borderRadius: 50,
    top: 0,
    height: "100%",
  },
  button: {
    width: "80%",
    height: 50,
    borderRadius: 50,
    backgroundColor: "#ff30dd",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
  icon: {
    position: "absolute",
    right: 20,
    alignSelf: "center",
    color: "#f4511e",
    backgroundColor: "#fff",
    borderRadius: 50,
  },
});

export default Login;
