import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const options = ["Pomodoro", "Short Break", "Long Breack"];

export default function Header({time, setTime, currentTime, setCurrentTime}) {

    function handlePress(index) {
      const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
      setCurrentTime(index);
      setTime(newTime * 60);
    }

    return (
        <View style={{flexDirection: "row" }}>

          {options.map((item, index) => (

            <TouchableOpacity 
                key={index}  
                onPress={() => handlePress(index)}
                style={[
                    styles.itemStyle, 
                    currentTime !== index && { borderColor: "transparent" },
                ]}
                >
                <Text style={{ fontWeight:'bold'}}>{item}</Text>
            </TouchableOpacity>

          ))}
        </View>
    )
}

// Esto es un objeto de clases
const styles = StyleSheet.create({
      itemStyle: {
      alignItems:'center',
      width:'33%',
      padding:5,
      borderRadius:5,
      marginVertical:20,
      backgroundColor:'#A44E4E'
    }
})