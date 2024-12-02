import { FontAwesome6 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useGoalContext } from "../contexts/GoalContext"; 
import {
  Box,
  Button,
  Text,
  VStack,
  Slider,
  useToast,
  HStack,
} from "native-base";

const Water: React.FC = () => {
  const { waterAmount, setWaterAmount, waterGoal, setWaterGoal, setPetMood } =
    useGoalContext();
  const toast = useToast();
  const [goalReached, setGoalReached] = useState(false);
  const [lastUpdatedDate, setLastUpdatedDate] = useState<string>("");

  const handleWater = (size: number) => {
    setWaterAmount(waterAmount + size);
    toast.show({
      description: `Você bebeu ${size}ml de água. O Vita está feliz!`,
    });

    setPetMood("happy"); 
    setTimeout(() => setPetMood("normal"), 5 * 60 * 1000);
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentDateString = currentDate.toDateString();

    if (lastUpdatedDate && lastUpdatedDate !== currentDateString) {
      setWaterAmount(0);
      setGoalReached(false);
      toast.show({
        description: "Novo dia, sua meta de hidratação foi resetada!",
        placement: "top",
      });
    }

    setLastUpdatedDate(currentDateString);

    if (waterAmount >= waterGoal && !goalReached) {
      setGoalReached(true);
      toast.show({
        description:
          "A meta de água foi atingida. Parabéns, o Vita está muito feliz!",
        placement: "top",
      });

      setPetMood("happy");
      setTimeout(() => setPetMood("normal"), 6 * 60 * 60 * 1000); 
    }
  }, [waterAmount, waterGoal, toast, lastUpdatedDate, goalReached, setPetMood]);

  return (
    <VStack
      flex={1}
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      p={4}
      my={30}
    >
      <Text fontSize="2xl">Como está a sua hidratação?</Text>
      <Text fontSize="xl" textAlign="center">
        Meta diária
      </Text>
      <Text fontSize="xl" textAlign="center">
        {waterGoal}mL
      </Text>
      <Slider
        defaultValue={waterGoal}
        value={waterGoal}
        minValue={0}
        maxValue={4000}
        onChange={(value) => setWaterGoal(value)}
        step={100}
      >
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
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
            {waterAmount === 0 ? "-" : `${waterAmount} mL`}{" "}
          </Text>
          <Text>Quantidade ingerida</Text>
        </Box>

        <Box
          backgroundColor="#E2E8F0"
          borderRadius="xl"
          padding="2"
          alignItems="center"
          justifyContent="center"
          width="150px"
        >
          <Text fontSize="xl">{waterGoal} mL</Text>
          <Text>Meta diária</Text>
        </Box>
      </HStack>

      <Button.Group>
        <Button
          onPress={() => handleWater(250)}
          colorScheme="cyan"
          leftIcon={
            <FontAwesome6 name="glass-water-droplet" size={20} color="white" />
          }
        >
          250mL
        </Button>
        <Button
          onPress={() => handleWater(350)}
          colorScheme="cyan"
          leftIcon={<FontAwesome6 name="glass-water" size={20} color="white" />}
        >
          350mL
        </Button>
        <Button
          onPress={() => handleWater(500)}
          colorScheme="cyan"
          leftIcon={
            <FontAwesome6 name="bottle-water" size={20} color="white" />
          }
        >
          500mL
        </Button>
      </Button.Group>
    </VStack>
  );
};

export default Water;
