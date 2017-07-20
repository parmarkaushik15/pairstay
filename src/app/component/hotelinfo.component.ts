import { Pipe,Component,PipeTransform } from '@angular/core';  
import { Router,ActivatedRoute } from '@angular/router';
import { HotelService } from '../services/hotel.service';
import { Hotel } from '../model/hotel';
import { AmentitiesService } from '../services/amentities.service';
import { DomSanitizer} from '@angular/platform-browser';
import {CookieService} from 'angular2-cookie/core';

declare var $: any;

@Pipe({ name: 'safeUrl' })
@Component ({  
   selector: 'evision-app',  
   templateUrl: 'app/view/hotelinfo.html', 
    providers: [HotelService, AmentitiesService]
})  
export class HotelInfoComponent implements PipeTransform { 
    private hotelid:any;
    amenitiesdata:any[];
    iamentities:any[];
    tax:number= 0.17;
    amount:number = 0;
    homesearch:any = {
        city:'Destination',
        checkin:'',
        checkout:'',
        noofguest:'No of Guest',
        noofrooms:'No of Rooms',
        type:''
    }
    public data =
    [0,1,2,3,4,5,6,7,8,10];
    hotel: Hotel =  {
                _id:'',
                hotelId: '',
                hotelName: '',
                email: '',
                city: '',
                addressOne: '',
                addressTwo: '',
                islocal:false,
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
                space: {
                    checkIn: '',
                    checkOut: '',
                }
            };
    
    bookHotel:any = {
        hotelid:this.hotel._id,
        hotelname: this.hotel.hotelName,
        address:this.hotel.addressOne+""+this.hotel.addressTwo,
        city:this.homesearch.city,
        checkin:this.homesearch.checkin,
        checkout:this.homesearch.checkout,
        noofguest:this.homesearch.noofguest,
        noofrooms:this.homesearch.noofrooms,
        type:this.homesearch.type,
        amount:this.amount,
        tax:this.amount*this.tax,
        totalamount:(this.amount + (this.amount * this.tax)),
        fullname:'',
        email:'',
        contact:'',
        purpose:'Hotel Booking',
        bookingdate:new Date().getTime()
    }
    constructor(private _router:Router, private _cookieService:CookieService, private sanitizer: DomSanitizer, private route: ActivatedRoute, private _hotel:HotelService,  private _amentities: AmentitiesService) {
        
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
        this.bindPrice();
        
    }
    public showTime(){
       console.log("hire");
        $(".timepanel").show();
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
        this.bindPrice();
        
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
        this.bindPrice();
        $(".timepanel").hide();
    }
    
    public setMultipleDates(){
        $('#datepickers').datepicker('show');
        this.homesearch.type="multi";
        this.bindPrice();
        $(".timepanel").hide();
    }

    public bindPrice(){

        if(this.homesearch.type == 'single'){
            this.amount = this.hotel.price * parseInt(this.homesearch.noofrooms); 
        }else{
            var checkin = new Date(this.homesearch.checkin).getTime();
            var checkout = new Date(this.homesearch.checkout).getTime();
            var difference = checkout - checkin
            var days =  difference / 1000 * 60 * 60 * 24
            this.amount = this.hotel.price * parseInt(this.homesearch.noofrooms) * days; 
        }
        console.log(this.amount);
    }
    transform(url: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    ngOnInit() {
         if(this._cookieService.get("hotelsearch") != undefined){
         this.homesearch = JSON.parse(this._cookieService.get("hotelsearch"));
         
        }
      this.hotelid = this.route.params.subscribe(params => {
        let id = params['id'];
         console.log(id);
         this.fetchHotelInfo(id);
         
      });
     
    }
    ngOnDestroy() {
        this.hotelid.unsubscribe();
    }
    public bookNow(){
        this.homesearch.checkout = $('#datepickers').val();
        this.homesearch.checkin = $('#datepicker').val();
        this.bindPrice()
        this.bookHotel= {
            hotelid:this.hotel._id,
            hotelname: this.hotel.hotelName,
            address:this.hotel.addressOne+""+this.hotel.addressTwo,
            city:this.homesearch.city,
            checkin:this.homesearch.checkin,
            checkout:this.homesearch.checkout,
            noofguest:this.homesearch.noofguest,
            noofrooms:this.homesearch.noofrooms,
            type:this.homesearch.type,
            amount:this.amount,
            tax:this.amount*this.tax,
            totalamount:(this.amount + (this.amount * this.tax)),
            fullname:'',
            email:'',
            contact:'',
            purpose:'Hotel Booking',
            bookingdate:new Date().getTime()
        }
        this._cookieService.remove("hotelsearch");
        this._cookieService.put("bookdata",JSON.stringify(this.bookHotel));
        this._router.navigate(['/booknow']); 

    }
    fetchHotelInfo(id:any){
        this._hotel.gethotelinfo(id).subscribe( data => {
            this.hotel = data.content[0];
            this.amenitiesdata = this.hotel.amentities;
            this._amentities.getAmentitiesById(this.amenitiesdata).subscribe( data => {
                this.iamentities = data.content;
                this.bindPrice();
            });
            
        });
    }
    ngAfterViewInit() {
        $(document).ready(function () {
            $("#datepicker").datepicker();
            $("#datepickers").datepicker();
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
} 