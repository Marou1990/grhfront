import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { statisticsEminsForm } from '../forms/statisticsEminsForm';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  
  private apiUrlstat = 'http://localhost:8090/api/stat';

  constructor(private http: HttpClient) { }

  getstatemplinsc(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlstat+'/statemplins');
  }

  getstatempletatcivil(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlstat+'/statempecivil');
  }

  getautorisationstat(etat : string): Observable<any[]> {
    const url = `${this.apiUrlstat}/statautorisation/${etat}`;
    return this.http.get<any>(url);
  }
  
}
