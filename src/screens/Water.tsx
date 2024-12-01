import { FontAwesome6 } from "@expo/vector-icons";
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

interface WaterProps {}

const Water: React.FC<WaterProps> = () => {
  const [waterAmount, setWaterAmount] = useState<number>(0);
  const [goal, setGoal] = useState<number>(2000);

  const [waterLog, setWaterLog] = useState<
    Array<{ size: number; timestamp: string }>
  >([]);
  const maxHistoryLength = 5;

  const toast = useToast();

  const handleWater = (size: number) => {
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

    const newWaterLog = [...waterLog, { size, timestamp: formattedDate }];

    if (newWaterLog.length > maxHistoryLength) {
      newWaterLog.shift();
    }

    setWaterLog(newWaterLog);
    setWaterAmount(waterAmount + size);

    toast.show({
      description: `Você bebeu ${size}ml de água.`,
    });
  };

  useEffect(() => {
    if (waterAmount >= goal) {
      toast.show({
        description: "A meta de água foi atingida. Parabéns!",
        placement: "top",
      });
    }
  }, [waterAmount]);

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
        <Text fontSize="2xl">Como está a sua hidratação?</Text>

        <Text fontSize="xl" textAlign="center">
          Meta diária
        </Text>
        <Text fontSize="xl" textAlign="center">
          {goal}mL
        </Text>
        <Slider
          defaultValue={goal}
          value={goal}
          minValue={0}
          maxValue={4000}
          onChange={(value) => setGoal(value)}
          accessibilityLabel="hello world"
          step={100}
        >
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
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
              <Text fontSize="xl">{waterAmount === 0 ? "-" : waterAmount}</Text>
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
              <Text fontSize="xl">{goal} mL</Text>
              <Text>Meta diária</Text>
            </Box>
          </HStack>

          <Box alignItems="center" justifyContent="center" mt={5}>
            <Button.Group>
              <Button
                onPress={() => handleWater(250)}
                colorScheme="cyan"
                leftIcon={
                  <FontAwesome6
                    name="glass-water-droplet"
                    size={20}
                    color="white"
                  />
                }
              >
                250mL
              </Button>

              <Button
                onPress={() => handleWater(350)}
                colorScheme="cyan"
                leftIcon={
                  <FontAwesome6 name="glass-water" size={20} color="white" />
                }
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
          </Box>
        </VStack>

        <VStack mt={5} space={2} alignItems="center">
          <Text fontSize="xl">Histórico de ingestão:</Text>
          <VStack>
            {waterLog.map((log, index) => (
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
                  {log.size}mL - {log.timestamp}
                </Text>
              </Box>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </>
  );
};

export default Water;
