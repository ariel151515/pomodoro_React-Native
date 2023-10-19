import { Text, View, StyleSheet } from "react-native";


export default function Timer({time}) {

    //.toString().padStart(2,"0") cuando no con6tenga un dos le pone un 0 a la izquierda
    const formattedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2,"0")}:${(time % 60).toString().padStart(2,"0")}`;

    return (
        <View style={styles.container}>
            <Text style={styles.time}>{formattedTime}</Text>
        </View>
    )
}

// Esto es un objeto de clases
const styles = StyleSheet.create({
    container: {
        flex:0.3,
        backgroundColor:"#C15C5C",
        padding:15,
        borderRadius:15,
        justifyContent:'center'
    },
    time:{
        fontSize:80,
        fontWeight:"bold",
        textAlign:"center",
        color:'#fff'
    }
})