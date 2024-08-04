import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OperationTrace } from '../forms/OperationTrace';
import { Observable } from 'rxjs';
import { TraceConnection } from '../forms/TraceConnection';

@Injectable({
  providedIn: 'root'
})

export class TraceService {

  private apiUrl = 'http://localhost:8090/api/traces';
  private apiUrlcnx = 'http://localhost:8090/api/traceconnection/alltracescnx';

  constructor(private http: HttpClient) { }

  getTraces(): Observable<OperationTrace[]> {
    return this.http.get<OperationTrace[]>(this.apiUrl);
  }

  getTracescnx(): Observable<TraceConnection[]> {
    return this.http.get<TraceConnection[]>(this.apiUrlcnx);
  }
  
}
