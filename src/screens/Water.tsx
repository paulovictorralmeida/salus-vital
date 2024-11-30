import React, { useEffect, useState } from "react";
import { Box, useToast } from "native-base";
import { Button, HStack, Text, VStack } from "native-base";

interface WaterProps {}

const Water: React.FC<WaterProps> = () => {
  const [mlSize, setMlSize] = useState<number>(250);
  const [waterAmount, setWaterAmount] = useState<number>(0);
  const [goal, setGoal] = useState<number>(2000);

  const toast = useToast();

  const handleWater = () => {
    setWaterAmount(waterAmount + mlSize);
    toast.show({
      description: `Você bebeu ${mlSize}ml de água.`,
    });
  };

  const handleChangeMlSize = (size: number) => {
    setMlSize(size);
  };

  useEffect(() => {
    if (waterAmount >= goal) {
      toast.show({
        description: "A meta de água foi atiginda. Parabéns!.",
        placement: "top",
      });
    }
  }, [waterAmount]);

  return (
    <>
      <VStack
        flex={1}
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        p={4}
        my={30}
      >
        <Text fontSize="sm"> copo de {mlSize}</Text>

        <VStack>
          <HStack alignItems="center" justifyContent="center">
            <Text fontSize="6xl">{waterAmount}</Text>
            <Text fontSize="xl"> / {goal}</Text>
          </HStack>
          <Button
            mt={5}
            colorScheme="primary"
            onPress={() => {
              handleWater();
            }}
          >
            Beber água
          </Button>
        </VStack>

        <Box mt={10}>
          <Button.Group>
            <Button onPress={() => handleChangeMlSize(250)} colorScheme="teal">
              Copo padrão
            </Button>
            <Button onPress={() => handleChangeMlSize(350)} colorScheme="teal">
              Xícara
            </Button>
            <Button onPress={() => handleChangeMlSize(500)} colorScheme="teal">
              Garrafa
            </Button>
          </Button.Group>
        </Box>
      </VStack>
    </>
  );
};

export default Water;
