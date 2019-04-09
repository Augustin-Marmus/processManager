import * as _ from 'lodash';
import { Allocator } from './Allocator';
import { Process } from 'src/app/models/Process';
import Page from 'src/app/models/Page';

export class FIFOAllocator implements Allocator {
  onTimeUnitStart(processes: Process[], memory: Page[], tick: number): void {
    console.log(`FIFO start ${tick}`);

    function nextToBeSwapped() {
      return _.findIndex(memory, _.minBy(memory, 'allocatedTimeStamp'))
    }
    function loadPage(page: Page) {
      let nextToBeSwappedIndex: number = nextToBeSwapped()
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
      .forEach((process) => {
        _(process.pages).reject({ state: Page.STATE.Used }).forEach(loadPage)
      })
  };
  onTimeUnitEnd(processes: Process[], memory: Page[], tick: number): void { };

  get name(): string { return 'FIFO Allocator' };
  get description(): string { return 'FIFO Allocator description' };
}
