import { Injectable } from '@angular/core'; 
import { Http , Response, Headers } from '@angular/http'; 
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/do'; 
import { City } from '../model/city';

@Injectable() 
export class CityService { 
   private _appurl='http://45.55.214.190:3000/api/'; 
 //  private _appurl='http://localhost:3000/api/'; 
    
   constructor(private _http: Http){} 
   getCity(){ 
        return this._http.get(this._appurl+"city").map(data => {
            data.json();
            console.log(data.json());
            return data.json();
        }); 
   } 
   public saveCity(_city: any){
        const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"city/createorupdate", JSON.stringify(_city),{ headers: headers }).map(data => {
            data.json();
            return data.json();
        }); 
   }
   public deleteCity(_city: any){
        const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"city/delete", JSON.stringify({'id':_city._id}),{ headers: headers }).map(data => {
            data.json();
            return data.json();
        }); 
   }


   private handleError(error: Response) { 
      console.error(error); 
      return Observable.throw(error.json().error()); 
   } 
} 