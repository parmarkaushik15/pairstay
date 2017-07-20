import { Component } from '@angular/core';  
import { trigger, state, animate, transition, style } from '@angular/animations';
import { Router }  from '@angular/router'; 
import { TestimonialService } from '../services/testimonial.service';
import { Observable } from 'rxjs/Observable';
import { Testimonial } from '../model/testimonial';
import { FileUploader } from 'ng2-file-upload';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
declare var $: any;


@Component ({  
   selector: 'pairstay-app',  
   templateUrl : 'app/view/admintestimonial.html', 
   providers: [TestimonialService]
})  
export class TestimonialComponent  {  
    public uploader:FileUploader = new FileUploader({url:'http://localhost:3000/upload'});
    itestimonial: any[];
    testimonial = new Testimonial('','','','');
    public tableWidget: any;
    public selectedName: string=""
    public selectedRow: number= -1;

   
    constructor(private _testimonial: TestimonialService){ 
       //console.log(this.testimonial);
    }
    ngOnInit() : void { 
         this.fetchtestimonial();
    } 
    ngAfterViewInit() {
        this.initDatatable()
    }

    public createNewTestimonial(){
      if(this.testimonial.testimonialName == ""){
        alert("hello")
      }else{
        this._testimonial.saveTestimonial(this.testimonial).subscribe( data => {
            this.fetchtestimonial();
            this.testimonial = new Testimonial('','','','');
            $("#addNewtestimonial").modal('hide');
        });
      }
    }

    public addRow(){
      this.testimonial = new Testimonial('','', '','');
      $("#addNewtestimonial").modal();
    }
    public editRow(row:any){
      this.testimonial._id = row._id;
      this.testimonial.testimonialName = row.testimonialName;
      this.testimonial.imageUrl = row.imageUrl;
      this.testimonial.testimonialContent = row.testimonialContent;
      
      $("#addNewtestimonial").modal();
    }
    public deleteRecord(row:any){
      this.testimonial._id = row._id;
      this.testimonial.testimonialName = row.testimonialName;
      this.testimonial.imageUrl = row.imageUrl;
      this.testimonial.testimonialContent = row.testimonialContent;
      $("#confirm-delete").modal();
    }

    
    public deleteConfirm(){
      $("#confirm-delete").modal('hide');
      this._testimonial.deleteTestimonial(this.testimonial).subscribe( data => {
            this.fetchtestimonial();
            this.testimonial = new Testimonial('','','','');
            $("#addNewtestimonial").modal('hide');
        });
    }

    

    private fetchtestimonial():void {
        this._testimonial.getTestimonial().subscribe( data => {
          this.itestimonial = data.content;
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