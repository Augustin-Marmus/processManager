import { Process } from '../../models/Process';
import Page from 'src/app/models/Page';

export interface Allocator {
  onTimeUnitStart(processes: Process[], memory: Page[], tick: number): void;
  onTimeUnitEnd(processes: Process[], memory: Page[], tick: number): void;

  name: string;
  description: string;
}

export { FIFOAllocator } from './FIFOAllocator';
export { LRUAllocator } from './LRUAllocator';
