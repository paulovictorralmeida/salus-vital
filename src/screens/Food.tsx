import React, { useEffect, useState } from "react";
import { useGoalContext } from "../contexts/GoalContext";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import {
  Box,
  Button,
  Text,
  VStack,
  Slider,
  useToast,
  HStack,
} from "native-base";

const Food: React.FC = () => {
  const { foodAmount, setFoodAmount, foodGoal, setFoodGoal, setPetMood } =
    useGoalContext();
  const toast = useToast();
  const [goalReached, setGoalReached] = useState(false);
  const [lastUpdatedDate, setLastUpdatedDate] = useState<string>("");

  const handleFood = (calories: number) => {
    setFoodAmount(foodAmount + calories);
    toast.show({
      description: `Você consumiu ${calories} calorias. O Vita está feliz!`,
    });

    setPetMood("happy");
    setTimeout(() => setPetMood("normal"), 5 * 60 * 1000);
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentDateString = currentDate.toDateString();

    if (lastUpdatedDate && lastUpdatedDate !== currentDateString) {
      setFoodAmount(0);
      setGoalReached(false);
      toast.show({
        description: "Novo dia, sua meta de caloria foi resetada!",
        placement: "top",
      });
    }

    setLastUpdatedDate(currentDateString);

    if (foodAmount >= foodGoal && !goalReached) {
      setGoalReached(true);
      toast.show({
        description:
          "A meta de calorias foi atingida. Parabéns, o Vita está muito feliz!",
        placement: "top",
      });
    }

    setPetMood("happy");
    setTimeout(() => setPetMood("normal"), 6 * 60 * 60 * 1000);
  }, [foodAmount, foodGoal, toast, lastUpdatedDate, goalReached, setPetMood]);

  return (
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
        {foodGoal} kcal
      </Text>
      <Slider
        defaultValue={foodGoal}
        value={foodGoal}
        minValue={0}
        maxValue={4000}
        onChange={(value) => setFoodGoal(value)}
        step={100}
      >
        <Slider.Track bg="orange.100">
          <Slider.FilledTrack bg="orange.500" />
        </Slider.Track>
        <Slider.Thumb bg="orange.500" />
      </Slider>

      <HStack space={4}>
        <Box
          backgroundColor="#E2E8F0"
          borderRadius="xl"
          padding="2"
          alignItems="center"
          justifyContent="center"
          width="150px"
        >
          <Text fontSize="xl">
            {foodAmount === 0 ? "-" : `${foodAmount} kcal`}
          </Text>
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
          <Text fontSize="xl">{foodGoal} kcal</Text>
          <Text>Meta diária</Text>
        </Box>
      </HStack>
      <Button.Group>
        <Button
          onPress={() => handleFood(150)}
          colorScheme="orange"
          leftIcon={<FontAwesome6 name="bowl-food" size={20} color="white" />}
        >
          150 kcal
        </Button>
        <Button
          onPress={() => handleFood(250)}
          colorScheme="orange"
          leftIcon={<FontAwesome6 name="pizza-slice" size={20} color="white" />}
        >
          250 kcal
        </Button>
        <Button
          onPress={() => handleFood(500)}
          colorScheme="orange"
          leftIcon={<FontAwesome5 name="hamburger" size={20} color="white" />}
        >
          500 kcal
        </Button>
      </Button.Group>
    </VStack>
  );
};

export default Food;
