import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';


export interface Metrics {
  name: string;
  value: number | string;
}

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {
  displayedColumns: string[] = ['parameter', 'value'];
  parseResults = this.apiService.parseResults;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.parseResults = this.apiService.parseResults;
    console.log(this.parseResults);
  }

}
