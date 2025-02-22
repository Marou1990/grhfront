import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import { DetailProfilForm } from '../../forms/detail-profil';
import { InputTextModule, } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {CalendarModule} from 'primeng/calendar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpProviderService } from '../../services/http-provider.service';
import { AddRowDirective } from './AddRowDirective';
import { ProfilForm } from '../../forms/ProfilForm';
import {CheckboxModule} from 'primeng/checkbox';
import { PageForm } from '../../forms/PageForm';

@Component({
  selector: 'app-detail-profil',
  standalone: true,
  imports: [InputTextModule, FormsModule, CommonModule, ToastrModule,
     CalendarModule,ButtonModule,DropdownModule,TableModule,FormsModule,AddRowDirective,CheckboxModule],
  templateUrl: './detail-profil.component.html',
  styleUrl: './detail-profil.component.scss'
})
export class DetailProfilComponent implements OnInit{

  @Input()  item : ProfilForm = new ProfilForm();

  newdetprofil : DetailProfilForm  = new DetailProfilForm();
  listdetprofil: any = [];
  pageList: any = [];
  selectedPage !: PageForm;
  codeselected !:number;
  clonedDetailProfilForm: { [s: number]: DetailProfilForm } = {};
  
  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }
  ngOnInit(): void {
    this.listdetprofil;
    this.getAllPages() 
  }

  async newRow() {
    this.listdetprofil =  this.listdetprofil;
    return new DetailProfilForm();
  }

  onRowEditInit(car: DetailProfilForm) {
   
  }

   onRowEditSave(detail: DetailProfilForm) {

    detail.profil = this.item;
    detail.codePage = this.selectedPage.code;
    this.httpProvider.savedetailProfil(detail,this.item.codeProfil).subscribe(
  
     async  () => {

        this.toastr.success(' detail Page ajouté avec succés');
            setTimeout(() => {
            // this.router.navigate(['/Home']);  
            }, 500);
            
    },
    async  ()  => {
        this.toastr.error('error lors d ajout    ');
        setTimeout(() => {
         // this.router.navigate(['/Home']);
        }, 500);

       
      });
    
  }

  onRowEditCancel(detail: DetailProfilForm, index: number) {
    this.listdetprofil[index] = this.listdetprofil[detail.codePage];
    delete this.clonedDetailProfilForm[detail.codePage];
  }

  async getAllPages() {
    
    this.httpProvider.getAllPages().subscribe((data : any) => {
      
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.pageList = resultData;
        }
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.pageList = [];
            }
          }
        }
      });
  }

   onChange(code : any) {
    
    if(code !=null){
      
      this.selectedPage = code.target.value;
      alert('this.codeselected '+this.selectedPage.code) ;
    }
}
}
