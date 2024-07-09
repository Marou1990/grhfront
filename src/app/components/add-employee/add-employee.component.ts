import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { employeeForm } from '../../forms/employeeForm';
import { HttpProviderService } from '../../services/http-provider.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule,CommonModule,ToastrModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit{

  isSubmitted: boolean = false;
  addEmployeeForm: employeeForm = new employeeForm();

  @ViewChild("employeeForm")
  employeeForm!: NgForm;
  
  ngOnInit(): void {
  }
  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService) { }

  AddEmployee(isValid: any) {
    this.isSubmitted = true;
    console.log(isValid);
    
    if (isValid) {
     
      
      this.httpProvider.saveEmployee(this.addEmployeeForm).subscribe(

        async data => {
          this.toastr.success('Employee ajouté avec succés');
              setTimeout(() => {
                this.router.navigate(['/Home']);  
              }, 500);
       /* if (data != null && data.body != null) {
            var resultData = data.body;
            console.log(resultData.isSuccess);
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                
              }, 500);
            }
          
        }*/
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
        
    }
  }
}
  

