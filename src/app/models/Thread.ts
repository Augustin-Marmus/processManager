
import { Process } from './Process';

class Thread {
  private parentProcess: Process;
  state: Thread.STATE;
  remainingTime: number;
  inactivityTimeStamp: number;
  waitingTime: number;

  constructor(process: Process) {
    this.parentProcess = process;
    this.state = Thread.STATE.New;
    this.remainingTime = 0;
    this.waitingTime = 0;
  }

  get priority(): number { return this.parentProcess.priority; };

  get compute(): number { return this.parentProcess.compute; };

  get computed(): number { return this.parentProcess.computed; };
  set computed(nb: number) { this.parentProcess.computed = nb };

  get io(): number { return this.parentProcess.io; };

  get ioed(): number { return this.parentProcess.ioed; };
  set ioed(nb: number) { this.parentProcess.ioed = nb; };

  get remainingIo(): number { return this.parentProcess.remainingIo; };

  get remainingCompute(): number { return this.parentProcess.remainingCompute; };

  get remainingOperation(): number { return this.parentProcess.remainingOperation; };

  done() {
    this.parentProcess.done();
  }
}

module Thread {
  export enum STATE {
    New = 'New',
    Blocked = 'Blocked',
    Running = 'Running',
    Ready = 'Ready',
    Done = 'Done',
  }
}

export default Thread;
