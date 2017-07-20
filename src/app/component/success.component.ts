import { Component } from '@angular/core';  
import { trigger, state, animate, transition, style } from '@angular/animations';
import { Router }  from '@angular/router'; 
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
declare var $: any;
@Component ({  
   selector: 'pairstay-app',  
   templateUrl : 'app/view/success.html', 
})  
export class SuccessComponent  {  
    public tableWidget: any;
    public selectedName: string=""
    public selectedRow: number= -1;
    constructor(){ 
    }
    ngOnInit() : void { 
    } 
    ngAfterViewInit() {
    }


} 