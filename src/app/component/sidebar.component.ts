import { Component } from '@angular/core';  
import { Router } from '@angular/router'; 


@Component ({  
   selector: 'sidebar-app',  
   templateUrl: 'app/view/common/sidebar.html', 
})  
export class SidebarComponent  {  
    public current_url = '';

    constructor(public _router: Router){}

    ngOnInit() {
        this.current_url = this._router.url;
    }
} 