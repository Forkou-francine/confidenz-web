import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { DocumentsComponent } from './documents/documents.component';
import { NavComponent } from './nav/nav.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { ModalComponent } from './modal/modal.component';
import { ProfileComponent } from './profile/profile.component'


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'nav', component: NavComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'sidenav', component: SidenavComponent },
  { path: 'profile', component: ProfileComponent }

]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    DocumentsComponent,
    NavComponent,
    SidenavComponent,
    FooterComponent,
    ModalComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
