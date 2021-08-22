import React,{useState, useEffect} from 'react'
import {View, Text, StyleSheet, Image, Alert, AsyncStorage, BackHandler} from 'react-native'

const Start = ({navigation}) => {
    const [user, setUser] = useState('Foydalanuvchi');
    const getData = async () => {

        const data = await AsyncStorage.getItem("name");
        if (data) {
            setUser(data);
        }
      };
    
      useEffect(() => {
        getData();
        const backAction = () => {
            Alert.alert("Dasturdan chiqish", "Rostdan ham dasturdan chiqasizmi?", [
              {
                text: "Yo'q",
                onPress: () => null,
                style: "cancel"
              },
              { text: "Ha", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => backHandler.remove();

        
      }, []);

setTimeout(()=>{navigation.navigate('Home') },3000);

return(
    <View style={styles.container}>
        <Image source={require('../../assets/todo.png')}/>
        <Text style={styles.text}>Assalomu alaykum {user}!</Text>
    </View>
)
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#f4511e',
        color:'#fff'
    },
    text:{
        fontSize:20,
        color:'#fff',
        zIndex:1,
        alignItems:'center'
    }
})

export default Start