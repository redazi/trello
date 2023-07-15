import { Component, OnInit } from '@angular/core';
//import { ChartData, ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { SalesforceService } from '../salesforce.service';


@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit {
/*
  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  public chartLabels: string[] = [];
  public chartData: ChartData<'doughnut', number[], string> = {
    labels: this.chartLabels,
    datasets: [
      {
        data: [],
        backgroundColor: ['MediumPurple', 'blue', 'green', 'yellow'],
        hoverBackgroundColor: ['lightred', 'lightblue', 'lightgreen', 'yellow']
      }
    ]
  };

  public chartType: ChartType = 'doughnut';

  constructor(private salesforceService: SalesforceService) {}

  ngOnInit() {
    this.salesforceService
      .getInfos(`SELECT Name FROM List__c WHERE Project__c ='a018d00000P4ZIYAA3'`)
      .subscribe(
        response => {
          this.chartLabels = response.records.map((record: any) => record.Name);
          console.log(this.chartLabels);

          let totalTasks = 0;

          this.chartLabels.forEach((label, index) => {
            this.salesforceService
              .getInfos(`SELECT COUNT(Id) FROM Talk__c WHERE List__r.Name = '${label}'`)
              .subscribe(
                countResponse => {
                  const taskCount = countResponse.records[0].expr0;
                  totalTasks += taskCount;
                  this.chartData.datasets[0].data[index] = taskCount;
                  // Calcul du pourcentage
                  const percentage = (taskCount / totalTasks) * 100;
                  this.chartData.datasets[0].data[index] = percentage;
                },
                error => {
                  console.error(`Error retrieving task count for field ${label}:`, error);
                }
              );
          });
        },
        error => {
          console.error('Error retrieving accounts:', error);
        }
      );
  }


  /*
  
  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };



  public chartLabels: string[] = ['Label 1', 'Label 2', 'Label 3'];

  public chartData: ChartData<'doughnut', number[], string> = {
    labels: this.chartLabels,
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ['red', 'blue', 'green'],
        hoverBackgroundColor: ['lightred', 'lightblue', 'lightgreen']
      }
    ]
  };
 

  public chartType: ChartType = 'doughnut';
*/
  ngOnInit() {}

  
}
