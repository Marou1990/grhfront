import { Component, OnInit, Type } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpProviderService } from '../../services/http-provider.service';


import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'ng-modal-confirm',
  template: `
  <div class="modal-header">
    <h5 class="modal-title" id="modal-title">Comfirmer la suppression</h5>
    <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">×</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Voulez vous supprimer l'employée?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Annuler</button>
    <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
  </div>
  `,
})

export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  closeResult = '';
  employeeList: any = [];
  autorisationList: any = [];

  constructor(private router: Router, private modalService: NgbModal,
    private toastr: ToastrService, private httpProvider : HttpProviderService) { }
    

    ngOnInit(): void {
      this.getAllEmployee();
      
    }

  async getAllEmployee() {
    
    this.httpProvider.getAllEmployee().subscribe((data : any) => {
      
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.employeeList = resultData;
        }
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.employeeList = [];
            }
          }
        }
      });
  }
//Add employee
  AddEmployee(): void {
    this.router.navigate(['AddEmployee']);
  }

  Adddeamndeauto(): void {
    this.router.navigate(['AddDemandeAutorisation']);
  }

  ConsulterListdemande(): void {
    this.router.navigate(['ConsultListDemande']);
  }

  deleteEmployeeConfirmation(employee: any) {
   this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deleteEmployee(employee);
      },
        (reason) => {});
  }
  deleteEmployee(employee: any) {
    this.httpProvider.deleteEmployeeById(employee.id).subscribe(
      (data : any) => {
        this.toastr.success('Employee supprimé avec succées ');
          this.getAllEmployee();
        
     /* if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData != null && resultData.isSuccess) {
          this.toastr.success(resultData.message);
          this.getAllEmployee();
        }
      }*/
    },
    (error : any) => {});
  }

  getAutorisation(employee: any) {
    
    this.getAutorisationById(employee);
    
  }
  

  async getAutorisationById(employee: any) {
    
    this.httpProvider.getAutorisationlById(employee.id).subscribe(
      
      (data : any) => {
      if (data != null && data.body != null) {
        
        var resultData = data.body;
        if (resultData) {
          this.autorisationList = resultData;
        }
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.autorisationList = [];
            }
          }
        }
      });
  }

}
