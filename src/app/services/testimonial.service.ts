import { Injectable } from '@angular/core'; 
import { Http , Response, Headers } from '@angular/http'; 
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/do'; 
import { Testimonial } from '../model/testimonial';

@Injectable() 
export class TestimonialService { 
   private _appurl='http://45.55.214.190:3000/api/'; 
    
 // private _appurl='http://localhost:3000/api/'; 
   constructor(private _http: Http){} 
   getTestimonial(){ 
        return this._http.get(this._appurl+"testimonial").map(data => {
            data.json();
            console.log(data.json());
            return data.json();
        }); 
   } 
   public saveTestimonial(_testimonial: any){
        const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"testimonial/createorupdate", JSON.stringify(_testimonial),{ headers: headers }).map(data => {
            data.json();
            return data.json();
        }); 
   }
   public deleteTestimonial(_testimonial: any){
        const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"testimonial/delete", JSON.stringify({'id':_testimonial._id}),{ headers: headers }).map(data => {
            data.json();
            return data.json();
        }); 
   }


   private handleError(error: Response) { 
      console.error(error); 
      return Observable.throw(error.json().error()); 
   } 
} 