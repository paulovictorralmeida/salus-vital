import React, { useState, useEffect } from "react";
import { Text, Box, VStack, Button, HStack, useToast } from "native-base";
import { Pedometer } from "expo-sensors";
import CircularProgress from "react-native-circular-progress-indicator";

interface StepProps {}

const Step: React.FC<StepProps> = () => {
  const [stepAmount, setStepAmount] = useState<number>(0);
  const [havePedometer, setHavePedometer] = useState<string>("");

  const [caloriesBurnt, setCaloriesBurnt] = useState<string>("0");
  const [distanceCovered, setDistanceCovered] = useState<string>("0");

  const [stepsLog, setStepsLog] = useState<
    Array<{ steps: number; calories: string; timestamp: string }>
  >([]);
  const maxHistoryLength = 5;

  const toast = useToast();

  useEffect(() => {
    subscribeToPedometer();
  }, []);

  const subscribeToPedometer = () => {
    const subscription = Pedometer.watchStepCount((result) => {
      setStepAmount(result.steps);
      calculateCalories(result.steps);
    });

    Pedometer.isAvailableAsync().then(
      (result) => {
        setHavePedometer(String(result));
      },
      (error) => {
        setHavePedometer(error);
      }
    );
  };

  const calculateCalories = (steps: number) => {
   
    let distance = steps / 1300;
    let distanceCovered = distance.toFixed(4);

    let calories = Number(distanceCovered) * 60;
    let caloriesBurnt = calories.toFixed(4);

    setCaloriesBurnt(caloriesBurnt);
    setDistanceCovered(distanceCovered);
  };

  const handleLogStepData = () => {
    const currentDate = new Date();
    const formattedDate = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(currentDate);

    const newStepLog = [
      ...stepsLog,
      { steps: stepAmount, calories: caloriesBurnt, timestamp: formattedDate },
    ];

    if (newStepLog.length > maxHistoryLength) {
      newStepLog.shift();
    }

    setStepsLog(newStepLog);

    toast.show({
      description: `Você deu ${stepAmount} passos e queimou ${caloriesBurnt} calorias.`,
    });
  };

  return (
    <VStack
      flex={1}
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      p={4}
      my={30}
    >
      <Text fontSize="2xl">Quantos passos você deu hoje?</Text>

      <Text fontSize="xl">Disponibilidade do pedômetro: {havePedometer}</Text>

      <CircularProgress
        value={stepAmount}
        maxValue={10000}
        radius={100}
        activeStrokeColor={"#f39c12"}
        inActiveStrokeColor={"#9b59b6"}
        inActiveStrokeOpacity={0.5}
        inActiveStrokeWidth={20} 
        activeStrokeWidth={20}
        titleColor={"#ecf0f1"}
        titleStyle={{ fontWeight: "bold", fontSize: 14 }} 
      />

      <VStack space={4} alignItems="center" mt={5}>
        <Text fontSize="xl">Meta de Passos: 10.000 passos</Text>
        <Text fontSize="xl">Passos dados: {stepAmount}</Text>
        <Text fontSize="xl">Distância percorrida: {distanceCovered} km</Text>
        <Text fontSize="xl">Calorias queimadas: {caloriesBurnt}</Text>

        <Button colorScheme="cyan" onPress={handleLogStepData}>
          Registrar Dados
        </Button>
      </VStack>

      <VStack mt={5} space={2} alignItems="center">
        <Text fontSize="xl">Histórico de passos e calorias:</Text>
        {stepsLog.map((log, index) => (
          <Box
            key={index}
            backgroundColor="#E2E8F0"
            borderRadius="xl"
            padding="2"
            alignItems="center"
            justifyContent="center"
            width="300px"
            mb={2}
          >
            <Text fontSize="md">
              {log.steps} passos - {log.calories} calorias - {log.timestamp}
            </Text>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
};

export default Step;
