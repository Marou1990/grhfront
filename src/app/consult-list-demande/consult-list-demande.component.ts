
import { Component, Input, OnInit, output, ViewChild } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SplitterModule} from 'primeng/splitter';
import {TabViewModule} from 'primeng/tabview';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { demandeautoForm } from '../forms/demandeautoForm';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpProviderService } from '../services/http-provider.service';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-consult-list-demande',
  standalone: true,
  imports: [FormsModule,CommonModule,ToastrModule,SplitterModule,TabViewModule,ToolbarModule,
    ButtonModule,CalendarModule,TableModule,DialogModule],
  templateUrl: './consult-list-demande.component.html',
  styleUrl: './consult-list-demande.component.scss'
})
export class ConsultListDemandeComponent  implements OnInit{
  
  demAutorisationForm : demandeautoForm = new demandeautoForm();

  demAutorisationList: any = [];
  demcgList: any = [];
  etatdem  : string = 'I';
  etatdemacc  : string = 'A';
  etatdemref  : string = 'R';
  visibleaccept : boolean = false;
  visiblearefuse : boolean = false;
  visibleacceptcg : boolean = false;
  visiblearefusecg : boolean = false;
  

  
  constructor(private router: Router, private modalService: NgbModal,
    private toastr: ToastrService, private httpProvider : HttpProviderService) { }

  ngOnInit(): void {
    this.getAlldemanAutorisation(this.etatdem);
    this.getAlldemancg(this.etatdem);
  }

  async getAlldemanAutorisation(etat : any) {
    
    this.httpProvider.getAutorisationEncours(etat).subscribe((data : any) => {
      
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.demAutorisationList = resultData;
        }
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.demAutorisationList = [];
            }
          }
        }
      });
  }

  async getAlldemancg(etat : any) {
    
    this.httpProvider.getcgEncours(etat).subscribe((data : any) => {
      
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.demcgList = resultData;
        }
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.demcgList = [];
            }
          }
        }
      });
  }

  showDialogAccept(){
  this.visibleaccept = true ;
  }
  showDialogRefus(){
    this.visiblearefuse = true ;
    }
    showDialogAcceptcg(){
      this.visibleacceptcg = true ;
      }
      showDialogRefuscg(){
        this.visiblearefusecg = true ;
        }

    accepterdem(id: any) {
      
       this.httpProvider.updatedemautobyetat(id,this.etatdemacc).subscribe(
        
        async data => {

              this.toastr.success("Demande Traité avec succées");
                setTimeout(() => {
                 // this.router.navigate(['/Home']);
                }, 500);
                this.visibleaccept=false;
                this.getAlldemanAutorisation(this.etatdem);

          /*if (data != null && data.body != null) {
            var resultData = data.body;
            if (resultData != null && resultData.isSuccess) {
              if (resultData != null && resultData.isSuccess) {
                
              }
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


    refusdem(id: any) {
      
      this.httpProvider.updatedemautobyetat(id,this.etatdemref).subscribe(
       
       async data => {

          this.toastr.success("Demande Traité avec succées");
               setTimeout(() => {
                // this.router.navigate(['/Home']);
               }, 500);
               this.visiblearefuse=false;
               this.getAlldemanAutorisation(this.etatdem);

         
       },
         async error => {
           this.toastr.error(error.message);
           setTimeout(() => {
             this.router.navigate(['/Home']);
           }, 500);
         });
    
   }

   accepterdemcg(id: any) {
      
    this.httpProvider.updatedemcgbyetat(id,this.etatdemacc).subscribe(
     
     async data => {

       this.toastr.success("Demande Traité avec succées");
             setTimeout(() => {
             }, 500);
             this.visibleacceptcg=false;
             this.getAlldemancg(this.etatdem);

       
     },
       async error => {
         this.toastr.error(error.message);
         setTimeout(() => {
           this.router.navigate(['/Home']);
         }, 500);
       });
  
 }

 refusdemcg(id: any) {
      
  this.httpProvider.updatedemcgbyetat(id,this.etatdemref).subscribe(
   
   async data => {
          this.toastr.success("Demande Traité avec succées");
           setTimeout(() => {
           }, 500);
           this.visiblearefusecg=false;
           this.getAlldemancg(this.etatdem);

     
   },
     async error => {
       this.toastr.error(error.message);
       setTimeout(() => {
         this.router.navigate(['/Home']);
       }, 500);
     });

}

}
