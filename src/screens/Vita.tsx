import { Box, View } from "native-base";
import React, { useEffect, useState } from "react";
import { useGoalContext } from "../contexts/GoalContext"; 
import { Animated, ImageBackground, StyleSheet, Dimensions } from "react-native";

interface VitaProps {}

const Vita: React.FC<VitaProps> = () => {
  const screenWidth = Dimensions.get("window").width;
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null); 
  const { waterAmount, waterGoal, foodAmount, foodGoal, petMood, setPetMood, setWaterAmount, setFoodAmount } = useGoalContext(); 

  const petImage =
    petMood === "happy"
      ? require("../../assets/monstro_child_happy.png")
      : petMood === "sad"
      ? require("../../assets/monstro_child_sad.png") 
      : require("../../assets/monstro_child.png"); 

  const [moveAnim] = useState(new Animated.Value(0));

  const startMove = () => {
    Animated.loop(
      Animated.sequence([ 
        Animated.timing(moveAnim, {
          toValue: screenWidth - 250, 
          duration: 3000,
          useNativeDriver: true, 
        }),
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 3000, 
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const updateMood = () => {
    if (waterAmount >= waterGoal && foodAmount >= foodGoal) {
      setPetMood("happy");
      resetMoodAfterTime(6 * 60 * 60 * 1000); 
    } 
    else {
      setPetMood("sad");
      resetMoodAfterTime(6 * 60 * 60 * 1000);
    }
  };

  const handleConsumption = () => {
    setPetMood("happy");
    resetMoodAfterTime(5 * 60 * 1000); 
  };

  const resetMoodAfterTime = (time: number) => {
    if (timer) {
      clearTimeout(timer); 
    }
    const newTimer = setTimeout(() => {
      setPetMood("normal"); 
    }, time);

    setTimer(newTimer);
  };

  useEffect(() => {
    startMove();
    updateMood(); 
  }, [waterAmount, foodAmount, waterGoal, foodGoal]); 

  useEffect(() => {
    setPetMood("normal");
  }, []); 

  useEffect(() => {
    if (waterAmount > 0 || foodAmount > 0) {
      handleConsumption(); 
    }
  }, [waterAmount, foodAmount]); 

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/fundo_vita.jpg")}
        style={styles.backgroundImage}
      >
        <Box display="flex">
          <Animated.Image
            source={petImage} 
            style={[styles.petImage, { transform: [{ translateX: moveAnim }] }]}/>
        </Box>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  petImage: {
    width: 250,
    height: 250,
    marginTop: 300,
  },
});

export default Vita;
