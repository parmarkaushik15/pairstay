import { Injectable } from '@angular/core'; 
import { Http , Response, Headers } from '@angular/http'; 
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/do'; 

@Injectable() 
export class WebPageService { 
    private _appurl='http://45.55.214.190:3000/api/'; 
    
  //  private _appurl='http://localhost:3000/api/'; 
   constructor(private _http: Http){} 
   
   getWebPages(){ 
        return this._http.get(this._appurl+"webpages").map(data => {
            data.json();
            console.log(data.json());
            return data.json();
        }); 
   } 
   public saveWebPage(_WebPage: any){
      const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"webpages/createorupdate", JSON.stringify(_WebPage),{ headers: headers }).map(data => {
            data.json();
            return data.json();
        }); 
   }
   public getWebPageByType(type:any){
       const headers = new Headers({'Content-Type': 'application/json'});
        return this._http.post(this._appurl+"webpages/pagebytype", JSON.stringify({'type':type}),{ headers: headers }).map(data => {
            data.json();
            console.log(data.json());
            return data.json();
        }); 
   } 
   public deleteWebPage(_WebPage: any){
       const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"webpages/delete", JSON.stringify({'id':_WebPage._id}),{ headers: headers }).map(data => {
            data.json();
            return data.json();
        }); 
   }


   private handleError(error: Response) { 
      console.error(error); 
      return Observable.throw(error.json().error()); 
   } 
} 