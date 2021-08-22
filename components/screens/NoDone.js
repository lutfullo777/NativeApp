import React,{useEffect} from 'react'
import {Text, Alert, View,TouchableOpacity, FlatList, StyleSheet, AsyncStorage} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import { noDoneAction, getNodoneAction } from '../../redux/action'
import Spinner from '../utils/spinner'
import Fontawesome5 from "react-native-vector-icons/FontAwesome5";


const NoDone = ({navigation}) => {
    const dispatch = useDispatch()
    const {loading, err, nodone} = useSelector(state=>state.noDoneReducer)
    useEffect(()=>{
        dispatch(noDoneAction())
    },[])
    if (err) {
        Alert.alert("Xatolik!", "Xatolik mavjud! Qaytadan urinib ko'ring.");
      }
      const Item = ({ title,id }) => (
        <TouchableOpacity  style={styles.item} onPress={()=>{
          dispatch(getNodoneAction(id))
          navigation.navigate('No-done')
        }}>
          <Text style={styles.title}>Sarlavha: <Text style={styles.itemText}>{title}</Text></Text>
          <Fontawesome5 name='trash' size={20} color='#f4511e' onPress={()=>deleteHandler(id)}/>
        </TouchableOpacity>
      );

    const renderItem = ({ item }) => (
        <Item title={item.todoTitle} text ={item.todo} id={item.id}/>
      );
      const deleteHandler = async (id) =>{
        const filteredTasks = nodone.filter(element => element.id !== id);
        await AsyncStorage.setItem('nodone',JSON.stringify(filteredTasks)).then(()=>{
          dispatch(noDoneAction())
        })
      }
    return(
        <View style={styles.container}>
            {loading && <Spinner color="#f4511e"/>}
            {(nodone&&nodone.length>0) ? <FlatList style={styles.list} data={nodone} renderItem={renderItem} keyExtractor={(item, index)=>index.toString()}/> : <Text>Barakalla! Barcha vazifalar bajarilgan.</Text>}

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

export default NoDone