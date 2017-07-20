import { Component, Inject } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { DOCUMENT } from '@angular/platform-browser';
 
@Component ({  
   selector: 'pairstay-app',  
   templateUrl: 'app/view/adminhome.html', 
})  
export class AdminHomeComponent  { 
    public current_url = '';
    public date = {};
    public domain = ''; 
        constructor(public _router: Router, @Inject(DOCUMENT) private document: any){
         this.date =  new Date(); 
    }
    ngOnInit() {
        this.current_url = this._router.url;
        this.domain = this.document.location.hostname;
        console.log(this.domain);
    }
} 