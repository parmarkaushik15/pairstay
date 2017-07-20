import { Component } from '@angular/core';  
import { trigger, state, animate, transition, style } from '@angular/animations';
import { Router }  from '@angular/router'; 
import { FaqService } from '../services/faq.service';
import { Observable } from 'rxjs/Observable';
import { Faq } from '../model/faq';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
declare var $: any;


@Component ({  
   selector: 'pairstay-app',  
   templateUrl : 'app/view/faqs.html', 
   providers: [FaqService]
})  
export class FaqComponent  {  
    ifaq: any[];
    faq = new Faq('','','');
    public tableWidget: any;
    public selectedName: string=""
    public selectedRow: number= -1;

   
    constructor(private _faq: FaqService){ 
       
    }
    ngOnInit() : void { 
         this.fetchfaq();
    } 
    private fetchfaq():void {
        this._faq.getFaq().subscribe( data => {
          this.ifaq = data.content;
        });
    }

} 