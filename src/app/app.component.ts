import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from "./components/menu/menu.component";
import { TokenStorageService } from './services/token-storage.service';
import { Subscription } from 'rxjs';
import { EventBusService } from './services/event-bus.service';
import { AuthService } from './services/auth.service';
import { FooterComponent } from './components/footer/footer.component';
import { DataSharingService } from './services/data-sharing.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenuComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit{
  title = 'grhfront';
  currentUser: any;
  idtrace !: number;
  currenttoken !: any;
  isloggedin !: boolean;
  eventBusSub : Subscription = new Subscription();
  
  constructor(private token: TokenStorageService,private router: Router,private authService: AuthService,
    private eventBusService: EventBusService,private dataSharingService: DataSharingService) {

      this.dataSharingService.isUserLoggedIn.subscribe( value => {
        this.isloggedin = value;
    });

    this.dataSharingService.currentuser.subscribe( value => {
      this.currentUser = value;
     });
     
     }

     
     
  ngOnInit(): void {
    this.isloggedin =   this.token.isLoggedIn();
    this.currenttoken = this.token.getToken();
    this.currentUser  = this.token.getUser(); 
    
    if( this.isloggedin){
    if (this.currenttoken == null || (this.currenttoken != null && !this.isTokenExpired(this.currenttoken))) {
      // call logout method/dispatch logout event
        this.eventBusSub = this.eventBusService.on('logout', () => {
       this.logout();
       this.dataSharingService.isUserLoggedIn.next(false);
       this.dataSharingService.currentuser.next(null);
       // this.router.navigate(['/login']);
        
       });
       
       this.token.signOut();
       this.eventBusSub.unsubscribe;
       this.currenttoken = null;
       sessionStorage.clear();
       window.sessionStorage.setItem('auth-isLoggedIn','false') ;
       this.dataSharingService.isUserLoggedIn.next(false);
      this.dataSharingService.currentuser.next(null);
      
       

    } else if(this.currenttoken != null && this.isTokenExpired(this.currenttoken)) {

      this.currentUser  = this.token.getUser(); 
     

    }
  }



    
  }

  HomeClick(){
    this.router.navigate(['']);
  }

  private isTokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return expiry * 1000 > Date.now();
  }

  logout(): void {
    // on update trace 
    this.idtrace = Number(this.token.gettrace());
    this.updatetrace(this.idtrace) ;

    this.token.signOut();
    this.eventBusSub.unsubscribe;
    this.currenttoken = null;
    //this.currentUser = null;
    sessionStorage.clear();
    //window.location.reload();
    //this.router.navigate(['/login']);
    this.dataSharingService.isUserLoggedIn.next(false);
    this.dataSharingService.currentuser.next(null);

    
  }


  updatetrace(id : number ) {
    if (id !== null) {
      this.authService.updateDatedecnx(id).subscribe(
        () => {
          console.log('Datedecnx updated successfully');
        },
        error => {
          console.error('Error updating datedecnx', error);
        }
      );
    }
  }

}
