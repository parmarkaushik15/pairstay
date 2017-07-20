import { Injectable } from '@angular/core'; 
import { Http , Response, Headers } from '@angular/http'; 
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/do'; 

@Injectable() 
export class AmentitiesService { 
   private _appurl='http://45.55.214.190:3000/api/'; 
    
 // private _appurl='http://localhost:3000/api/'; 
   constructor(private _http: Http){} 
   getAmentities(){ 
        return this._http.get(this._appurl+"amentities").map(data => {
            data.json();
            console.log(data.json());
            return data.json();
        }); 
   } 
   public saveAmentities(_amentities: any){
        const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"amentities/createorupdate", JSON.stringify(_amentities),{ headers: headers }).map(data => {
            data.json();
            return data.json();
        }); 
   }
   public deleteAmentities(_amentities: any){
        const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"amentities/delete", JSON.stringify({'id':_amentities._id}),{ headers: headers }).map(data => {
            data.json();
            return data.json();
        }); 
   }
   getAmentitiesById(amentities:any[]){ 
        const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"amentities/getamentitiebyid", JSON.stringify({'ids':amentities}),{ headers: headers }).map(data => {
            data.json();
            return data.json();
        }); 
   } 



   private handleError(error: Response) { 
      console.error(error); 
      return Observable.throw(error.json().error()); 
   } 
} 