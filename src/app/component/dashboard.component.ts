import { Component } from '@angular/core';  
import { Router }  from '@angular/router'; 
import { ContactService } from '../services/contact.service';
import { Contact } from '../model/contact';
import { HotelService } from '../services/hotel.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
declare var $: any;
@Component ({  
   selector: 'pairstay-app',  
   templateUrl : 'app/view/dashboard.html', 
    providers: [ContactService, HotelService]
})  
export class DashboardComponent  {  
  contact = new Contact('','','','','','');
    public data =
    [{
      "name": "Anna",
      "lastName": "Konda"
    },
    {
      "name": "Wayne",
      "lastName": "Interessierts"
    }];
  public tableWidget: any;
  public tableWidget1: any;
  booking:any = {
        hotelid:'',
        hotelname: '',
        address:'',
        city:'',
        checkin:'',
        checkout:'',
        noofguest:'',
        noofrooms:'',
        type:'',
        amount:'',
        tax:'',
        totalamount:'',
        fullname:'',
        email:'',
        contact:'',
        purpose:'',
        bookingdate:new Date().getTime()
    }
  icontact: any = [];
  ihotels:any=[];
  public selectedName: string=""
  public selectedRow: number= -1;

  constructor(private _contact: ContactService, private _hotel:HotelService){ 
       //console.log(this.Contact);
    }

  ngOnInit() : void { 
        this.fetchContact();
        this.fetchBooking();
  } 
  ngAfterViewInit() {
    this.initDatatable()
    this.initDatatable1();
  }

  private initDatatable(): void {
     let exampleId: any = $('#example');
     this.tableWidget = exampleId.DataTable({
     select: true,
     searching:true,info:true,autoWidth:false
    });
  }

private initDatatable1(): void {
     let exampleId1: any = $('#example1');
     this.tableWidget1 = exampleId1.DataTable({
     select: true,
     searching:true,info:true,autoWidth:false
     });
  }

  private fetchContact():void {
      this._contact.getUnreadContact().subscribe( data => {
        this.icontact = data.content;
        this.reInitDatatable();
      });
  }
  private fetchBooking():void {
      this._hotel.gethotelbook().subscribe( data => {
        this.ihotels = data.content;
        console.log(this.ihotels);
        this.reInitDatatable1();
      });
  }
  private reInitDatatable(): void {
    if (this.tableWidget) {
      this.tableWidget.destroy()
      this.tableWidget=null
    }
    setTimeout(() => this.initDatatable(),0)
  }
  private reInitDatatable1(): void {
    if (this.tableWidget1) {
      this.tableWidget1.destroy()
      this.tableWidget1=null
    }
    setTimeout(() => this.initDatatable1(),0)
  }
  public selectRow(index: number, row:any) {
    this.selectedName = "row#" + index + " " + row.name
    this.selectedRow = index;
    console.log(this.selectedName);
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

    public viewBookingRecord(row:any){
      this.booking = row;
      console.log(this.booking);
      $("#viewBooking").modal();
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
      this.fetchContact();
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

} 