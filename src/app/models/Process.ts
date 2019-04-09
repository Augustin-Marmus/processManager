import * as _ from 'lodash';
import Thread from './Thread';
import Page from './Page';


export class Process {

  private static nextId: number = 0;

  name: string = 'Process ' + Process.nextId;
  id: number = ++(Process.nextId);
  priority: number = 1;
  computed: number = 0;
  ioed: number = 0;
  threads: Thread[] = new Array<Thread>(new Thread(this));
  pages: Page[] = new Array<Page>();

  private _compute: number = 0;
  private _io: number = 0;

  get remainingIo(): number { return this.io - this.ioed; };
  get remainingCompute(): number { return this.compute - this.computed; };
  get remainingOperation(): number { return this.remainingIo + this.remainingCompute; };

  get nbThreads(): number { return this.threads.length; }
  set nbThreads(nb: number) {
    if (nb < 1) {
      throw new Error("Process : number of threads can't be negative")
    }
    else if (nb < this.nbThreads) {
      _.times(this.nbThreads - nb, () => this.threads.pop());
    } else if (nb > this.nbThreads) {
      _.times(nb - this.nbThreads, () => this.threads.push(new Thread(this)));
    }
  }

  get io() { return this._io; };
  set io(nb: number) {
    this._io = nb;
    this.createPages();
  };

  get compute() { return this._compute; };
  set compute(nb: number) {
    this._compute = nb;
    this.createPages();
  };

  get instruction() { return this.compute + this.io; };

  get nbPages(): number { return this.pages.length; };

  get inactivityTimeStamp(): number {
    return _.minBy(this.threads, 'activityTimeStamp').inactivityTimeStamp;
  }

  private createPages() {
    if (this.instruction < 0) {
      throw new Error("Process : number of instructions can't be negative")
    }
    else if (this.instruction < this.nbPages) {
      _.times(this.nbPages - this.instruction, () => this.pages.pop());
    } else if (this.instruction > this.nbPages) {
      _.times(this.instruction - this.nbPages, () => this.pages.push(new Page(this)));
    }
  }

  constructor(config?: Object) {
    _.merge(this, _.pick(config, ['name', 'priority', 'compute', 'io', 'nbThreads']));
  }

  isRunning(): boolean {
    return !!_.find(this.threads, { state: Thread.STATE.Running });
  }

  isDone(): boolean {
    return _.every(this.threads, { state: Thread.STATE.Done });
  }

  done() {
    _(this.threads)
      .filter({ state: Thread.STATE.Ready })
      .forEach((thread) => thread.state = Thread.STATE.Done)
  }
}
