import { TrainingDifficulty } from "./trainingDifficulty.enum";

export interface Exercise {
  name: string;
  description: string;
  duration: number;
  repetitions: number;
  series: number;
  rest: number;
  difficulty: TrainingDifficulty;
}
