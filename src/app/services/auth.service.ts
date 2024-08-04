import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TraceConnection } from '../forms/TraceConnection';

const AUTH_API = 'http://localhost:8090/api/auth/';
const TRACECNX_API = 'http://localhost:8090/api/traceconnection';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }


  saveTraceConnection(id: number,traceConnection: TraceConnection): Observable<TraceConnection> {
    return this.http.post<TraceConnection>(`${TRACECNX_API}/savetrace/${id}`, traceConnection);
  }

  // New update method
  updateDatedecnx(id: number): Observable<void> {
    return this.http.put<void>(`${TRACECNX_API}/updatetrace/${id}`, null);
  }
  
  
}
