import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { employeeForm } from '../../forms/employeeForm';
import { HttpProviderService } from '../../services/http-provider.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SplitterModule} from 'primeng/splitter';
import {TabViewModule} from 'primeng/tabview';
import { demandeautoForm } from '../../forms/demandeautoForm';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import { demandecgForm } from '../../forms/demandecgForm';
import {CalendarModule} from 'primeng/calendar';


@Component({
  selector: 'app-demande-auto',
  standalone: true,
  imports: [FormsModule,CommonModule,ToastrModule,SplitterModule,TabViewModule,ToolbarModule,
    ButtonModule,CalendarModule],
  templateUrl: './demande-auto.component.html',
  styleUrl: './demande-auto.component.scss'
})
export class DemandeAutoComponent implements OnInit{

  ngOnInit(): void {
    
  }
  @ViewChild("employeeForm")
  employeeForm!: NgForm;
  @ViewChild("demandeautoForm")
  demandeautoForm!: NgForm;
  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }
    
   searchEmployeeForm: employeeForm = new employeeForm();
   demAutorisationForm : demandeautoForm = new demandeautoForm();
   demcgForm : demandecgForm = new demandecgForm();
   matsearch ! : string ;
   isfinded   : boolean = false;
   isnewdem   : boolean = false;
   isnewdemcg   : boolean = false;
   @Input() employeeId!: number;

   

   // retourner le matricule searcher
   getEmployeeDetailByMat(matricule: any) {
    this.httpProvider.getEmployeeDetailByMatricule(matricule).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.searchEmployeeForm.Id= resultData.id;
          this.searchEmployeeForm.firstName = resultData.firstName;
          this.searchEmployeeForm.lastName = resultData.lastName;
          this.searchEmployeeForm.email = resultData.email;
          this.searchEmployeeForm.address = resultData.address;
          this.searchEmployeeForm.identifiant = resultData.identifiant;
          this.searchEmployeeForm.phoneNumber = resultData.phoneNumber;
          this.searchEmployeeForm.status = resultData.status;

          this.isfinded = true;
          this.employeeId = resultData.id;
          
        }
      }else {

        this.toastr.error('Votre matricule est erronné !');
        this.isfinded = false;

      }
    },
    async error => {
      this.isfinded = false;
      setTimeout(() => {
        //this.router.navigate(['/Home']);
      }, 500);
    });
  }


  Ajouterdem(){
   this.isnewdem = true ;
   this.employeeId = this.searchEmployeeForm.Id;
   this.demAutorisationForm.employee = this.searchEmployeeForm;
   
  }



  SaveDemande() {
     
      this.httpProvider.saveDeamndeAuto(this.employeeId,this.demAutorisationForm).subscribe(

        async data => {
          this.toastr.success('Demande Autorisation ajouté avec succés');
              setTimeout(() => {
              // this.router.navigate(['/Home']);  
              }, 500);

              this.isnewdem = false ;
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
           // this.router.navigate(['/Home']);
          }, 500);

          this.isnewdem = false ;
        });
        
   
  }

  AnnulerDemande() {
    this.isnewdem = false ;  
  }


  Ajouterdemcg(){
    this.isnewdemcg = true ;
    this.employeeId = this.searchEmployeeForm.Id;
    this.demcgForm.employee = this.searchEmployeeForm;
    
   }
 
   
 
   SaveDemandecg() {
       this.httpProvider.saveDeamndecg(this.employeeId,this.demcgForm).subscribe(
 
         async data => {
           this.toastr.success('Demande Congé ajouté avec succés');
               setTimeout(() => {
              //  this.router.navigate(['/Home']);  
               }, 500);
 
               this.isnewdemcg = false ;
       },
         async error => {
           this.toastr.error(error.message);
           setTimeout(() => {
           // this.router.navigate(['/Home']);
           }, 500);
 
           this.isnewdemcg = false ;
         });
         
    
   }
 
   AnnulerDemandecg() {
     this.isnewdemcg = false ;  
   }

}
