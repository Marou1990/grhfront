import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailProfilForm } from '../forms/detail-profil';
import { ProfilForm } from '../forms/ProfilForm';
import { WebApiService } from './web-api.service';

var apiUrl = "http://localhost:8090/api/employee";
var apiUrlauto = "http://localhost:8090/api/autorisation";


var httpLink = {
  getAllEmployee: apiUrl + "/employees",
  getEmployeeDetailById: apiUrl + "/getemployees",
  getEmployeeByMat: apiUrl + "/getemployeesbymat",
  saveEmployee: apiUrl + "/addemployees",
  getAutorisationById: apiUrlauto + "/getautorisations",
  //savedemandeauto: apiUrldemande + "/{id}/adddemande",
  
}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private webApiService: WebApiService,private httpClient: HttpClient) { }

  private  apiUrldemande = "http://localhost:8090/api/demautorisation";
  private  apiUrldemandecg = "http://localhost:8090/api/demcg";
  private  apiUrlpages = "http://localhost:8090/api/admin/pages";
  private  apiUrlprofil = "http://localhost:8090/api/admin/profil";
  private  apiUrldetailprofil = "http://localhost:8090/api/admin/detailprfl";

  public getAllEmployee(): Observable<any> {
    return this.webApiService.get(httpLink.getAllEmployee);
  }

  public deleteEmployeeById(model: any): Observable<any> {
    return  this.httpClient.delete(`${apiUrl}/delete-employees/${model}`) ;
  }
  public getEmployeeDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getEmployeeDetailById + '/'+model);
  }

  public getEmployeeDetailByMatricule(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getEmployeeByMat + '/'+model);
  }

  public updateEmployee(model: any): Observable<any> {
    return this.httpClient.put(`${apiUrl}/edit-employee`, model)
  }
  public saveEmployee(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveEmployee, model);
  } 

  public getAutorisationlById(model: any): Observable<any> {
    
    return this.webApiService.get(httpLink.getAutorisationById + '/'+model);
  }

  public saveDeamndeAuto(employeeId: number, detail : any): Observable<any> {
    return this.webApiService.post(`${this.apiUrldemande}/${employeeId}/adddemande`, detail);
  } 

  public getAutorisationEncours(etat: string): Observable<any> {
    return this.webApiService.get(`${this.apiUrldemande}/demandesbyetat/${etat}`);
  }

  public updatedemautobyetat(iddem: number,eta : string): Observable<any> {
    return this.httpClient.put(`${this.apiUrldemande}/edit-demandeauto/${iddem}/${eta}`,null);
  }
  public getcgEncours(etat: string): Observable<any> {
    return this.webApiService.get(`${this.apiUrldemandecg}/demandescgbyetat/${etat}`);
  }
  public updatedemcgbyetat(iddem: number,eta : string): Observable<any> {
    return this.httpClient.put(`${this.apiUrldemandecg}/edit-demandecg/${iddem}/${eta}`,null);
  }

  public saveDeamndecg(employeeId: number, detail : any): Observable<any> {
    return this.webApiService.post(`${this.apiUrldemandecg}/${employeeId}/adddemandecg`, detail);
  } 

  public savePages(model: any): Observable<any> {
    return this.webApiService.post(`${this.apiUrlpages}/addpage`, model);
  } 

  public saveProfil(model: any): Observable<ProfilForm> {
    //return this.webApiService.post(`${this.apiUrlprofil}/addprofil`, model);
    return this.httpClient.post<ProfilForm>(this.apiUrlprofil+'/addprofil', model);
  } 
  public savedetailProfil(model: any,codeprofil: number): Observable<any> {
   // return this.webApiService.post(`${this.apiUrldetailprofil}/adddetprf`, model);
   return this.httpClient.post(`${this.apiUrldetailprofil}/adddetprf/${codeprofil}`,model);
  } 

}
