import { Component } from '@angular/core'; 
import { WebPageService } from '../services/webpages.service';
import { WebPage } from '../model/webpage';
import { Router } from '@angular/router'; 


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
 

@Component ({  
   selector: 'evision-app',  
   templateUrl: 'app/view/webpages.html', 
   providers: [WebPageService]
})  
export class AboutComponent  { 
    current_url = "";
    webpage = new WebPage('','','','');
    constructor(private _webpage: WebPageService, public _router: Router){ 
       //console.log(this.webpage);
    } 
    ngOnInit() : void { 
         this.current_url = this._router.url;
         this.fetchWebPage(this.current_url.substring(1));
         
         console.log(this.current_url.substring(1));
    } 
    private fetchWebPage(type:any):void {
        this._webpage.getWebPageByType(type).subscribe( data => {
          this.webpage = data.content[0];        
        });
    }
} 