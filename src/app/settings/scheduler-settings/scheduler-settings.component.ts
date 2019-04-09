import { Component, OnInit } from '@angular/core';
import { SchedulerService } from 'src/app/controllers/scheduler.service';

@Component({
  selector: 'app-scheduler-settings',
  templateUrl: './scheduler-settings.component.html',
  styleUrls: ['./scheduler-settings.component.css']
})
export class SchedulerSettingsComponent implements OnInit {
  schedulerService: SchedulerService;
  private _selected: string;

  constructor(schedulerService: SchedulerService) {
    this.schedulerService = schedulerService;
    this._selected = schedulerService.scheduler.name;
  }

  ngOnInit() {
  }

  get selected(): string { return this._selected };
  set selected(value: string) {
    this.schedulerService.setScheduler(value);
    this._selected = value
  }
}
