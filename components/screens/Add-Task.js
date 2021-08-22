import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import Fontawesome5 from "react-native-vector-icons/FontAwesome5";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import { TodoAction } from "../../redux/action";
import Spinner from "../utils/spinner";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

export default function AddTask({ navigation }) {
  const dispatch = useDispatch();

  const { loading, err } = useSelector((state) => state.todoReducer);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [todo, setTodo] = useState({});

  if (err) {
    Alert.alert("Xatolik!", "Xatolik mavjud! Qaytadan urinib ko'ring.");
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setTodo({ ...todo, date, id: uuid() });
    hideDatePicker();
  };

  const onPressHandler = () => {
    if((!todo.todoTitle||todo.todoTitle.length===0)||(!todo.todo||todo.todo.length===0)||!todo.date){
      Alert.alert('Ogohlantirish','Ma\'lumotlar kiritilganligini tekshiring!')
    }else{
      dispatch(TodoAction(todo, navigation));
    }
  };

  return (
    <View style={styles.container}>
      {loading && <Spinner color="#fff" />}
      <TextInput
        style={styles.title}
        onChangeText={(value) => setTodo({ ...todo, todoTitle: value })}
        placeholder="Vazifa nomini kiriting."
      />
      <TextInput
        style={styles.input}
        placeholder="Vazifa haqida yozing."
        onChangeText={(value) => setTodo({ ...todo, todo: value })}
        multiline
      />
      <View style={styles.date}>
        <Text style={styles.text}>Oxirgi muddatni belgilang:</Text>
        <Fontawesome5
          style={styles.icon}
          name="calendar-alt"
          onPress={showDatePicker}
        />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={onPressHandler}
      >
        <Text style={styles.text}>Qo'shish</Text>
        <Fontawesome5 name="plus" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ff6500",
    position: "relative",
  },
  background: {
    position: "absolute",
    backgroundColor: "transparent",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  title: {
    width: "80%",
    height: 35,
    marginVertical: 10,
    backgroundColor: "#fff",
    fontSize: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  input: {
    width: "80%",
    minHeight: 60,
    marginVertical: 10,
    backgroundColor: "#fff",
    fontSize: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  icon: {
    color: "#fff",
    fontSize: 25,
    position: "absolute",
    right: 20,
  },
  button: {
    width: "80%",
    height: 50,
    fontSize: 20,
    backgroundColor: "#ff2000",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#fff",
  },
  date: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    marginHorizontal: "auto",
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
  },
});
