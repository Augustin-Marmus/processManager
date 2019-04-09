import * as _ from 'lodash';
import { Allocator } from './Allocator';
import { Process } from 'src/app/models/Process';
import Page from 'src/app/models/Page';

export class FIFOAllocator implements Allocator {
  onTimeUnitStart(processes: Process[], memory: Page[], tick: number): void {

    function nextToBeSwapped() {
      let page = _.minBy(memory, 'allocatedTimeStamp')
      return _.findIndex(memory, (page.allocatedTimeStamp !== tick) ? page : null);
    }

    function loadPage(page: Page) {
      let nextToBeSwappedIndex: number = nextToBeSwapped()
      // if (nextToBeSwappedIndex < 0) {
      //   throw new Error('Allocator: No more space available')
      // }
      memory[nextToBeSwappedIndex].state = Page.STATE.Swapped;
      page.allocatedTimeStamp = tick;
      page.state = Page.STATE.Used;
      memory[nextToBeSwappedIndex] = page;
    }

    _
      (processes)
      .filter((process) => {
        return process.isRunning() && _.countBy(process.pages, 'state').Used != process.pages.length
      })
      .map((process) => {
        // if (process.pages.length > memory.length) {
        //   throw new Error('Allocator: Memory size to small for ' + process.name + ' to fit in.');
        // }
        return process.pages;
      })
      .flatten()
      .reject({ state: Page.STATE.Used })
      .forEach(loadPage)
  };
  onTimeUnitEnd(processes: Process[], memory: Page[], tick: number): void {
    _
      (memory)
      .forEach((page, index) => {
        if (page.processOwner && page.processOwner.isDone()) {
          memory[index].state = Page.STATE.Freed;
          memory[index] = new Page(null);
        }
      })
  };

  get name(): string { return 'FIFO Allocator' };
  get description(): string { return 'FIFO Allocator description' };
}
