import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProcessComponent } from './process/process.component';
import { SettingsComponent } from './settings/settings.component';
import { TableViewComponent } from './table-view/table-view.component';
import { ProcessesTableComponent } from './table-view/processes-table/processes-table.component';
import { ReportComponent } from './report/report.component';
import { SchedulerSettingsComponent } from './settings/scheduler-settings/scheduler-settings.component';
import { AllocatorSettingsComponent } from './settings/allocator-settings/allocator-settings.component';
import { PagesTableComponent } from './table-view/pages-table/pages-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProcessComponent,
    SettingsComponent,
    TableViewComponent,
    ReportComponent,
    ProcessesTableComponent,
    PagesTableComponent,
    SchedulerSettingsComponent,
    AllocatorSettingsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    FlexLayoutModule,
    MaterialModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
