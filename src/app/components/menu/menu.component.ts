import { Component, OnInit} from '@angular/core';
import { MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HttpProviderService } from '../../services/http-provider.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { PageForm } from '../../forms/PageForm';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatMenuModule,MatButtonModule,CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{

  currentMenu: any;
  currentSMenu: any;
  
  
  pageListPrtbut: any = [];
  pageListSMbut           !: PageForm[] ;
  pageListPagesbut        !: PageForm[] ;
  pageListSMbutfiltred    !: PageForm[] ;
  pageListPagesbutfiltred !: PageForm[] ;



  constructor(private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }
  ngOnInit(): void {
    this.getAllPagesPrt();
    this.getPageSM();
    this.getPageSSM();
    
  }



 
/*  used  version array */
  async getAllPagesPrt() {
    
    this.httpProvider.getAllPagesPrt().subscribe((data : any) => {
      
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.pageListPrtbut = resultData;
        }
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.pageListPrtbut = [];
            }
          }
        }
      });
  }
  async getPageSM() {
    
    this.httpProvider.getAllSMoudule().subscribe((data : any) => {
      
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.pageListSMbut = resultData;
        }
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.pageListSMbut = [];
            }
          }
        }
      });
  }
  async getPageSSM() {
    
    this.httpProvider.getAllSSMoudule().subscribe((data : any) => {
      
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.pageListPagesbut = resultData;
        }
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.pageListPagesbut = [];
            }
          }
        }
      });
  }
  
   getMenuName(menuItem : any,code : any) {
    
    if(menuItem != null ){
    // this.getAllSMPrtbycode(code);
    this.pageListSMbutfiltred = this.pageListSMbut.filter((pageForm) => pageForm.code_prt == code );
     this.currentMenu = menuItem;
    }

  }
    getSMenuName(smenuItem : any,code : any) {
      
      if(smenuItem != null ){
       //this.getAllPagesPrtbycode(code);
       this.pageListPagesbutfiltred = this.pageListPagesbut.filter((pageForm) => pageForm.code_prt == code );
       this.currentSMenu = smenuItem;
      }
}

redirect_to(action : any){
    

  this.router.navigate([action]);

}



/* not used old version chargement par api */

async getAllSMPrtbycode(cdeprt : any) {
    
  this.httpProvider.getallSMouduleBycdprt(cdeprt).subscribe((data : any) => {
    
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.pageListSMbut = resultData;
      }
    }
  },
  (error : any)=> {
      if (error) {
        if (error.status == 404) {
          if(error.error && error.error.message){
            this.pageListSMbut = [];
          }
        }
      }
    });
}
async getAllPagesPrtbycode(cdeprt : any) {
  
  this.httpProvider.getallPagesBycdprt(cdeprt).subscribe((data : any) => {
    
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.pageListPagesbut = resultData;
      }
    }
  },
  (error : any)=> {
      if (error) {
        if (error.status == 404) {
          if(error.error && error.error.message){
            this.pageListPagesbut = [];
          }
        }
      }
    });
}



}
