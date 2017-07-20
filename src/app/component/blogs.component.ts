import { Component } from '@angular/core';  
import { trigger, state, animate, transition, style } from '@angular/animations';
import { Router }  from '@angular/router'; 
import { BlogsService } from '../services/blogs.service';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
declare var $: any;

@Component ({  
   selector: 'pairstay-app',  
   templateUrl : 'app/view/blogs.html', 
   providers: [BlogsService]
})  
export class BlogsComponent  {  
    iblogs: any[];
    public tableWidget: any;
    public selectedName: string=""
    public selectedRow: number= -1;
    public blog:any = {
        _id:'',
        content: '',
        name:'',
        postdate:new Date(),
        tags:'',
        imageurl:'',
        comment:[]
    }
    filesToUpload: Array<File>;
   
    constructor(private _blogs: BlogsService){ 
       
    }
    ngOnInit() : void { 
         this.fetchBlogs();
    } 
    ngAfterViewInit() {
    }


    private fetchBlogs():void {
        this._blogs.getBlogs().subscribe( data => {
          this.iblogs = data.content;
        });
    }
    
    

} 