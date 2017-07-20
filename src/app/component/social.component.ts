import { Component } from '@angular/core';  
import { trigger, state, animate, transition, style } from '@angular/animations';
import { Router }  from '@angular/router'; 
import { SocialService } from '../services/social.service';
import { Observable } from 'rxjs/Observable';
import { Social } from '../model/social';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
declare var $: any;


@Component ({  
   selector: 'pairstay-app',  
   templateUrl : 'app/view/adminsocial.html', 
   providers: [SocialService]
})  
export class SocialComponent  {  
    isocial: any[];
    sociallist = [{
        name:"Facebook",
        icon:"fa-facebook"
    },{
        name:"Twitter",
        icon:"fa-twitter"
    },{
        name:"Google",
        icon:"fa-google-plus"
    },{
        name:"Youtube",
        icon:"fa-youtube"
    },{
        name:"Tumblr",
        icon:"fa-tumblr"
    },{
        name:"Skype",
        icon:"fa-skype"
    },{
        name:"Instagram",
        icon:"fa-instagram"
    }];
    social = new Social('','','','');
    public tableWidget: any;
    public selectedName: string=""
    public selectedRow: number= -1;
    public i:number = 0;
   
    constructor(private _social: SocialService){ 
       //console.log(this.social);
    }
    ngOnInit() : void { 
         this.fetchSocial();
    } 
    ngAfterViewInit() {
        this.initDatatable()
    }

    public createNewSocial(){
      if(this.social.name == ""){
        alert("hello")
      }else{
        for(this.i=0; this.i<this.sociallist.length;this.i++){
            if(this.social.name == this.sociallist[this.i].name){
                this.social.icon = this.sociallist[this.i].icon;
            }
        }
        this._social.saveSocial(this.social).subscribe( data => {
            this.fetchSocial();
            this.social = new Social('','','','');
            $("#addNewSocial").modal('hide');
        });
      }
    }

    public addRow(){
      this.social = new Social('','', '','');
      $("#addNewSocial").modal();
    }
    public editRow(row:any){
      this.social._id = row._id;
      this.social.name = row.name;
      this.social.icon = row.icon;
      this.social.link = row.link;
      
      $("#addNewSocial").modal();
    }
    public deleteRecord(row:any){
      this.social._id = row._id;
      this.social.name = row.name;
      this.social.icon = row.icon;
      this.social.link = row.link;
      
      $("#confirm-delete").modal();
    }

    
    public deleteConfirm(){
      $("#confirm-delete").modal('hide');
      this._social.deleteSocial(this.social).subscribe( data => {
            this.fetchSocial();
            this.social = new Social('','','','');
            $("#addNewSocial").modal('hide');
        });
    }

    

    private fetchSocial():void {
        this._social.getSocial().subscribe( data => {
          this.isocial = data.content;
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