import { Component } from '@angular/core';  
import { trigger, state, animate, transition, style } from '@angular/animations';
import { Router }  from '@angular/router'; 
import { WebPageService } from '../services/webpages.service';
import { Observable } from 'rxjs/Observable';
import { WebPage } from '../model/webpage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
declare var $: any;


@Component ({  
   selector: 'pairstay-app',  
   templateUrl : 'app/view/adminwebpages.html', 
   providers: [WebPageService]
})  
export class WebPagesComponent  {  
    iwebpages: any[];
    webpage = new WebPage('','','','');
    public tableWidget: any;
    public selectedName: string=""
    public selectedRow: number= -1;

   
    constructor(private _webpage: WebPageService){ 
       //console.log(this.webpage);
    }
    ngOnInit() : void { 
         this.fetchWebPage();
    } 
    ngAfterViewInit() {
        this.initDatatable()
    }

    public createWebPage(){
      if(this.webpage.name == ""){
        alert("hello")
      }else{
        this._webpage.saveWebPage(this.webpage).subscribe( data => {
            this.fetchWebPage();
            this.webpage = new WebPage('','','','');
            $("#addNewWebPage").modal('hide');
        });
      }
    }

    public addRow(){
      this.webpage = new WebPage('','', '','');
      $("#addNewWebPage").modal();
    }
    public editRow(row:any){
      this.webpage._id = row._id;
      this.webpage.name = row.name;
      this.webpage.type = row.type;
      this.webpage.content = row.content;
      
      $("#addNewWebPage").modal();
    }

    
    private fetchWebPage():void {
        this._webpage.getWebPages().subscribe( data => {
          this.iwebpages = data.content;
          this.reInitDatatable();
        });
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