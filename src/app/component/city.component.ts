import { Component } from '@angular/core';  
import { trigger, state, animate, transition, style } from '@angular/animations';
import { Router }  from '@angular/router'; 
import { CityService } from '../services/city.service';
import { Observable } from 'rxjs/Observable';
import { City } from '../model/city';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
declare var $: any;


@Component ({  
   selector: 'pairstay-app',  
   templateUrl : 'app/view/admincity.html', 
   providers: [CityService]
})  
export class CityComponent  {  
    icities: any[];
    city = new City('','');
    public tableWidget: any;
    public selectedName: string=""
    public selectedRow: number= -1;

   
    constructor(private _city: CityService){ 
       //console.log(this.city);
    }
    ngOnInit() : void { 
         this.fetchCity();
    } 
    ngAfterViewInit() {
        this.initDatatable()
    }

    public createNewCity(){
      if(this.city.name == ""){
        alert("hello")
      }else{
        this._city.saveCity(this.city).subscribe( data => {
            this.fetchCity();
            this.city = new City('','');
            $("#addNewCity").modal('hide');
        });
      }
    }

    public addRow(){
      this.city = new City('','');
      $("#addNewCity").modal();
    }
    public editRow(row:any){
      this.city._id = row._id;
      this.city.name = row.name;
      $("#addNewCity").modal();
    }
    public deleteRecord(row:any){
      this.city._id = row._id;
      this.city.name = row.name;
      $("#confirm-delete").modal();
    }

    
    public deleteConfirm(){
      $("#confirm-delete").modal('hide');
      this._city.deleteCity(this.city).subscribe( data => {
            this.fetchCity();
            this.city = new City('','');
            $("#addNewCity").modal('hide');
        });
    }

    

    private fetchCity():void {
        this._city.getCity().subscribe( data => {
          this.icities = data.content;
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