import { Injectable } from '@angular/core'; 
import { Http , Response, Headers } from '@angular/http'; 
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/do'; 

@Injectable() 
export class BlogsService { 
  private _appurl='http://45.55.214.190:3000/api/'; 
    
 // private _appurl='http://localhost:3000/api/'; 
   constructor(private _http: Http){} 
   getBlogs(){ 
        return this._http.get(this._appurl+"blogs").map(data => {
            data.json();
            console.log(data.json());
            return data.json();
        }); 
   }
   public getBlogById(_id: any){
        const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"blogs/getbyid", JSON.stringify({ids:_id}),{ headers: headers }).map(data => {
            data.json();
            return data.json();
        }); 
   }
   public saveBlogs(_Blogs: any){
        const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"blogs/createorupdate", JSON.stringify(_Blogs),{ headers: headers }).map(data => {
            data.json();
            return data.json();
        }); 
   }
   public deleteBlogs(_Blogs: any){
        const headers = new Headers({'Content-Type': 'application/json'});
       return this._http.post(this._appurl+"blogs/delete", JSON.stringify({'id':_Blogs._id}),{ headers: headers }).map(data => {
            data.json();
            return data.json();
        }); 
   }


   private handleError(error: Response) { 
      console.error(error); 
      return Observable.throw(error.json().error()); 
   } 
} 