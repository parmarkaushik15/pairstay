import { Injectable } from '@angular/core'; 
import { Http , Response, Headers } from '@angular/http'; 
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/do'; 

@Injectable() 
export class SocialService { 
  private _appurl='http://45.55.214.190:3000/api/'; 
    
 // private _appurl='http://localhost:3000/api/'; 
   constructor(private _http: Http){} 
   getSocial(){ 
        return this._http.get(this._appurl+"social").map(data => {
            data.json();
            console.log(data.json());
            return data.json();
        }); 
   } 
   public saveSocial(_social: any){
        const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"social/createorupdate", JSON.stringify(_social),{ headers: headers }).map(data => {
            data.json();
            return data.json();
        }); 
   }
   public deleteSocial(_social: any){
        const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"social/delete", JSON.stringify({'id':_social._id}),{ headers: headers }).map(data => {
            data.json();
            return data.json();
        }); 
   }


   private handleError(error: Response) { 
      console.error(error); 
      return Observable.throw(error.json().error()); 
   } 
} 