import { Process } from '../models/Process';

export interface Scheduler {
  onTimeUnitStart(processes: Process[], nbCores: number, tick: number): void;
  onTimeUnitEnd(processes: Process[], nbCores: number, tick: number): void;

  name: string;
  description: string;
}
