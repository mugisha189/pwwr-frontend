import { studentTrainings } from './data';

export const getTrainingDetails = async (trainingId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return studentTrainings.find((training) => training.id === trainingId);
};
