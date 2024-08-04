import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from "primeng/table"; 
import { MultiSelectModule } from "primeng/multiselect"; 
import { statisticsEminsForm } from '../../../forms/statisticsEminsForm';
import { StatisticsService } from '../../../services/statistics.service';
import {ChartModule} from 'primeng/chart';
import { statisticsEmetatcivil } from '../../../forms/statisticsEmetacivil';
import { statisticsautorisationForm } from '../../../forms/statisticsautorisationForm';


@Component({
  selector: 'app-statisiques',
  standalone: true,
  imports: [FormsModule,CommonModule,
    ReactiveFormsModule, TableModule, 
    MultiSelectModule,ChartModule],
  templateUrl: './statisiques.component.html',
  styleUrl: './statisiques.component.scss'
})
export class StatisiquesComponent implements OnInit{

  statempinsc: statisticsEminsForm[] = [];
  data: any;
  datacivil: any;
  dataauto: any;
  countA : any ;
  dataA: any;
  countC : any ;
  dataC: any;
 
 
  

  constructor(private statService: StatisticsService) {}

  ngOnInit(): void {

   
    this.statService.getstatemplinsc().subscribe((data: statisticsEminsForm[]) => {
      const labels = data.map(stat => `${stat.year}`);
      const counts = data.map(stat => stat.count);
      
      this.data = {
        labels: labels,
        datasets: [
          {type: 'bar',
            label: 'number of employees registered per year',
            backgroundColor: ['#26A69A'],
            borderColor: '#1E88E5',
            data: counts
          }
        ]
      };
    });


    this.statService.getstatempletatcivil().subscribe((data: statisticsEmetatcivil[]) => {
      const labels = data.map(stat => `${stat.etat}`);
      const counts = data.map(stat => stat.count);
      
      this.datacivil = {
        labels: labels,
        datasets: [
          {type: 'bar',
            label: 'number of employees registered per etat civil',
            backgroundColor: ['#9CCC65'],
            borderColor: '#1E88E5',
            data: counts
          }
        ]
      };
    });
   
    
    this.statService.getautorisationstat("A").subscribe((dataA: statisticsautorisationForm[]) => {
      this.countA = dataA.map(stat => stat.count);
    });

    this.statService.getautorisationstat("C").subscribe((dataC: statisticsautorisationForm[]) => {
      this.countC = dataC.map(stat => stat.count);
    });

    this.statService.getautorisationstat("I").subscribe((data: statisticsautorisationForm[]) => {
      const labels = data.map(stat => `${stat.month}`);
      const counts = data.map(stat => stat.count);
      
      this.dataauto = {
        labels: [8,7],
        datasets: [
          {type: 'bar',
            label: 'I',
            backgroundColor: ['#ffee33'],
            borderColor: '#1E88E5',
            data: counts
          },
          {type: 'bar',
            label: 'A',
            backgroundColor: ['#992b27'],
            borderColor: '#1E88E5',
            data: this.countA
          },
          {type: 'bar',
            label: 'C',
            backgroundColor: ['#6ed749'],
            borderColor: '#1E88E5',
            data: this.countC
          }
        ]
        
      };
    });

    
   
   
    
  }
   

}
