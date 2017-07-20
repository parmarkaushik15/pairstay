import { Component } from '@angular/core';  
import { trigger, state, animate, transition, style } from '@angular/animations';
import { Router }  from '@angular/router'; 
import { ContactService } from '../services/contact.service';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../model/contact';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
declare var $: any;


@Component ({  
   selector: 'pairstay-app',  
   templateUrl : 'app/view/contact.html', 
   providers: [ContactService]
})  
export class ContactComponent  {  
    contact = new Contact('','','','','','');
    public tableWidget: any;
    public selectedName: string=""
    public message: string=""
    public selectedRow: number= -1;
    constructor(private _contact: ContactService){ 
       //console.log(this.Contact);
    }
    ngOnInit() : void { 
       
    } 
    ngAfterViewInit() {
        $(".alert").fadeTo(2000, 500).slideUp(500, function(){
            $(".alert").slideUp(500);
        });
    }

    public createContact(){
      if(this.contact.name == ""){
        alert("hello")
      }else{
        this.contact.read = 'N';
        this._contact.saveContact(this.contact).subscribe( data => {
            this.message = "Thanks for contact."
            this.contact = new Contact('','','','','','');
        });
      }
    }

} 