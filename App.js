import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Platform, SafeAreaView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import { Audio } from 'expo-av';

const colors = ["#BA4949", "#BA4949", "#BA4949"]

// Time 1.10 h/m  https://www.youtube.com/watch?v=Dl8x8EWXq8s
export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState()


  useEffect(() => {
    let interval = null;

    if (isActive) {  // 1.41.11 explicacion del contador
      // run timer
      interval = setInterval(() => {
        setTime(time - 1)
      }, 1000);
    } else {
      // clear interval
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setIsWorking(prev => !prev);
      setTime(isWorking ? 300 : 1500)
    }

    return () => clearInterval(interval)
  }, [isActive, time])


  function handleStartStop() {
    playSound();
    setIsActive(!isActive);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/interface-124464.mp3")
    )
    await sound.playAsync();
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors[currentTime] }]}>
      <View style={{
        flex: 1, // Le decimos que tome todo el largo de la pantall
        paddingHorizontal: 15,
        paddingTop: Platform.OS === "android" && 30,
        borderWidth: 3,
      }}>

        <StatusBar style="auto" />
        <Text style={styles.text}>Pomodoro</Text>
        <Header time={time}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity onPress={handleStartStop} style={styles.button}>
          <Text style={{
            color: 'white',
            fontWeight: 'bold'
          }}>{isActive ? "STOP" : "START"}</Text>

        </TouchableOpacity>
      </View>
    </ SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 20,
    padding: 5,
    alignItems: 'center'
  },
  button: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: 'center'
  }
});

