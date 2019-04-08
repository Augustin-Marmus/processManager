import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Process } from '../models/Process';
import Thread from '../models/Thread';

const DEFAULT_PROCESSES = new Array<Process>(
  new Process({ name: 'Firefox', priority: 1, compute: 10, io: 2, nbThreads: 2 }),
  new Process({ name: 'Spotify', priority: 4, compute: 5, io: 3, nbThreads: 2 }),
  new Process({ name: 'Cinnamon', priority: 5, compute: 10, io: 5, nbThreads: 3 }),
  new Process({ name: 'Htop', priority: 1, compute: 1, io: 1, nbThreads: 1 }),
  new Process({ name: 'Webstorm', priority: 1, compute: 50, io: 5, nbThreads: 4 }),
  new Process({ name: 'Mysql', priority: 8, compute: 10, io: 5, nbThreads: 2 }),
  new Process({ name: 'Nginx', priority: 9, compute: 10, io: 4, nbThreads: 6 }),
);

@Injectable({
  providedIn: 'root'
})
export class ProcessesService {

  private processes: Process[] = DEFAULT_PROCESSES;

  constructor() {

  }

  getProcesses(): Process[] {
    return this.processes;
  }

  getProcess(id: number): Process {
    return _.find(this.processes, { id });
  }

  create(conf: object): number {
    const process: Process = new Process(conf)
    this.processes.push(process);
    return process.id
  }

  delete(id: number): void {
    _.remove(this.processes, { id });
  }

  reset(): void {
    _.forEach(this.processes, (process: Process) => {
      process.ioed = 0;
      process.computed = 0;
      _.forEach(process.threads, (thread: Thread) => {
        thread.state = Thread.STATE.New;
      });
    });
  }
}
