import { Component } from '@angular/core'; 
import { Router } from '@angular/router'; 
 

@Component ({  
   selector: 'app-header',  
   templateUrl: 'app/view/common/header.html', 
})  
export class HeaderComponent  {  
    public current_url = '';
    constructor(public _router: Router){}
    ngOnInit() {
        this.current_url = this._router.url;
    }
} 