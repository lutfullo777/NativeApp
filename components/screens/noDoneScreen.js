import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { useSelector } from "react-redux";
import Spinner from "../utils/spinner";
import Fontawesome5 from "react-native-vector-icons/FontAwesome5";


export default function NoDone({ navigation }) {
  const { loading, err, nodone } = useSelector((state) => state.getNodoneReducer);

  
  if (err) {
    Alert.alert("Xatolik!", "Xatolik mavjud! Qaytadan urinib ko'ring.");
  }


  return (
    <View style={styles.container}>
      {loading && <Spinner />}
      {nodone && (
        <View style={styles.todo}>
          <View style={styles.title}>
            <Text style={styles.text}>Sarlavha:</Text>
            <Text style={styles.item}>{nodone.todoTitle}</Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.text}>Vazifa:</Text>
            <Text style={styles.item}>{nodone.todo}</Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.text}>O'tkazib yuborilgan muddat:</Text>
            <View style={styles.item}>
              <View style={styles.time}>
                <Fontawesome5 name="calendar-alt" size={20} />
                <Text style={{ fontSize: 20, marginHorizontal: 10 }}>
                  {new Date(nodone.date).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.time}>
                <Fontawesome5 name="clock" size={20} />
                <Text style={{ fontSize: 20, marginHorizontal: 10 }}>
                  {new Date(nodone.date).toLocaleTimeString()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#f4511e",
  },
  title: {
    marginVertical: 10,
  },
  todo: {
    width: "90%",
    color: "#fff",
    padding: 10,
    marginVertical: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 3,
    color: "#fff",
  },
  item: {
    minHeight: 50,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  button: {
    width: "100%",
    height: 50,
    fontSize: 20,
    backgroundColor: "#ff2000",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "#fff",
    fontSize: 25,
    position: "absolute",
    right: 20,
  },
  time: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 20,
  },
});
