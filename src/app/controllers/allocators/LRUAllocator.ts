import { Allocator } from './Allocator';
import { Process } from 'src/app/models/Process';
import Page from 'src/app/models/Page';

export class LRUAllocator implements Allocator {
  onTimeUnitStart(processes: Process[], memory: Page[], tick: number): void {
    console.log('LRU')
  };
  onTimeUnitEnd(processes: Process[], memory: Page[], tick: number): void { };

  get name(): string { return 'LRU Allocator' };
  get description(): string { return 'LRU Allocator description' };
}
