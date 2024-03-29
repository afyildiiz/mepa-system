import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ProjectComponent } from './components/project/project.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { ItemComponent } from './components/item/item.component';
import { LeftbarComponent } from './components/leftbar/leftbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProjeUpdateComponent } from './components/proje-update/proje-update.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Routes, RouterModule } from '@angular/router';
import { CustomerUpdateComponent } from './components/customer-update/customer-update.component';
import { ItemUpdateComponent } from './components/item-update/item-update.component';
import { SupplierUpdateComponent } from './components/supplier-update/supplier-update.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SearchPipe } from './components/project/search.pipe';
import { ItemdataComponent } from './services/itemdata/itemdata.component';
import { ProjectSaveditemsComponent } from './components/project-saveditems/project-saveditems.component';
import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule,
} from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    ProjectComponent,
    SupplierComponent,
    ItemComponent,
    LeftbarComponent,
    HomeComponent,
    ProjeUpdateComponent,
    SearchBarComponent,
    NavbarComponent,
    CustomerUpdateComponent,
    ItemUpdateComponent,
    SupplierUpdateComponent,
    SearchPipe,
    ItemdataComponent,
    ProjectSaveditemsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    NgMultiSelectDropDownModule.forRoot(),
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule
    




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
