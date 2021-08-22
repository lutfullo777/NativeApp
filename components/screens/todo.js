import React from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../utils/spinner";
import Fontawesome5 from "react-native-vector-icons/FontAwesome5";
import { doneAction } from "../../redux/action";

export default function Todo({ navigation }) {
  const { loading, err, todo } = useSelector((state) => state.getTaskReducer);

  const dispatch = useDispatch();
  if (err) {
    Alert.alert("Xatolik!", "Xatolik mavjud! Qaytadan urinib ko'ring.");
  }

  const onPressHandler = async (id) => {
    dispatch(doneAction(id, navigation));
  };

  return (
    <View style={styles.container}>
      {loading && <Spinner />}
      {todo && (
        <View style={styles.todo}>
          <View style={styles.title}>
            <Text style={styles.text}>Sarlavha:</Text>
            <Text style={styles.item}>{todo.todoTitle}</Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.text}>Vazifa:</Text>
            <Text style={styles.item}>{todo.todo}</Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.text}>Oxirgi muddat:</Text>
            <View style={styles.item}>
              <View style={styles.time}>
                <Fontawesome5 name="calendar-alt" size={20} />
                <Text style={{ fontSize: 20, marginHorizontal: 10 }}>
                  {new Date(todo.date).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.time}>
                <Fontawesome5 name="clock" size={20} />
                <Text style={{ fontSize: 20, marginHorizontal: 10 }}>
                  {new Date(todo.date).toLocaleTimeString()}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={() => onPressHandler(todo.id)}
          >
            <Text style={styles.text}>Bajardim</Text>
            <Fontawesome5 name="check" style={styles.icon} />
          </TouchableOpacity>
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
