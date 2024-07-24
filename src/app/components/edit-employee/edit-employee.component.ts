import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { employeeForm } from '../../forms/employeeForm';
import { HttpProviderService } from '../../services/http-provider.service';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent  implements OnInit{
  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['employeeId'];
    this.getEmployeeDetailById();
  }

  editEmployeeForm: employeeForm = new employeeForm();

  @ViewChild("employeeForm")
  employeeForm!: NgForm;

  isSubmitted: boolean = false;
  employeeId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }
  

    getEmployeeDetailById() {
      this.httpProvider.getEmployeeDetailById(this.employeeId).subscribe((data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData) {
            this.editEmployeeForm.Id= resultData.id;
            this.editEmployeeForm.firstName = resultData.firstName;
            this.editEmployeeForm.lastName = resultData.lastName;
            this.editEmployeeForm.email = resultData.email;
            this.editEmployeeForm.address = resultData.address;
            this.editEmployeeForm.identifiant = resultData.identifiant;
            this.editEmployeeForm.phoneNumber = resultData.phoneNumber;
            this.editEmployeeForm.status = resultData.status;
          }
        }
      },
        (error: any) => { });
    }


    EditEmployee(isValid: any) {
      this.isSubmitted = true;
      if (isValid) {

        

       this.httpProvider.updateEmployee(this.editEmployeeForm).subscribe(
        
        async data => {
          if (data != null && data.body != null) {
            var resultData = data.body;
            if (resultData != null && resultData.isSuccess) {
              if (resultData != null && resultData.isSuccess) {
                this.toastr.success(resultData.message);
                setTimeout(() => {
                 // this.router.navigate(['/Home']);
                }, 500);
              }
            }
          }
        },
          async error => {
            this.toastr.error(error.message);
            setTimeout(() => {
             // this.router.navigate(['/Home']);
            }, 500);
          });
      }
    }
  }
  


