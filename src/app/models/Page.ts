import { Process } from './Process';

class Page {
  private parentProcess: Process;
  state: Page.STATE;
  allocatedTimeStamp: number = -1;

  constructor(process: Process) {
    this.parentProcess = process;
    this.state = Page.STATE.None;
  }

  get processOwner() { return this.parentProcess };
}

module Page {
  export enum STATE {
    None = 'None',
    Used = 'Used',
    Swapped = 'Swapped',
    Freed = 'Freed'
  }
}

export default Page;
