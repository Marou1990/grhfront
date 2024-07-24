import { Component, OnInit } from '@angular/core';
import { PageForm } from '../../../forms/PageForm';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../../../services/http-provider.service';
import {CalendarModule} from 'primeng/calendar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [InputTextModule,FormsModule,CommonModule,ToastrModule,CalendarModule],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent  implements OnInit{


  pageform : PageForm = new PageForm();
  pageListPrt: any = [];
  pageprtselected  : PageForm = new PageForm();
  pageListSM: any = [];
  pageSMselected  : PageForm = new PageForm();


  ngOnInit(): void {
    this.getAllPagesPrt();
    this.getAllPagesSM();
  }

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }



  async AjouterPage() {

    if(this.pageform.typePage=='P'){
      this.pageform.code_prt= this.pageSMselected.code ;
    }else if (this.pageform.typePage=='SM'){
      this.pageform.code_prt= this.pageprtselected.code ;
    }
    
    
    
    this.httpProvider.savePages(this.pageform).subscribe(

      async data => {
        this.toastr.success('Page ajouté avec succés');
            setTimeout(() => {
            // this.router.navigate(['/Home']);  
            }, 500);
           this.getAllPagesPrt();
           this.getAllPagesSM();
           this.pageform = new PageForm();
            
            
    },
      async error => {
        this.toastr.error(error.message);
        setTimeout(() => {
         // this.router.navigate(['/Home']);
        }, 500);

       
      });
      
 
}

async getAllPagesPrt() {
    
  this.httpProvider.getAllPagesPrt().subscribe((data : any) => {
    
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.pageListPrt = resultData;
      }
    }
  },
  (error : any)=> {
      if (error) {
        if (error.status == 404) {
          if(error.error && error.error.message){
            this.pageListPrt = [];
          }
        }
      }
    });
}

async getAllPagesSM() {
    
  this.httpProvider.getAllSMoudule().subscribe((data : any) => {
    
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.pageListSM = resultData;
      }
    }
  },
  (error : any)=> {
      if (error) {
        if (error.status == 404) {
          if(error.error && error.error.message){
            this.pageListSM = [];
          }
        }
      }
    });
}

 

}
