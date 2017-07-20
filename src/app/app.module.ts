import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; 
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'; 
import { AppComponent }  from './app.component';
import { PageNotFound } from './component/notfound.component';
import { HomeComponent } from './component/home.component';
import { HeaderComponent } from './component/header.component';
import { HotelsComponent } from './component/hotel.component';
import { AboutComponent } from './component/about.component';
import { ContactComponent } from './component/contact.component';
import { FooterComponent } from './component/footer.component';
import { HotelInfoComponent } from './component/hotelinfo.component';
import { LoginComponent } from './component/login.component';
import { AdminHomeComponent } from './component/adminhome.component'
import { DashboardComponent } from './component/dashboard.component'
import { TopComponent } from './component/top.component'
import { SidebarComponent } from './component/sidebar.component'
import { CityComponent } from './component/city.component';
import { TestimonialComponent } from './component/testimonials.component';
import { AmentitiesComponent } from './component/amentities.component';
import { AdminContactComponent } from './component/admincontact.component';
import { AdminFaqComponent } from './component/adminfaq.component';
import { FaqComponent } from './component/faq.component';
import {CKEditorModule} from 'ng2-ckeditor';
import { SocialComponent } from './component/social.component';
import { WebPagesComponent } from './component/webpages.component';
import { AdminHotelComponent } from './component/adminhotel.component';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { HotelSearchComponent } from './component/hotelsearch.component';
import { BookNowComponent } from './component/booknow.component';
import {SuccessComponent} from './component/success.component';
import {AdminBlogsComponent} from './component/adminblogs.component';
import {BlogsComponent} from './component/blogs.component';
import {BlogInfoComponent} from './component/bloginfo.component';




const appRoutes: Routes = [
    { path: '', redirectTo: "/home", pathMatch: 'full' },
    { path: 'home', component: HomeComponent }, 
    { path: 'hotels', component: HotelsComponent }, 
    { path: 'hotelsearch', component: HotelSearchComponent }, 
    { path: 'hotelinfo/:id', component: HotelInfoComponent }, 
    { path: 'about', component: AboutComponent }, 
    { path: 'cancellation', component: AboutComponent }, 
    { path: 'booknow', component: BookNowComponent },
    { path: 'blog', component: BlogsComponent },
    { path: 'bloginfo/:id', component: BlogInfoComponent },
    { path: 'success', component: SuccessComponent }, 
    { path: 'privacy', component: AboutComponent }, 
    { path: 'terms', component: AboutComponent }, 
    { path: 'faq', component: FaqComponent }, 
    { path: 'contact', component: ContactComponent },
    { path: 'admin/login', component: LoginComponent }, 
   { path: 'admin/home', component: AdminHomeComponent,children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },{
                path: 'city',
                component: CityComponent
            },{
                path: 'amentities',
                component: AmentitiesComponent
            },{
                path: 'hotels',
                component: AdminHotelComponent
            },{
                path: 'testimonials',
                component: TestimonialComponent
            },{
                path: 'social',
                component: SocialComponent
            },{
                path: 'webpages',
                component: WebPagesComponent
            },{
                path: 'contact',
                component: AdminContactComponent
            },{
                path: 'faq',
                component: AdminFaqComponent
            },{
                path: 'blogs',
                component: AdminBlogsComponent
            }
        ]},  
    { path: '**', component: PageNotFound }
]; 

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule,RouterModule.forRoot(appRoutes),CKEditorModule],
  declarations: [   AppComponent,
                    PageNotFound,
                    AdminBlogsComponent,
                    HomeComponent,
                    BlogInfoComponent,
                    HeaderComponent,
                    HotelsComponent,
                    AboutComponent,
                    ContactComponent,
                    FooterComponent,
                    CityComponent,
                    HotelInfoComponent,
                    TopComponent,
                    SidebarComponent,
                    AdminHomeComponent,
                    DashboardComponent,
                    HotelSearchComponent,
                    LoginComponent,
                    TestimonialComponent,
                    FileSelectDirective,
                    AmentitiesComponent,
                    AdminContactComponent,
                    AdminFaqComponent,
                    BlogsComponent,
                    SocialComponent,
                    FaqComponent,
                    WebPagesComponent,
                    AdminHotelComponent,
                    BookNowComponent,
                    SuccessComponent
                ],
  providers: [ CookieService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
