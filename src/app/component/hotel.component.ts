import { Component } from '@angular/core';  
import { CityService } from '../services/city.service';
import { HotelService } from '../services/hotel.service';
import {CookieService} from 'angular2-cookie/core';
import { Router }  from '@angular/router';  


declare var $: any;
@Component ({  
   selector: 'evision-app',  
   templateUrl: 'app/view/hotels.html', 
   providers: [CityService, HotelService]
})  
export class HotelsComponent  { 
    icities:any[];
    ihotels:any[];
    someRange:any;
    noUiSlider:any;
    homesearch:any = {
        city:'Destination',
        checkin:'',
        checkout:'',
        noofguest:'No of Guest',
        noofrooms:'No of Rooms',
        type:''
    }
    constructor(private _city: CityService, private _hotel:HotelService,private _router: Router,private _cookieService:CookieService) {
        
    } 
    
    public data =
    [1,2,3,4,5]; 
    public sortingac = 0; 
    ngOnInit() : void { 
        if(this._cookieService.get("hotelsearch") != undefined){
         this.homesearch = JSON.parse(this._cookieService.get("hotelsearch"));
        }
         console.log(this.homesearch)
         this.fetchCity();
         this.fetchHotes();
    } 
    ngAfterViewInit() {
        $(document).ready(function () {
            $("#datepicker").datepicker();
            $("#datepickers").datepicker();
            
           
            var keypressSlider = document.getElementById('nonlinear');
            var input0 = document.getElementById('input-with-keypress-0');
            var input1 = document.getElementById('input-with-keypress-1');
            var inputs = [input0, input1];

            noUiSlider.create(keypressSlider, {
                start: [0, 10000],
                connect: true,
                range: {
                    'min': [1000],
                    '10%': 1000,
                    '50%': 25000,
                    'max': 50000
                }
            });

            keypressSlider.noUiSlider.on('update', function( values, handle ) {
                inputs[handle].value = values[handle];
            });

            $('.autoplay').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: false,
                autoplaySpeed: 2000,
                responsive: [
                    {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                    },
                    {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                    },
                    {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                    }
                ]
            });
        });
    }

    public checkRooms(){
        if(this.homesearch.noofguest == 1 ||this.homesearch.noofguest == '1' || this.homesearch.noofguest == '2' ||  this.homesearch.noofguest == 2){
            this.homesearch.noofrooms = '1';        
        }else if(this.homesearch.noofguest == 3 ||this.homesearch.noofguest == '3' || this.homesearch.noofguest == '4' ||  this.homesearch.noofguest == 4){
            this.homesearch.noofrooms = '2';        
        }else if(this.homesearch.noofguest == 5 ||this.homesearch.noofguest == '5' || this.homesearch.noofguest == '6' ||  this.homesearch.noofguest == 6){
            this.homesearch.noofrooms = '3';        
        }else if(this.homesearch.noofguest == 7 ||this.homesearch.noofguest == '7' || this.homesearch.noofguest == '8' ||  this.homesearch.noofguest == 8){
            this.homesearch.noofrooms = '4';        
        }else if(this.homesearch.noofguest == 9 ||this.homesearch.noofguest == '9' || this.homesearch.noofguest == '10' ||  this.homesearch.noofguest == 10){
            this.homesearch.noofrooms = '5';        
        }
    }
    public showTime(){
       console.log("hire");
        $(".timepanel").show();
    }

    public applyfilter(){
        this.sortingactive(0);
    }

    public setDatesOne(){
        var checkinDate = new Date($('#datepicker').val());
        var checkoutDate = new Date($('#datepicker').val());
        checkinDate.setHours(10);
        console.log(checkinDate);

        var checkinDateString = ('0' + (checkinDate.getMonth() + 1)).slice(-2) + '/' + ('0' + checkinDate.getDate()).slice(-2) + '/' +
        checkinDate.getFullYear() + ' ' + ('0' + checkinDate.getHours()).slice(-2) + 'AM';
        $('#datepicker').val(checkinDateString);
       
        //set checkout date
        checkoutDate.setHours(19);
        var hours = checkoutDate.getHours();
        var hours = (hours + 24) % 24;
        var mid = 'AM';
        if (hours == 0) { //At 00 hours we need to show 12 am
        hours = 12;
        } else if (hours > 12) {
        hours = hours % 12;
        mid = 'PM';
        }
        var checkoutDateString = '';
        checkoutDateString = ('0' + (checkoutDate.getMonth() + 1)).slice(-2) + '/' + ('0' + checkoutDate.getDate()).slice(-2) + '/' +
        checkoutDate.getFullYear() + ' ' + hours + mid;
        $('#datepickers').val(checkoutDateString);
        this.homesearch.checkin = checkinDateString;
        this.homesearch.checkout = checkoutDateString;
        this.homesearch.type="single";
        
        
        $(".timepanel").hide();
    }
    public setDatesTwo(){
        var checkinDate = new Date($('#datepicker').val());
        var checkoutDate = new Date($('#datepicker').val());
        checkoutDate.setDate(checkoutDate.getDate() + 1);
        checkinDate.setHours(20);
        var checkinDateString = '';
        checkinDateString = (checkinDate.getMonth() + 1)+ '/' + checkinDate.getDate()+ '/' +
        checkinDate.getFullYear() + ' ' + '8' + 'PM';
        $('#datepicker').val(checkinDateString);
        //set checkout date
        checkoutDate.setHours(8);
        var checkoutDateString = '';
        //javascript months are zero indexed , so you need to add one to the month, but dates are 1 indexed
        checkoutDateString = (checkoutDate.getMonth() + 1)+ '/' + checkoutDate.getDate() + '/' +
        checkoutDate.getFullYear() + ' ' + '8' + 'AM';
        $('#datepickers').val(checkoutDateString);
        this.homesearch.checkin = checkinDateString;
        this.homesearch.checkout = checkoutDateString;
        this.homesearch.type="single";
        $(".timepanel").hide();
    }
    public setMultipleDates(){
        
        this.homesearch.checkin = $('#datepicker').val();
        $('#datepickers').datepicker('show');
        this.homesearch.type="multi";
        $(".timepanel").hide();
    }

    public sortingactive(id:any){
        this.sortingac = id
        debugger
        if(id == 1){
            this.fetchStarSortingHotels();
        }else if(id == 2){
            this.fetchPriceSortingHotels();
        }else if(id == 3){
            this.fetchLocalSortingHotels();
        }else{
            this.fetchPriceSortingHotels();
        }      
    }

    public setOutDate(){
        this.homesearch.checkout = $('#datepickers').val();
        this.homesearch.checkin = $('#datepicker').val();
        console.log(this.homesearch);
        this._cookieService.put("hotelsearch",JSON.stringify(this.homesearch));
        this._router.navigate(['/hotelsearch']); 

    }

    private fetchCity():void {
        this._city.getCity().subscribe( data => {
          this.icities = data.content;
        });
    }
    private fetchHotes():void {
        this._hotel.getHotel().subscribe( data => {
          this.ihotels = data.content;
        });
    }
    rangeValueChanged(start:any, end:any) {
        var start_el = this.getElement(start);
        var end_el = this.getElement(end);
        console.log(start_el);
        console.log(end_el);
    }
    getElement(data:any){
        if (typeof(data)=='string') {
            return document.getElementById(data);
        }
        if (typeof(data)=='object' && data instanceof Element) {
            return data;
        }
        return null;
    }

    private fetchStarSortingHotels():void {
        var price1 = parseInt($('#input-with-keypress-0').val());
        var price2 = parseInt($('#input-with-keypress-1').val());
        this._hotel.getStarSortingHotel(this.homesearch.city, price1, price2).subscribe( data => {
          this.ihotels = data.content;
        });
    }
     private fetchPriceSortingHotels():void {
        var price1 = parseInt($('#input-with-keypress-0').val());
        var price2 = parseInt($('#input-with-keypress-1').val());
        this._hotel.getPriceSortingHotel(this.homesearch.city, price1, price2).subscribe( data => {
          this.ihotels = data.content;
        });
    }
     private fetchLocalSortingHotels():void {
        var price1 = parseInt($('#input-with-keypress-0').val());
        var price2 = parseInt($('#input-with-keypress-1').val());
        this._hotel.getLocalSortingHotel(this.homesearch.city, price1, price2).subscribe( data => {
          this.ihotels = data.content;
        });
    }
} 
