import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OperationTrace } from '../../../../forms/OperationTrace';
import { TraceService } from '../../../../services/trace.service';
import { TableModule } from "primeng/table"; 
import { MultiSelectModule } from "primeng/multiselect"; 

@Component({
  selector: 'app-trace-table',
  standalone: true,
  imports: [FormsModule,CommonModule,
    ReactiveFormsModule, TableModule, 
    MultiSelectModule],
  templateUrl: './trace-table.component.html',
  styleUrl: './trace-table.component.scss'
})

export class TraceTableComponent implements OnInit{


  traces: OperationTrace[] = [];

  constructor(private traceService: TraceService) {}

  ngOnInit(): void {
    this.traceService.getTraces().subscribe(data => {
      this.traces = data;
    });
  }
  
}
