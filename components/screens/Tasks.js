import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity,Alert, FlatList, AsyncStorage} from 'react-native'
import Fontawesome5 from "react-native-vector-icons/FontAwesome5";
import { getTaskAction, GetTodoAction } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../utils/spinner';


export default function Tasks({navigation}) {
    
    const {loading, err, todos} = useSelector(state => state.getTodoReducer)

    if (err) {
        Alert.alert("Xatolik!", "Xatolik mavjud! Qaytadan urinib ko'ring!");
      }
      const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(GetTodoAction())
    },[])

    const deleteHandler = async (id) =>{
      const filteredTasks = todos.filter(element => element.id !== id);
      await AsyncStorage.setItem('todo',JSON.stringify(filteredTasks)).then(()=>{
        dispatch(GetTodoAction())
      })
    }

    const Item = ({ title,id }) => (
        <TouchableOpacity  style={styles.item} onPress={()=>{
          dispatch(getTaskAction(id))
          navigation.navigate('Task')
        }}>
          <Text style={styles.title}>Sarlavha: <Text style={styles.itemText}>{title}</Text></Text>
          <Fontawesome5 name='trash' size={20} color='#f4511e' onPress={()=>deleteHandler(id)}/>
        </TouchableOpacity>
      );

    const renderItem = ({ item }) => (
        <Item title={item.todoTitle} text ={item.todo} id={item.id}/>
      );
    return (
        <View style={styles.container}>
            {loading && <Spinner color="#f4511e"/>}
            {(todos&&todos.length>0) ? <FlatList style={styles.list} data={todos} renderItem={renderItem} keyExtractor={(item, index)=>index.toString()}/> : <Text>Hozircha vazifalar mavjud emas.</Text>}
            <TouchableOpacity activeOpacity={0.7} onPress={()=>navigation.navigate('Add-Task')} style={styles.button}>
                <Fontawesome5 name='plus' color='#fff' size={20}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-around',
        width:'100%'
    },
    list:{
      width:'100%',      
    },
    button:{
        width:60,
        height:60,
        borderRadius:50,
        backgroundColor:'#f4511e',
        position:'absolute',
        bottom:10,
        right:10,
        alignItems:'center',
        justifyContent:'center'
    },
    item: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 8,
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        width:'90%',
        marginRight:'auto',
        marginLeft:'auto',
      },
      title: {
        fontSize: 20,
        fontWeight:'bold',
        width:'90%'
      },
      itemText:{
          fontWeight:'normal'
      }
})
