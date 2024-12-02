import React, { createContext, ReactNode, useContext, useState } from 'react';

interface GoalContextType {
  waterAmount: number;
  setWaterAmount: (amount: number) => void;
  foodAmount: number;
  setFoodAmount: (amount: number) => void;
  waterGoal: number;
  setWaterGoal: (goal: number) => void;
  foodGoal: number;
  setFoodGoal: (goal: number) => void;
  petMood: string;
  setPetMood: React.Dispatch<React.SetStateAction<string>>;
}

interface GoalProviderProps {
  children: ReactNode;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export const GoalProvider: React.FC<GoalProviderProps> = ({ children }) => {
  const [waterAmount, setWaterAmount] = useState(0);
  const [foodAmount, setFoodAmount] = useState(0);
  const [waterGoal, setWaterGoal] = useState(2000);
  const [foodGoal, setFoodGoal] = useState(2000);
  const [petMood, setPetMood] = useState("normal");

  return (
    <GoalContext.Provider
      value={{
        waterAmount,
        setWaterAmount,
        foodAmount,
        setFoodAmount,
        waterGoal,
        setWaterGoal,
        foodGoal,
        setFoodGoal,
        petMood,
        setPetMood
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export const useGoalContext = (): GoalContextType => {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error('error');
  }
  return context;
};
