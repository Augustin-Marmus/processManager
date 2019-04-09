import { Injectable } from '@angular/core';
import { Observable, interval as rxInterval, Subscription, Scheduler } from 'rxjs';
import { AllocatorSettingsComponent } from '../settings/allocator-settings/allocator-settings.component';
import { SchedulerService } from './scheduler.service';
import { ProcessesService } from './processes.service';
import { AllocatorService } from './allocator.service';
import { PagesService } from './pages.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private counter: number = 0;
  private ticker: Observable<number>;
  private subsription: Subscription = null;
  private _interval: number = 1000;

  constructor(
    private schedulerService: SchedulerService,
    private processesService: ProcessesService,
    private allocatorService: AllocatorService,
    private pagesService: PagesService,
  ) {
    this.ticker = rxInterval(this.interval);
  }

  get interval(): number { return this._interval; };
  set interval(interval: number) {
    this._interval = interval;
    this.ticker = rxInterval(this._interval);
  }

  start() {
    if (!this.subsription) {
      this.subsription = this.ticker.subscribe((value) => { this.step() });
    }
  }

  pause() {
    if (this.subsription) {
      this.subsription.unsubscribe();
      this.subsription = null;
    }
  }

  step() {
    if (this.counter > 0) {
      this.schedulerService.onTimeUnitEnd(this.counter); // TODO change incrementation
      this.allocatorService.onTimeUnitEnd(this.counter++);
      this.schedulerService.onTimeUnitStart(this.counter);
      this.allocatorService.onTimeUnitStart(this.counter);
    } else {
      this.schedulerService.onTimeUnitStart(this.counter); // TODO change incrementation
      this.allocatorService.onTimeUnitStart(this.counter++);
    }
  }

  reset() {
    this.pause()
    this.counter = 0;
    this.processesService.reset();
    this.pagesService.reset()
  }
}
