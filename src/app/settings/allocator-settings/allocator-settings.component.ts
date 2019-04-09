import { Component, OnInit } from '@angular/core';
import { AllocatorService } from 'src/app/controllers/allocator.service';

@Component({
  selector: 'app-allocator-settings',
  templateUrl: './allocator-settings.component.html',
  styleUrls: ['./allocator-settings.component.css']
})
export class AllocatorSettingsComponent implements OnInit {
  allocatorService: AllocatorService;
  private _selected: string;

  constructor(allocatorService: AllocatorService) {
    this.allocatorService = allocatorService;
    this._selected = allocatorService.allocator.name;
  }

  ngOnInit() {
  }

  get selected(): string { return this._selected };
  set selected(value: string) {
    this.allocatorService.setAllocator(value);
    this._selected = value;
  }
}
