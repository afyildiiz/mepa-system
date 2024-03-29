import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Supplier } from 'src/app/supplier';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';
import { SupplierUpdateComponent } from '../supplier-update/supplier-update.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  supplierForm!:FormGroup
  suppliers:Supplier[]=[]

  // suppliers:Supplier[]=[
    // {sirket_adi:"IDEA TEKNOLOJI",ad:"Bora ",soyad:"Karaali",adres:"Istanbul,Üsküdar,Sakızgülü sk. no:15",tel:"05555555555",email:"aykutguven@gmail.com",vergi_dairesi:"Üsküdar vergi dairesi",vergi_no:333333,aciklama:"boş",yetkili:"ahmet"},
    // {sirket_adi:"FATİH JENERATOR",ad:"Selim",soyad:"Yeşilyurt",adres:"Istanbul,beykoz,hüviyet sk. no:3",tel:"05555555555",email:"afyildiz@gmail.com",vergi_dairesi:"Beykoz vergi dairesi",vergi_no:111111,aciklama:"boş",yetkili:"fatih"},
    // {sirket_adi:"AHMET JENERATOR ",ad:"Yavuz",soyad:"Aydoğan",adres:"Istanbul,sultanbeyli,aaaaa sk. no:55",tel:"05555555555",email:"huseyintan@gmail.com",vergi_dairesi:"Sultanbeyli vergi dairesi",vergi_no:121212121,aciklama:"boş",yetkili:"yildiz"}
  // ]
  constructor(public modal:NgbModal,private fb:FormBuilder,private task:TaskService) { }


  ngOnInit(): void {
    this.task.addRecentlyViewedComponent(this.constructor.name);

    this.getSupplier();

    this.supplierForm=this.fb.group({
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
    return this.supplierForm.controls
  }
  openSupplier(supplier:any){
    this.modal.open(supplier,{size:'lg',centered:true})
  }

  getSupplier(){
    this.task.getSuppliers().subscribe((res:any)=>{
      this.suppliers=res
      console.log(res)
    })
  }
  saveSupplier(){
    if (this.supplierForm.valid){
    let supp=Object.assign(this.supplierForm.value);
    this.task.insertSuppliers(supp).subscribe((res:any)=>{
      alert("kaydedildi")
      this.getSupplier()
    })
  }else{
    alert("boşlukları doldurunuz!")
  }
  this.modal.dismissAll()

  }
  deleteSupplier(id:any){
    Swal.fire({
      icon: 'question',
      title: 'Kayıt Silinecek!',
      text: 'Bu tedarikçi kaydını silmek istediğinize emin misiniz?',
      showCancelButton: true,
      confirmButtonText: 'Evet',
      denyButtonText: 'Vazgeç',
    }).then((result) => {
      if (result.isConfirmed) {
        this.task.deleteSuppliers(id).subscribe(res => {
          if (res == 'Success')
            Swal.fire('Proje başarıyla silindi!', '', 'success')
          else if (result.dismiss===Swal.DismissReason.cancel)
        {
            Swal.fire('Bir Hata Oluştu!', '', 'success')
        }
        this.getSupplier()

        })
      }
    })
  }

  edit(){
    this.modal.open(SupplierUpdateComponent,{size:'lg',centered:true})
  }
}
