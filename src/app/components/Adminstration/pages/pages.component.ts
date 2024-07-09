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

  ngOnInit(): void {
  }

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }



  async AjouterPage() {
     
    this.httpProvider.savePages(this.pageform).subscribe(

      async data => {
        this.toastr.success('Page ajouté avec succés');
            setTimeout(() => {
            // this.router.navigate(['/Home']);  
            }, 500);
            
    },
      async error => {
        this.toastr.error(error.message);
        setTimeout(() => {
         // this.router.navigate(['/Home']);
        }, 500);

       
      });
      
 
}


}
