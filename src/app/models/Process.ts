import * as _ from 'lodash';
import Thread from './Thread';


export class Process {

  private static nextId: number = 0;

  name: string = 'Process ' + Process.nextId;
  id: number = ++(Process.nextId);
  priority: number = 1;
  compute: number = 0;
  computed: number = 0;
  io: number = 0;
  ioed: number = 0;
  threads: Thread[] = new Array<Thread>(new Thread(this));

  get remainingIo(): number { return this.io - this.ioed; };
  get remainingCompute(): number { return this.compute - this.computed; };
  get remainingOperation(): number { return this.remainingIo + this.remainingCompute; };

  get nbThreads(): number { return this.threads.length; }
  set nbThreads(nb: number) {
    if (nb < 1) {
      throw new Error("Process : number of threads can't be negative")
    }
    else if (nb < this.nbThreads) {
      for (let i = 0; i < this.nbThreads - nb; i++) {
        this.threads.pop();
      }
    } else if (nb > this.nbThreads) {
      for (let i = 0; i < nb - this.nbThreads; i++) {
        this.threads.push(new Thread(this));
      }
    }
  }

  constructor(config?: Object) {
    _.merge(this, _.pick(config, ['name', 'priority', 'compute', 'io', 'nbThreads']));
  }

  done() {
    _(this.threads)
      .filter({ state: Thread.STATE.Ready })
      .forEach((thread) => thread.state = Thread.STATE.Done)
  }
}
