export interface Hotel {
        _id:'',
        hotelId: '',
        hotelName: '',
        email: '',
        city: '',
        addressOne: '',
        addressTwo: '',
        mapSource: '', star:0,
        imgfolder:any[],
        lat: 0,
        lng: 0,
        price: 0,
        priceTwo: 0,
        amentities: any[],
        about: '',
        policy: '',
        isfeatured:false,
        islocal:false,
        space: {
            checkIn: '',
            checkOut: '',
        }
    };