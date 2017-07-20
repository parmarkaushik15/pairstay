import { Component } from '@angular/core';  
import { trigger, state, animate, transition, style } from '@angular/animations';
import { Router }  from '@angular/router'; 
import { HotelService } from '../services/hotel.service';
import { Observable } from 'rxjs/Observable';
import { AmentitiesService } from '../services/amentities.service';
import { Hotel } from '../model/hotel';
import { CityService } from '../services/city.service';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
declare var $: any;

@Component ({  
   selector: 'pairstay-app',  
   templateUrl : 'app/view/adminhotel.html', 
   providers: [HotelService, AmentitiesService,CityService]
})  
export class AdminHotelComponent  {  
    ihotels: any[];
    icities: any[];
    amenitiesdata:Array<string>;
    iamentities:any[];
    filesToUpload: Array<File>;
    alliamentities:any[];
    hotel: Hotel =  {
                _id:'',
                hotelId: '',
                hotelName: '',
                email: '',
                city: '',
                addressOne: '',
                addressTwo: '',
                mapSource: '', star:0,
                imgfolder: [],
                lat: 0,
                lng: 0,
                price: 0,
                priceTwo: 0,
                amentities: [],
                about: '',
                policy: '',
                isfeatured:false,
                islocal:false,
                space: {
                    checkIn: '',
                    checkOut: '',
                }
            };
    public tableWidget: any;
    public selectedName: string=""
    public selectedRow: number= -1;
    public j:any;
   
    constructor(private _hotel: HotelService, private _amentities: AmentitiesService, private _city: CityService){ 
       console.log(this.hotel);
    }
    ngOnInit() : void { 
         this.fetchhotels();
         this.fetchCity();
    } 
    ngAfterViewInit() {
        this.initDatatable()
    }

    
    private fetchCity():void {
        this._city.getCity().subscribe( data => {
          this.icities = data.content;
        });
    }
    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
        this.makeFileRequest("http://45.55.214.190:3000/api/upload", [], this.filesToUpload).then((result) => {
            for(this.i= 0; this.i<this.filesToUpload.length;this.i++){
                this.hotel.imgfolder.push(result[this.i]);
            }
            console.log(this.hotel);
        }, (error) => {
            console.error(error);
        });
    }

    public removeImg(index:any){
        this.hotel.imgfolder.splice(index, 1);
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

    public createNewHotel(){
      if(this.hotel.hotelName == ""){
        alert("hello")
      }else{
        this.hotel.amentities = [];
        for(this.i =0; this.i<this.alliamentities.length;this.i++){
            if(this.alliamentities[this.i].ischecked == true){
                this.hotel.amentities.push(this.alliamentities[this.i]);
            }
        }
        console.log(this.hotel.amentities);
        console.log(this.hotel);
        
        this._hotel.saveHotel(this.hotel).subscribe( data => {
            this.fetchhotels();
            this.hotel =  {
                _id:'',
                hotelId: '',
                hotelName: '',
                email: '',
                city: '',
                islocal:false,
                addressOne: '',
                addressTwo: '',
                mapSource: '', star:0,
                imgfolder: [],
                lat: 0,
                lng: 0,
                price: 0,
                isfeatured:false,
                priceTwo: 0,
                amentities: [],
                about: '',
                policy: '',
                space: {
                    checkIn: '',
                    checkOut: '',
                }
            }
            $("#addNewHotel").modal('hide');
        });
      }
    }

    public addRow(){
        this.hotel =  {
            _id:'',
            hotelId: '',
            hotelName: '',
            email: '',
            city: '',
            addressOne: '',
            addressTwo: '',
            mapSource: '', star:0,
            isfeatured:false,
            imgfolder: [],
            lat: 0,
            lng: 0,
            price: 0,
            priceTwo: 0,
            islocal:false,
            amentities: [],
            about: '',
            policy: '',
            space: {
                checkIn: '',
                checkOut: '',
            }
        };
        for(this.i =0; this.i<this.alliamentities.length;this.i++){
            this.alliamentities[this.i].ischecked = false;
        }
    
        $("#addNewHotel").modal();
    }
    public editRow(row:any){
        for(this.i =0; this.i<this.alliamentities.length;this.i++){
            this.alliamentities[this.i].ischecked = false;
        }
    
        this.hotel =  {
            _id:row._id,
            hotelId: row.hotelId,
            hotelName: row.hotelName,
            email: row.email,
            city: row.city,
            addressOne: row.addressOne,
            addressTwo: row.addressTwo,
            mapSource: row.mapSource,
            islocal:row.islocal,
            star:row.star,
            imgfolder: row.imgfolder,
            lat: row.lat,
            isfeatured:row.isfeatured,
            lng: row.lng,
            price: row.price,
            priceTwo: row.priceTwo,
            amentities: [],
            about: row.about,
            policy: row.policy,
            space: {
                checkIn: row.space.checkIn,
                checkOut: row.space.checkOut,
            }
        };
        this.amenitiesdata = row.amentities;
       
        this._amentities.getAmentitiesById(this.amenitiesdata).subscribe( data => {
          this.iamentities = data.content;
          
          for(this.i =0; this.i<this.alliamentities.length;this.i++){
            for(this.j =0; this.j<this.iamentities.length;this.j++){
                if(this.alliamentities[this.i]._id == this.iamentities[this.j]._id){
                    this.alliamentities[this.i].ischecked = true;
                }
            }
          }
        });
        console.log(this.hotel);
        
        $("#addNewHotel").modal();
    }
    public deleteRecord(row:any){
       this.hotel =  {
            _id:row._id,
            hotelId: row.hotelId,
            hotelName: row.hotelName,
            email: row.email,
            city: row.city,
            addressOne: row.addressOne,
            addressTwo: row.addressTwo,
            mapSource: row.mapSource,
            imgfolder: row.imgfolder,
            lat: row.lat,
            islocal:row.islocal,
            isfeatured:row.isfeatured,
            lng: row.lng,
            star:row.star,
            price: row.price,
            priceTwo: row.priceTwo,
            amentities: row.amentities,
            about: row.about,
            policy: row.policy,
            space: {
                checkIn: row.space.checkIn,
                checkOut: row.space.checkOut,
            }
        };
        
      $("#confirm-delete").modal();
    }

    
    public deleteConfirm(){
      $("#confirm-delete").modal('hide');
      this._hotel.deleteHotel(this.hotel).subscribe( data => {
            this.fetchhotels();
            this.hotel =  {
                _id:'',
                hotelId: '',
                hotelName: '',
                email: '',
                city: '',
                addressOne: '',
                addressTwo: '',
                mapSource: '', star:0,
                islocal:false,
                imgfolder: [],
                lat: 0,
                lng: 0,
                isfeatured:false,
                price: 0,
                priceTwo: 0,
                amentities: [],
                about: '',
                policy: '',
                space: {
                    checkIn: '',
                    checkOut: '',
                }
            };;
            $("#addNewHotel").modal('hide');
        });
    }
    public i:number = 0;
    

    private fetchhotels():void {
        this._hotel.getHotel().subscribe( data => {
          this.ihotels = data.content;
          this.reInitDatatable();
        });
        this._amentities.getAmentities().subscribe( data => {
          this.alliamentities = data.content;
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

    public viewRow(row:any) {
        this.hotel = row
        console.log(row);
        this.amenitiesdata = row.amentities;
        console.log(this.amenitiesdata);
        this._amentities.getAmentitiesById(this.amenitiesdata).subscribe( data => {
          this.iamentities = data.content;
        });
        $("#viewhotel").modal();
    }

    

} 