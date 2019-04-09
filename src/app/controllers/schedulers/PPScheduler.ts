import { Scheduler } from './Scheduler';
import { Process } from 'src/app/models/Process';
import Thread from 'src/app/models/Thread';
import * as _ from 'lodash';

export class PPScheduler implements Scheduler {

  onTimeUnitStart(processes: Process[], nbCores: number, tick: number): void {

    function runInstruction(thread: Thread) {

      function runCompute(thread) {
        thread.computed++;
        thread.remainingTime = 1;
        thread.state = Thread.STATE.Running;
      }

      function runIo(thread) {
        thread.ioed++;
        thread.remainingTime = 3;
        thread.state = Thread.STATE.Blocked;
      }

      if (thread.remainingIo > 0 && thread.remainingCompute > 0) {
        if (Math.floor(Math.random() * Math.floor(2)) % 2) {
          runIo(thread)
        } else {
          runCompute(thread)
          nbCores--;
        }
      } else if (thread.remainingIo > 0) {
        runIo(thread);
      } else if (thread.remainingCompute > 0) {
        runCompute(thread);
        nbCores--;
      }
    }

    const threads: Thread[] = _
      .chain(processes)
      .map((process) => process.threads)
      .flatten()
      .value()

    _(threads)
      .filter({ state: Thread.STATE.Ready })
      .sortBy((thread) => -thread.priority * (tick - thread.inactivityTimeStamp))
      .takeWhile((thread) => {
        runInstruction(thread)
        return nbCores > 0;
      })
      .value()

    // NEW -> READY
    _(threads)
      .filter({ state: Thread.STATE.New })
      .forEach((thread) => {
        thread.state = Thread.STATE.Ready;
        thread.inactivityTimeStamp = tick;
      })
  }

  onTimeUnitEnd(processes: Process[], nbCores: number, tick: number): void {

    const threads: Thread[] = _
      .chain(processes)
      .map((process) => process.threads)
      .flatten()
      .value()

    _(threads)
      .reject({ remainingTime: 0 })
      .forEach((thread) => thread.remainingTime--)

    _(threads)
      .filter((thread) => (thread.state === Thread.STATE.Running
        || thread.state === Thread.STATE.Blocked)
        && thread.remainingTime === 0)
      .map((thread) => {
        thread.state = Thread.STATE.Ready;
        thread.inactivityTimeStamp = tick;
        return thread;
      })
      .filter({ remainingOperation: 0 })
      .forEach((thread) => {
        thread.done()
      })

  }

  get name() { return 'PP Scheduler' };
  set name(param) { };
  get description() { return 'PP Scheduler description' }
  set description(param) { };
}
