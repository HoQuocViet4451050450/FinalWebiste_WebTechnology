import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/Menu_dir/menu-top/menu.component';
import { HomeComponent } from './components/Home_dir/home/home.component';
import { SidemenuComponent } from './components/Menu_dir/menu-left/sidemenu.component';
import { HomeNhatuyendungComponent } from './components/Home_dir/home-nhatuyendung/home-nhatuyendung.component';
import { HomeSinhvienComponent } from './components/Home_dir/home-sinhvien/home-sinhvien.component';
import { NguoidungdangnhapComponent } from './components/Dangnhap_dir/nguoidungdangnhap/nguoidungdangnhap.component';
import { NguoidungdangkyComponent } from './components/Dangky_dir/nguoidungdangky/nguoidungdangky.component';
import { MenuSinhvienComponent } from './components/Menu_dir/menu-sinhvien/menu-sinhvien.component';
import { MenuNhatuyendungComponent } from './components/Menu_dir/menu-nhatuyendung/menu-nhatuyendung.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  //Home
  { path: 'home', component: HomeComponent },
  { path: 'home-nhatuyendung', component: HomeNhatuyendungComponent },
  { path: 'home-sinhvien', component: HomeSinhvienComponent },

  //Menu
  { path: 'menu-left', component: SidemenuComponent },
  { path: 'menu-top', component: MenuComponent },
  { path: 'menu-sinhvien', component: MenuSinhvienComponent },
  { path: 'menu-nhatuyendung', component: MenuNhatuyendungComponent },

  //Nguoidung

  //Dangnhap
  { path: 'dangnhap', component: NguoidungdangnhapComponent },

  //Dangky
  { path: 'dangky', component: NguoidungdangkyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
