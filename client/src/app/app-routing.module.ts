import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyzeComponent } from './analyze/analyze.component';
import { LintComponent } from './lint/lint.component';
import { MetricsComponent } from './metrics/metrics.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  { path: 'analyze', component: AnalyzeComponent},
  { path: 'results', component: ResultsComponent },
  { path: 'metrics', component: MetricsComponent },
  { path: 'lint', component: LintComponent },
  { path: '', component: AnalyzeComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
