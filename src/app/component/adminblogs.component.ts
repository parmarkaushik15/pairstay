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
   templateUrl : 'app/view/adminblogs.html', 
   providers: [BlogsService]
})  
export class AdminBlogsComponent  {  
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
        this.initDatatable()
    }
    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
        this.makeFileRequest("http://45.55.214.190:3000/api/upload", [], this.filesToUpload).then((result) => {
            this.blog.imageurl = result[0].filename;
        }, (error) => {
            console.error(error);
        });
    }

    public updateBlog(){
      if(this.blog.name == ""){
        alert("hello")
      }else{
        this._blogs.saveBlogs(this.blog).subscribe( data => {
            this.fetchBlogs();
             $("#addNewBlog").modal('hide');
        });
      }
    }

    public removeImg(index:any){
        this.blog.imageurl = '';
    }
    
    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for(var i = 0; i < files.length; i++) {
                formData.append("uploads", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }


    public addRow(){
      this.blog = {
          _id:'',
        content: '',
        name:'',
        postdate:new Date(),
        tags:'',
        imageurl:'',
        comment:[]
      };
      $("#addNewBlog").modal();
    }

    private fetchBlogs():void {
        this._blogs.getBlogs().subscribe( data => {
          this.iblogs = data.content;
          this.reInitDatatable();
        });
    }

    public editRow(row:any){
      this.blog = row;
      $("#addNewBlog").modal();
    }
    public deleteRecord(row:any){
      this.blog = row;
      $("#confirm-delete").modal();
    }
    
    public deleteConfirm(){
      $("#confirm-delete").modal('hide');
      this._blogs.deleteBlogs(this.blog).subscribe( data => {
            this.fetchBlogs();
            this.blog = {
                _id:'',
                content: '',
                name:'',
                postdate:new Date(),
                tags:'',
                imageurl:'',
                comment:[]
            };
                
        });
    }

    
    public viewRow(row:any){
        this.blog = row;
        $("#viewBlog").modal();
    }

    private initDatatable(): void {
        let exampleId: any = $('#example');
        this.tableWidget = exampleId.DataTable({
            select: true,
            searching:true,info:true,autoWidth:false
        });
    }

    private reInitDatatable(): void {
        if (this.tableWidget) {
            this.tableWidget.destroy()
            this.tableWidget=null
        }
        setTimeout(() => this.initDatatable(),0)
    }
    public selectRow(index: number, row:any) {
        this.selectedName = "row#" + index + " " + row.name
        this.selectedRow = index;
    }

    

} 