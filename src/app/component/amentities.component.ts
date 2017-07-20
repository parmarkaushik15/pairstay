import { Component } from '@angular/core';  
import { trigger, state, animate, transition, style } from '@angular/animations';
import { Router }  from '@angular/router'; 
import { AmentitiesService } from '../services/amentities.service';
import { Observable } from 'rxjs/Observable';
import { Amentities } from '../model/amentities';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
declare var $: any;


@Component ({  
   selector: 'pairstay-app',  
   templateUrl : 'app/view/adminamentities.html', 
   providers: [AmentitiesService]
})  
export class AmentitiesComponent  {  
    iamentities: any[];
    amentities = new Amentities('','','');
    public tableWidget: any;
    public selectedName: string=""
    public selectedRow: number= -1;

   
    constructor(private _amentities: AmentitiesService){ 
       //console.log(this.amentities);
    }
    ngOnInit() : void { 
         this.fetchamentities();
    } 
    ngAfterViewInit() {
        this.initDatatable()
    }

    public createNewamentities(){
      if(this.amentities.name == ""){
        alert("Please enter name")
      }else if(this.amentities.icon == ""){
        alert("Please enter icon")
      }else{
        this._amentities.saveAmentities(this.amentities).subscribe( data => {
            this.fetchamentities();
            this.amentities = new Amentities('','', '');
            $("#addNewAmentities").modal('hide');
        });
      }
    }

    public addRow(){
      this.amentities = new Amentities('','','');
      $("#addNewAmentities").modal();
    }
    public editRow(row:any){
      this.amentities._id = row._id;
      this.amentities.name = row.name;
      this.amentities.icon = row.icon;
      $("#addNewAmentities").modal();
    }
    public deleteRecord(row:any){
      this.amentities._id = row._id;
      this.amentities.name = row.name;
      this.amentities.icon = row.icon;
      $("#confirm-delete").modal();
    }

    
    public deleteConfirm(){
      $("#confirm-delete").modal('hide');
      this._amentities.deleteAmentities(this.amentities).subscribe( data => {
            this.fetchamentities();
            this.amentities = new Amentities('','','');
            $("#addNewamentities").modal('hide');
        });
    }

    

    private fetchamentities():void {
        this._amentities.getAmentities().subscribe( data => {
          this.iamentities = data.content;
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