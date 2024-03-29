import { Component, OnInit, enableProdMode } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/customer';

import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';
import { CustomerUpdateComponent } from '../customer-update/customer-update.component';
import DataSource from 'devextreme/data/data_source';
import 'devextreme/data/odata/store'

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  dataSource: DataSource;

  collapsed = false;

  contentReady = (e:any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  customizeTooltip = (pointsInfo:any) => ({ text: `${parseInt(pointsInfo.originalValue)}%` });



  customers:Customer[]=[]

  customerForm!:FormGroup
  // customers:Customer[]=[
  //   {sirket_adi:"IDEA TEKNOLOJI",ad:"Aykut",soyad:"Güven",adres:"İstanbul,Üsküdar,Sakizgülü sk. no:15",tel:"05555555555",email:"aykutguven@gmail.com",vergi_dairesi:"Üsküdar vergi dairesi",vergi_no:333333,aciklama:"boş",yetkili:"Aykut Güven"},
  //   {sirket_adi:"JENERATORCU",ad:"fatih",soyad:"yildiz",adres:"İstanbul,beykoz,hüviyet sk. no:3",tel:"05555555555",email:"afyildiz@gmail.com",vergi_dairesi:"Beykoz vergi dairesi",vergi_no:111111,aciklama:"boş",yetkili:"Fatih Yildiz"},
  //   {sirket_adi:"KABLO SIRKETI",ad:"Hüseyin",soyad:"Tan",adres:"İstanbul,sultanbeyli,aaaaa sk. no:55",tel:"05555555555",email:"huseyintan@gmail.com",vergi_dairesi:"Sultanbeyli vergi dairesi",vergi_no:121212121,aciklama:"boş",yetkili:"Hüseyin Tan"},
  // ]
  constructor(public modal:NgbModal,private fb:FormBuilder,private task:TaskService) { 
    this.dataSource = this.task.getDataSource()

  }

  ngOnInit(): void {
    this.task.addRecentlyViewedComponent(this.constructor.name);


    this.getCustomer();

    this.customerForm=this.fb.group({
      sirket_adi:['',Validators.required],
      ad:['',Validators.required],
      soyad:['',Validators.required],
      adres:['',Validators.required],
      tel:['',Validators.required],
      email:['',Validators.required],
      vergi_dairesi:['',Validators.required],
      vergi_no:['',Validators.required],
      aciklama:['',Validators.required],
      // yetkili:['',Validators.required],
      unvan:['',Validators.required]
    })
  }
  get f(){
    return this.customerForm.controls
  }
  openCustomer(customer:any){
    this.modal.open(customer,{size:'lg',centered:true})
  }
  closeCustomer(){
    this.modal.dismissAll()
  }

  openUpdateCustomer(){
    this.modal.open(CustomerUpdateComponent,{size:'lg',centered:true})
  }

  getCustomer(){
    this.task.getCustomers().subscribe((res:any)=>{
      this.customers=res;
      console.log(res)
    })
  }
  saveCustomer(){
    if (this.customerForm.valid){
    let custom=Object.assign(this.customerForm.value);
    this.task.insertCustomers(custom).subscribe((res:any)=>{
      console.log(res)
      alert("Kaydedildi!");
      this.getCustomer()
    })
  }else{
    alert("Boşlukları doldurun!")
  }
  this.modal.dismissAll()
  }

  deleteCustomer(id:any){
    Swal.fire({
      icon: 'question',
      title: 'Kayıt Silinecek!',
      text: 'Bu proje kaydını silmek istediğinize emin misiniz?',
      showCancelButton: true,
      confirmButtonText: 'Evet',
      denyButtonText: 'Vazgeç',
    }).then((result) => {
      if (result.isConfirmed) {
        this.task.deleteCustomer(id).subscribe(res => {
          if (res == 'Success')
            Swal.fire('Proje başarıyla silindi!', '', 'success')
          else if (result.dismiss===Swal.DismissReason.cancel)
        {
            Swal.fire('Bir Hata Oluştu!', '', 'success')
        }
        this.getCustomer()

        })
      }
    })
  }
}
