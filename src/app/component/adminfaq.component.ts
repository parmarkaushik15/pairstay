import { Component } from '@angular/core';  
import { trigger, state, animate, transition, style } from '@angular/animations';
import { Router }  from '@angular/router'; 
import { FaqService } from '../services/faq.service';
import { Observable } from 'rxjs/Observable';
import { Faq } from '../model/faq';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
declare var $: any;


@Component ({  
   selector: 'pairstay-app',  
   templateUrl : 'app/view/adminfaqs.html', 
   providers: [FaqService]
})  
export class AdminFaqComponent  {  
    ifaq: any[];
    faq = new Faq('','','');
    public tableWidget: any;
    public selectedName: string=""
    public selectedRow: number= -1;

   
    constructor(private _faq: FaqService){ 
       //console.log(this.testimonial);
    }
    ngOnInit() : void { 
         this.fetchfaq();
    } 
    ngAfterViewInit() {
        this.initDatatable()
    }

    public createNewFaq(){
      if(this.faq.question == ""){
        alert("hello")
      }else{
        this._faq.saveFaq(this.faq).subscribe( data => {
            this.fetchfaq();
            this.faq = new Faq('','','');
            $("#addNewfaq").modal('hide');
        });
      }
    }

    public addRow(){
      this.faq = new Faq('','','');
      $("#addNewfaq").modal();
    }
    public editRow(row:any){
      this.faq._id = row._id;
      this.faq.question = row.question;
      this.faq.answer = row.answer;     
      $("#addNewfaq").modal();
    }
    public deleteRecord(row:any){
      this.faq._id = row._id;
      this.faq.question = row.question;
      this.faq.answer = row.answer;
      $("#confirm-delete").modal();
    }

    
    public deleteConfirm(){
      $("#confirm-delete").modal('hide');
      this._faq.deleteFaq(this.faq).subscribe( data => {
            this.fetchfaq();
            this.faq = new Faq('','','');
            $("#addNewfaq").modal('hide');
        });
    }

    

    private fetchfaq():void {
        this._faq.getFaq().subscribe( data => {
          this.ifaq = data.content;
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