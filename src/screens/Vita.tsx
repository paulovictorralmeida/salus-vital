import { Box, useToast, View } from "native-base";
import React, { useEffect, useState } from "react";
import { Animated, ImageBackground, StyleSheet, Dimensions } from "react-native";
import { Button, HStack, Text, VStack } from "native-base";

interface VitaProps {}

const Vita: React.FC<VitaProps> = () => {
  const [mood, setMood] = useState("happy");
  const [steps, setSteps] = useState(0);

  const petImage =
    mood === "happy"
      ? require("../../assets/monstro_child_happy.png")
      : require("../../assets/monstro_child.png");

  // Pegando a largura da tela
  const screenWidth = Dimensions.get("window").width;

  // Estado para a animação
  const [moveAnim] = useState(new Animated.Value(0)); // Inicializa o valor da animação (posição X)

  const increaseSteps = () => {
    setSteps(steps + 100);
    if (steps > 5000) {
      setMood("happy");
    } else {
      setMood("sad");
    }
  };

  // Função para iniciar a animação do movimento
  const startMove = () => {
    // Animação para mover a imagem da esquerda para a direita e vice-versa
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: screenWidth - 250, // Subtraímos a largura da imagem para que o animal não saia da tela
          duration: 3000, // Tempo para mover até a borda direita
          useNativeDriver: true, // Usar o driver nativo para melhor performance
        }),
        Animated.timing(moveAnim, {
          toValue: 0, // Voltar para a posição inicial (borda esquerda)
          duration: 3000, // Tempo para voltar até a borda esquerda
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startMove(); // Iniciar o movimento quando o componente for montado
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/fundo_vita.jpg")}
        style={styles.backgroundImage}
      >
        <Box display="flex">
          <Animated.Image
            source={petImage}
            style={[styles.petImage, { transform: [{ translateX: moveAnim }] }]}
          />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    marginBottom: 20,
  },
  petImage: {
    width: 250,
    height: 250,
    marginTop: 300,
  },
  stepsText: {
    fontSize: 18,
    marginBottom: 10,
  },
  moodText: {
    fontSize: 16,
    color: "gray",
  },
});

export default Vita;
