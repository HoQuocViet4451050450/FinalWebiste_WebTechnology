import { EnvironmentInjector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/Menu_dir/menu-top/menu.component';
import { HomeComponent } from './components/Home_dir/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SidemenuComponent } from './components/Menu_dir/menu-left/sidemenu.component';
import { HomeNhatuyendungComponent } from './components/Home_dir/home-nhatuyendung/home-nhatuyendung.component';
import { HomeSinhvienComponent } from './components/Home_dir/home-sinhvien/home-sinhvien.component';
import { NguoidungdangkyComponent } from './components/Dangky_dir/nguoidungdangky/nguoidungdangky.component';
import { NguoidungdangnhapComponent } from './components/Dangnhap_dir/nguoidungdangnhap/nguoidungdangnhap.component';
import { MenuSinhvienComponent } from './components/Menu_dir/menu-sinhvien/menu-sinhvien.component';
import { MenuNhatuyendungComponent } from './components/Menu_dir/menu-nhatuyendung/menu-nhatuyendung.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ChitietNguoidungComponent } from './components/Chitiet_nguoidung_dir/chitiet-nguoidung/chitiet-nguoidung.component';
import { HosoSinhvienComponent } from './components/Hoso_dir/hoso-sinhvien/hoso-sinhvien.component';
import { HosoNhatuyendungComponent } from './components/Hoso_dir/hoso-nhatuyendung/hoso-nhatuyendung.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    SidemenuComponent,
    HomeNhatuyendungComponent,
    HomeSinhvienComponent,
    NguoidungdangkyComponent,
    NguoidungdangnhapComponent,
    MenuSinhvienComponent,
    MenuNhatuyendungComponent,
    ChitietNguoidungComponent,
    HosoSinhvienComponent,
    HosoNhatuyendungComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
