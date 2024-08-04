import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { ConnectionTraceComponent } from './components/Adminstration/Logging/connection-trace/connection-trace.component';
import { TraceTableComponent } from './components/Adminstration/Logging/trace-table/trace-table.component';
import { PagesComponent } from './components/Adminstration/pages/pages.component';
import { ProfilComponent } from './components/Adminstration/profil/profil.component';
import { BoardAdminComponent } from './components/Authentification/board-admin/board-admin.component';
import { BoardUserComponent } from './components/Authentification/board-user/board-user.component';
import { LoginComponent } from './components/Authentification/login/login.component';
import { ProfileComponent } from './components/Authentification/profile/profile.component';
import { RegisterComponent } from './components/Authentification/register/register.component';
import { ResetPasswordRequestComponent } from './components/Authentification/reset-password-request/reset-password-request.component';
import { ResetPasswordComponent } from './components/Authentification/reset-password/reset-password.component';
import { DemandeAutoComponent } from './components/demande-auto/demande-auto.component';
import { DetailProfilComponent } from './components/detail-profil/detail-profil.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { StatisiquesComponent } from './components/Statistiques/statisiques/statisiques.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';
import { ConsultListDemandeComponent } from './consult-list-demande/consult-list-demande.component';
import { AuthGuard } from './Guard/auth.guard';



export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'Home', component: HomeComponent , canActivate: [AuthGuard]},
    /**Management**/
    { path: 'ViewEmployee/:employeeId', component: ViewEmployeeComponent ,canActivate: [AuthGuard]},
    { path: 'AddEmployee', component: AddEmployeeComponent ,canActivate: [AuthGuard]},
    { path: 'EditEmployee/:employeeId', component: EditEmployeeComponent ,canActivate: [AuthGuard]} ,
    { path: 'AddDemandeAutorisation', component: DemandeAutoComponent ,canActivate: [AuthGuard]},
    { path: 'ConsultListDemande', component: ConsultListDemandeComponent ,canActivate: [AuthGuard]},
    /**Adminstration**/
    { path: 'Pages', component: PagesComponent ,canActivate: [AuthGuard]},
    { path: 'Profils', component: ProfilComponent ,canActivate: [AuthGuard]},
    { path: 'detprofils', component: DetailProfilComponent ,canActivate: [AuthGuard]},
    { path: 'menu', component: MenuComponent },
    /**Authentification**/
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'user', component: BoardUserComponent },
    { path: 'admin', component: BoardAdminComponent },

    /*rest passwd */
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'reset-password-request', component: ResetPasswordRequestComponent },
    { path: 'Trace-operation', component: TraceTableComponent ,canActivate: [AuthGuard]},
    { path: 'Trace-cnx', component: ConnectionTraceComponent ,canActivate: [AuthGuard]},
    
     /*statistiques */
    { path: 'statistiques', component: StatisiquesComponent ,canActivate: [AuthGuard]}
  ];

  

  
