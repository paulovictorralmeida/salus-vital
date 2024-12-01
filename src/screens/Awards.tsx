import React, { useState } from 'react';
import { Box, Text, VStack } from 'native-base';

interface Awards {
  title: string;
  description: string;
  date: string;
  points: number;  // Armazenar a pontuação junto com a conquista
}

const Awards: React.FC = () => {
  const [achievements, setAchievements] = useState<Awards[]>([]);

  const addAchievement = (title: string, description: string, points: number) => {
    const newAchievement = {
      title,
      description,
      date: new Date().toLocaleString(),
      points,
    };
    setAchievements((prevAchievements: any) => [...prevAchievements, newAchievement]);
  };

  return (
    <VStack flex={1} alignItems="center" justifyContent="center" p={4}>
      <Text fontSize="2xl" mb={4}>Conquistas</Text>
      {achievements.length === 0 ? (
        <Text fontSize="md">Você ainda não completou nenhum desafio!</Text>
      ) : (
        achievements.map((achievement, index) => (
          <Box
            key={index}
            backgroundColor="#E2E8F0"
            borderRadius="xl"
            padding="3"
            width="300px"
            mb={4}
          >
            <Text fontSize="xl">{achievement.title}</Text>
            <Text fontSize="md">{achievement.description}</Text>
            <Text fontSize="sm" color="gray.500">{achievement.date}</Text>
            <Text fontSize="md" color="green.500">+{achievement.points} pontos</Text> {/* Exibe a pontuação */}
          </Box>
        ))
      )}
    </VStack>
  );
};

export default Awards;
