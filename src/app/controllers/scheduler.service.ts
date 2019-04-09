import { Injectable } from '@angular/core';
import { Scheduler, PCAScheduler, PPScheduler } from './schedulers/Scheduler';
import { ProcessesService } from './processes.service';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  SCHEDULERS: Scheduler[] = [
    new PCAScheduler,
    new PPScheduler,
  ];
  scheduler: Scheduler;
  nbCores: number = 1;

  constructor(private processesService: ProcessesService) {
    this.scheduler = this.SCHEDULERS[0];
  }

  setScheduler(name: string) {
    this.scheduler = this.SCHEDULERS.find((scheduler) => scheduler.name === name);
  }

  onTimeUnitStart(tickNumber: number) {
    this.scheduler.onTimeUnitStart(this.processesService.getProcesses(), this.nbCores, tickNumber);
  }

  onTimeUnitEnd(tickNumber: number) {
    this.scheduler.onTimeUnitEnd(this.processesService.getProcesses(), this.nbCores, tickNumber);
  }

}
