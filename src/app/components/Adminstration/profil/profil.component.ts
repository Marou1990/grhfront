import { Component, Input, input, OnInit } from '@angular/core';
import { ProfilForm } from '../../../forms/ProfilForm';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../../../services/http-provider.service';
import {CalendarModule} from 'primeng/calendar';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailProfilComponent } from "../../detail-profil/detail-profil.component";


@Component({
    selector: 'app-profil',
    standalone: true,
    templateUrl: './profil.component.html',
    styleUrl: './profil.component.scss',
    imports: [InputTextModule, FormsModule, CommonModule, ToastrModule, CalendarModule, DetailProfilComponent]
})
export class ProfilComponent  implements OnInit{
  
  ngOnInit(): void {
  }
  isnew  : boolean = false ;
  isvalid  : boolean = false ;
  profilform : ProfilForm  = new ProfilForm();
  res : ProfilForm  = new ProfilForm();

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }

    async saveProfil() {

      if(this.isnew && this.profilform.libelle !=null &&this.profilform.datedebut !=null &&this.profilform.status !=null){
     
      this.httpProvider.saveProfil(this.profilform).subscribe(
  
        async data => {
          this.res = data ;
          this.toastr.success('Profil ajouté avec succés');
              setTimeout(() => {
                this.isnew = false ; 
                this.isvalid=true;
              // this.router.navigate(['/Home']);  
              }, 500);
              
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
           this.router.navigate(['/Home']);
          }, 500);
  
         
        });
        
      }
  }

  async addProfil() {

    this.profilform = new ProfilForm();
    this.isnew = true ;
    this.isvalid=false;
  }

  retourhome() {

    this.router.navigate(['/Home']);
  }
}
