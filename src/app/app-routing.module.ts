import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { TableViewComponent } from './table-view/table-view.component';
import { ProcessComponent } from './process/process.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'table', component: TableViewComponent },
  { path: 'process/:id', component: ProcessComponent },
  { path: 'report', component: ReportComponent },
  { path: '**', redirectTo: 'settings' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
