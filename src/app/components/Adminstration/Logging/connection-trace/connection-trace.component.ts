import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TraceConnection } from '../../../../forms/TraceConnection';
import { TraceService } from '../../../../services/trace.service';
import { TableModule } from "primeng/table"; 
import { MultiSelectModule } from "primeng/multiselect"; 

@Component({
  selector: 'app-connection-trace',
  standalone: true,
  imports: [FormsModule,CommonModule,
    ReactiveFormsModule, TableModule, 
    MultiSelectModule],
  templateUrl: './connection-trace.component.html',
  styleUrl: './connection-trace.component.scss'
})
export class ConnectionTraceComponent implements OnInit{
  
  tracescnx: TraceConnection[] = [];

  constructor(private traceService: TraceService) {}

  ngOnInit(): void {
    this.traceService.getTracescnx().subscribe(data => {
      this.tracescnx = data;
    });
  }

}
