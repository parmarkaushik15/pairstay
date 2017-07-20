import { Component, Inject } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { DOCUMENT } from '@angular/platform-browser';
import { SocialService } from '../services/social.service';


@Component ({  
   selector: 'app-footer',  
   templateUrl: 'app/view/common/footer.html', 
   providers: [SocialService]
})  
export class FooterComponent  {  
    public current_url = '';
    isocial: any[];
    public date = {};
    public domain = '';
    constructor(public _router: Router, @Inject(DOCUMENT) private document: any, private _social: SocialService){
         this.date =  new Date(); 
    }
    ngOnInit() {
        this.current_url = this._router.url;
        this.domain = this.document.location.hostname;
        console.log(this.domain);
         this.fetchSocial();
    }
    private fetchSocial():void {
        this._social.getSocial().subscribe( data => {
          this.isocial = data.content;
        });
    }
} 