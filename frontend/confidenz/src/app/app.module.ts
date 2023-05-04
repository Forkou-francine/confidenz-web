import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { NavComponent } from './components/nav/nav.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DetailsComponent } from './components/details/details.component';
import { MyDocumentsComponent } from './components/my-documents/my-documents.component';
import { NotificationsComponent } from './components/notifications/notifications.component'


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'nav', component: NavComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'sidenav', component: SidenavComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'my-documents', component: MyDocumentsComponent },
  { path: 'notifications', component: NotificationsComponent }




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
    ProfileComponent,
    DetailsComponent,
    MyDocumentsComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports:[
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
