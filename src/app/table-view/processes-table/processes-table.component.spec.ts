/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProcessesTableComponent } from './processes-table.component';

describe('TableComponent', () => {
  let component: ProcessesTableComponent;
  let fixture: ComponentFixture<ProcessesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessesTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
