import { Component } from '@angular/core';  
import { trigger, state, animate, transition, style } from '@angular/animations';
import { Router }  from '@angular/router'; 
import { ContactService } from '../services/contact.service';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../model/contact';
import { FileUploader } from 'ng2-file-upload';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
declare var $: any;


@Component ({  
   selector: 'pairstay-app',  
   templateUrl : 'app/view/admincontact.html', 
   providers: [ContactService]
})  
export class AdminContactComponent  {  
    public uploader:FileUploader = new FileUploader({url:'http://localhost:3000/upload'});
    icontact: any[];
    contact = new Contact('','','','','','');
    public tableWidget: any;
    public selectedName: string=""
    public selectedRow: number= -1;

   
    constructor(private _contact: ContactService){ 
       //console.log(this.Contact);
    }
    ngOnInit() : void { 
         this.fetchContact();
    } 
    ngAfterViewInit() {
        this.initDatatable()
        
    }

    public updateContact(){
      if(this.contact.name == ""){
        alert("hello")
      }else{
        this._contact.saveContact(this.contact).subscribe( data => {
            this.fetchContact();
           // this.contact = new Contact('','','','','','');
            $("#addNewContact").modal('hide');
        });
      }
    }

    public readRecord(row:any){
      this.contact._id = row._id;
      this.contact.name = row.name;
      this.contact.email = row.email;
      this.contact.contact = row.contact;
      this.contact.message = row.message;
      this.contact.read = 'Y';
      this.updateContact();
      $("#readContact").modal();
    }
    public deleteRecord(row:any){
      this.contact._id = row._id;
      this.contact.name = row.name;
      this.contact.email = row.email;
      this.contact.contact = row.contact;
      this.contact.message = row.message;
      this.contact.read = row.read;
      $("#confirm-delete").modal();
    }

    
    public deleteConfirm(){
      $("#confirm-delete").modal('hide');
      this._contact.deleteContact(this.contact).subscribe( data => {
            this.fetchContact();
            this.contact = new Contact('','','','','','');
            $("#addNewContact").modal('hide');
        });
    }

    private fetchContact():void {
        this._contact.getContact().subscribe( data => {
          this.icontact = data.content;
          this.reInitDatatable();
        });
    }

    private initDatatable(): void {
        let exampleId: any = $('#example');
        this.tableWidget = exampleId.DataTable({
            select: true,
            searching:true,info:true,autoWidth:false
        });
    }

    private reInitDatatable(): void {
        if (this.tableWidget) {
            this.tableWidget.destroy()
            this.tableWidget=null
        }
        setTimeout(() => this.initDatatable(),0)
    }
    public selectRow(index: number, row:any) {
        this.selectedName = "row#" + index + " " + row.name
        this.selectedRow = index;
    }

} 