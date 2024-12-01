import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Box,
  useToast,
  Button,
  HStack,
  Text,
  VStack,
  Slider,
} from "native-base";

interface FoodProps {}

const Food: React.FC<FoodProps> = () => {
  const [foodAmount, setFoodAmount] = useState<number>(0);
  const [goal, setGoal] = useState<number>(2000); // Calorias diárias

  const [foodLog, setFoodLog] = useState<
    Array<{ calories: number; timestamp: string }>
  >([]);
  const maxHistoryLength = 5;

  const toast = useToast();

  const handleFood = (calories: number) => {
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

    const newFoodLog = [...foodLog, { calories, timestamp: formattedDate }];

    if (newFoodLog.length > maxHistoryLength) {
      newFoodLog.shift();
    }

    setFoodLog(newFoodLog);
    setFoodAmount(foodAmount + calories);

    toast.show({
      description: `Você consumiu ${calories} calorias.`,
    });
  };

  useEffect(() => {
    if (foodAmount >= goal) {
      toast.show({
        description: "A meta de calorias foi atingida. Parabéns!",
        placement: "top",
      });
    }
  }, [foodAmount]);

  return (
    <>
      <VStack
        flex={1}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        p={4}
        my={30}
      >
        <Text fontSize="2xl">Como está a sua alimentação?</Text>

        <Text fontSize="xl" textAlign="center">
          Meta diária de calorias
        </Text>
        <Text fontSize="xl" textAlign="center">
          {goal} kcal
        </Text>
        <Slider
          defaultValue={goal}
          value={goal}
          minValue={0}
          maxValue={4000}
          onChange={(value) => setGoal(value)}
          accessibilityLabel="Meta de calorias"
          step={100}
        >
          <Slider.Track bg="orange.100">
            <Slider.FilledTrack bg="orange.500" />
          </Slider.Track>
          <Slider.Thumb bg="orange.500"/>
        </Slider>

        <VStack>
          <HStack alignItems="center" justifyContent="center" space={4}>
            <Box
              backgroundColor="#E2E8F0"
              borderRadius="xl"
              padding="2"
              alignItems="center"
              justifyContent="center"
              width="150px"
            >
              <Text fontSize="xl">{foodAmount === 0 ? "-" : foodAmount}</Text>
              <Text>Calorias consumidas</Text>
            </Box>
            <Box
              backgroundColor="#E2E8F0"
              borderRadius="xl"
              padding="2"
              alignItems="center"
              justifyContent="center"
              width="150px"
            >
              <Text fontSize="xl">{goal} kcal</Text>
              <Text>Meta diária</Text>
            </Box>
          </HStack>

          <Box alignItems="center" justifyContent="center" mt={5}>
            <Button.Group>
              <Button
                onPress={() => handleFood(150)}
                colorScheme="orange"
                leftIcon={
                  <FontAwesome6 name="bowl-food" size={20} color="white" />
                }
              >
                150 kcal
              </Button>

              <Button
                onPress={() => handleFood(250)}
                colorScheme="orange"
                leftIcon={
                  <FontAwesome6 name="pizza-slice" size={20} color="white" />
                }
              >
                250 kcal
              </Button>

              <Button
                onPress={() => handleFood(500)}
                colorScheme="orange"
                leftIcon={
                  <FontAwesome5 name="hamburger" size={20} color="white" />
                }
              >
                500 kcal
              </Button>
            </Button.Group>
          </Box>
        </VStack>

        <VStack mt={5} space={2} alignItems="center">
          <Text fontSize="xl">Histórico de consumo:</Text>
          <VStack>
            {foodLog.map((log, index) => (
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
                  {log.calories} kcal - {log.timestamp}
                </Text>
              </Box>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </>
  );
};

export default Food;
