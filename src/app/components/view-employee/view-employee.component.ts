import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpProviderService } from '../../services/http-provider.service';
import { WebApiService } from '../../services/web-api.service';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.scss'
})
export class ViewEmployeeComponent implements OnInit{
  employeeId: any;
  employeeDetail : any= [];
   
  constructor(public webApiService: WebApiService, private route: ActivatedRoute, private httpProvider : HttpProviderService) { }
  
  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['employeeId'];
    this.getEmployeeDetailById();
  }

  getEmployeeDetailById() { 
    this.httpProvider.getEmployeeDetailById(this.employeeId).subscribe((data : any) => {  
      
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.employeeDetail = resultData;
        }
      }
    },
    (error :any)=> { }); 
  }
}
