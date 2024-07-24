import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { PagesComponent } from './components/Adminstration/pages/pages.component';
import { ProfilComponent } from './components/Adminstration/profil/profil.component';
import { DemandeAutoComponent } from './components/demande-auto/demande-auto.component';
import { DetailProfilComponent } from './components/detail-profil/detail-profil.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';
import { ConsultListDemandeComponent } from './consult-list-demande/consult-list-demande.component';



export const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full'},
    { path: 'Home', component: HomeComponent },
    { path: 'ViewEmployee/:employeeId', component: ViewEmployeeComponent },
    { path: 'AddEmployee', component: AddEmployeeComponent },
    { path: 'EditEmployee/:employeeId', component: EditEmployeeComponent } ,
    { path: 'AddDemandeAutorisation', component: DemandeAutoComponent },
    { path: 'ConsultListDemande', component: ConsultListDemandeComponent },
    { path: 'Pages', component: PagesComponent },
    { path: 'Profils', component: ProfilComponent },
    { path: 'detprofils', component: DetailProfilComponent },
    { path: 'menu', component: MenuComponent }
  ];

  

  
