import { Injectable } from '@angular/core'; 
import { Http , Response, Headers } from '@angular/http'; 
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/do'; 

@Injectable() 
export class HotelService { 
   private _appurl='http://45.55.214.190:3000/api/'; 
    
 //  private _appurl='http://localhost:3000/api/'; 
   constructor(private _http: Http){} 
   getHotel(){ 
        return this._http.get(this._appurl+"hotel").map(data => {
            data.json();
            console.log(data.json());
            return data.json();
        }); 
   } 
    getFeaturedHotel(){ 
        return this._http.get(this._appurl+"hotel/getfeatured").map(data => {
            data.json();
            console.log(data.json());
            return data.json();
        }); 
   } 

   
    getStarSortingHotel(city:any, start:any, end:any){ 
        const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"hotel/starsort", JSON.stringify({city:city, start:start,end:end}),{ headers: headers }).map(data => {
            data.json();
            console.log(data.json());
            return data.json();
        }); 
   } 
   getCityHotel(city:any){
        const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"hotel/cityhotel", JSON.stringify({city:city}),{ headers: headers }).map(data => {
            data.json();
            console.log(data.json());
            return data.json();
        }); 
   }
   getPriceSortingHotel(city:any, start:any, end:any){ 
       const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"hotel/pricesort", JSON.stringify({city:city, start:start,end:end}),{ headers: headers }).map(data => {
            data.json();
            console.log(data.json());
            return data.json();
        }); 
   } 

   getLocalSortingHotel(city:any, start:any, end:any){ 
       const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"hotel/localsort", JSON.stringify({city:city, start:start,end:end}),{ headers: headers }).map(data => {
            data.json();
            console.log(data.json());
            return data.json();
        }); 
   } 

   public gethotelinfo(_id: any){
        const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"hotel/hotelinfo", JSON.stringify({_id:_id}),{ headers: headers }).map(data => {
            data.json();
            return data.json();
        }); 
   }
   public saveHotel(_Hotel: any){
        const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"hotel/createorupdate", JSON.stringify(_Hotel),{ headers: headers }).map(data => {
            data.json();
            return data.json();
        }); 
   }

   public makePayment(_Hotel: any){
        const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"hotel/payment", JSON.stringify(_Hotel),{ headers: headers }).map(data => {
            data.json();
            return data.json();
        }); 
   }
   public bookHotel(_Hotel: any){
        const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"hotelbook/createorupdate", JSON.stringify(_Hotel),{ headers: headers }).map(data => {
            data.json();
            return data.json();
        }); 
   }

   

    gethotelbook(){ 
        return this._http.get(this._appurl+"hotelbook").map(data => {
            data.json();
            console.log(data.json());
            return data.json();
        }); 
   } 

   
   public deleteHotel(_Hotel: any){
        const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"hotel/delete", JSON.stringify({'id':_Hotel._id}),{ headers: headers }).map(data => {
            data.json();
            return data.json();
        }); 
   }


   private handleError(error: Response) { 
      console.error(error); 
      return Observable.throw(error.json().error()); 
   } 
} 