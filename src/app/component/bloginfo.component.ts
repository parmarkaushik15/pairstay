import { Component } from '@angular/core';  
import { trigger, state, animate, transition, style } from '@angular/animations';
import { Router,ActivatedRoute } from '@angular/router';
import { BlogsService } from '../services/blogs.service';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
declare var $: any;

@Component ({  
   selector: 'pairstay-app',  
   templateUrl : 'app/view/bloginfo.html', 
   providers: [BlogsService]
})  
export class BlogInfoComponent  {  
    iblogs: any[];
    blogid:any;
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
   
    constructor(private _blogs: BlogsService,private _router:Router, private route: ActivatedRoute){ 
       
    }
    ngOnInit() : void { 
        this.blogid = this.route.params.subscribe(params => {
        let id = params['id'];
         console.log(id);
         this.fetchBlogInfo(id);
         this.fetchBlogs()
      });
    } 
    ngAfterViewInit() {
    }


    private fetchBlogs():void {
        this._blogs.getBlogs().subscribe( data => {
          this.iblogs = data.content;
        });
    }
  

    private fetchBlogInfo(id:any):void {
        this._blogs.getBlogById(id).subscribe( data => {
          this.blog = data.content[0];
          console.log(data);
        });
    }
    
    

} 