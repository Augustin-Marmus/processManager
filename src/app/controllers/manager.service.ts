import { Injectable } from '@angular/core';
import { Observable, interval as rxInterval, Subscription, Scheduler } from 'rxjs';
import { AllocatorSettingsComponent } from '../settings/allocator-settings/allocator-settings.component';
import { SchedulerService } from './scheduler.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private counter: number = 0;
  private ticker: Observable<number>;
  private subsription: Subscription = null;
  private _interval: number = 1000;

  constructor(private schedulerService: SchedulerService) {
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
    console.log(`Step ${this.counter}`);
    if (this.counter > 0) {
      this.schedulerService.onTimeUnitEnd(this.counter++); // TODO change incrementation
      // allocator.onTimeUnitEnd(this.counter);
      this.schedulerService.onTimeUnitStart(this.counter);
      // allocator.onTimeUnitStart(this.counter);
    } else {
      this.schedulerService.onTimeUnitStart(this.counter++); // TODO change incrementation
      // allocator.onTimeUnitStart(this.counter);
    }
  }

  reset() {
    this.pause()
    this.counter = 0;
    this.schedulerService.reset();
    // allocator.reset
  }
}
