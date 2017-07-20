import { Injectable } from '@angular/core'; 
import { Http , Response, Headers } from '@angular/http'; 
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/do'; 

@Injectable() 
export class ContactService { 
   private _appurl='http://45.55.214.190:3000/api/'; 
  //private _appurl='http://localhost:3000/api/'; 
    
   constructor(private _http: Http){} 
   getContact(){ 
        return this._http.get(this._appurl+"contact").map(data => {
            data.json();
            console.log(data.json());
            return data.json();
        }); 
   } 
    getUnreadContact(){ 
        return this._http.get(this._appurl+"contact/unread").map(data => {
            data.json();
            console.log(data.json());
            return data.json();
        }); 
   } 
   
   public saveContact(_contact: any){
        const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"contact/createorupdate", JSON.stringify(_contact),{ headers: headers }).map(data => {
            data.json();
            return data.json();
        }); 
   }
   public deleteContact(_contact: any){
        const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"contact/delete", JSON.stringify({'id':_contact._id}),{ headers: headers }).map(data => {
            data.json();
            return data.json();
        }); 
   }

   private handleError(error: Response) { 
      console.error(error); 
      return Observable.throw(error.json().error()); 
   } 
} 