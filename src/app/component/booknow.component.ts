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
   templateUrl: 'app/view/booknow.html', 
    providers: [HotelService, AmentitiesService]
})  
export class BookNowComponent implements PipeTransform { 
    private hotelid:any;
    amenitiesdata:any[];
    iamentities:any[];
    tax:number= 0.17;
    amount:number = 0;
    homesearch:any = {
        city:'',
        checkin:'',
        checkout:'',
        noofguest:'',
        noofrooms:'',
        type:''
    }
    public data =
    [0,1,2,3,4,5,6,7,8,10];
    hotel: Hotel =  {
                _id:'',
                hotelId: '',
                hotelName: '',
                email: '',
                islocal:false,
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
                space: {
                    checkIn: '',
                    checkOut: '',
                }
            };
    
    bookHotel:any = {
        hotelid:this.hotel._id,
        hotelname: this.hotel.hotelName,
        address:this.hotel.addressOne+" "+this.hotel.addressTwo,
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
    constructor(private _router:Router, private _cookieService:CookieService, private sanitizer: DomSanitizer, private route: ActivatedRoute, private _hotel:HotelService) {        
    }
    transform(url: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    approvePayment(){
        console.log(this.bookHotel)
        
        this._hotel.makePayment(this.bookHotel).subscribe( data => {
        //   if(data.content.success == true){
               this._hotel.bookHotel(this.bookHotel).subscribe( data => {
                   this._cookieService.remove("bookdata");
                   this._router.navigate(['/success']); 
               });
          // }
        });
    }
    ngOnInit() {
        if(this._cookieService.get("bookdata") != undefined){
            this.bookHotel = JSON.parse(this._cookieService.get("bookdata")); 
            console.log(this.bookHotel);
            this.fetchHotelInfo(this.bookHotel.hotelid);        
        }
    }
    ngOnDestroy() {
    }
    fetchHotelInfo(id:any){
        this._hotel.gethotelinfo(id).subscribe( data => {
            this.hotel = data.content[0];
      /*      this.bookHotel.hotelname = this.hotel.hotelName;
            this.bookHotel.hotelid = this.hotel._id;
            this.bookHotel.address = this.hotel.addressOne+" "+this.hotel.addressTwo;
        */
        });
    }
    ngAfterViewInit() {
    }
} 