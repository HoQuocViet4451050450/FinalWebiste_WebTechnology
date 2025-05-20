import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ServiceService } from 'src/app/combination services/service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-nhatuyendung',
  templateUrl: './menu-nhatuyendung.component.html',
  styleUrls: ['./menu-nhatuyendung.component.scss'],
  animations: [
    trigger('slideInFromRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '1.4s ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class MenuNhatuyendungComponent implements OnInit {
  hoten: string = '';
  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.service.getUser().subscribe({
      next: (user: any) => {
        if (user && user.id) {
          this.loadHoTen(user.id);
        } else {
          this.hoten = 'Người dùng';
          // Bạn có thể redirect về login nếu muốn
          // this.router.navigate(['/login']);
        }
      },
      error: () => {
        this.hoten = 'Người dùng';
      },
    });
  }

  dangXuat() {
    this.service.logout().subscribe({
      next: () => {
        alert('Đăng xuất thành công!');
        this.router.navigate(['/']); // Điều hướng về trang login hoặc home
      },
      error: (err) => {
        console.error('Lỗi đăng xuất:', err);
      },
    });
  }

  loadHoTen(userId: string) {
    this.service.getChiTietNguoiDung(userId).subscribe({
      next: (data) => {
        this.hoten = data.hoten || 'Người dùng';
      },
      error: (err) => {
        console.error('Lỗi lấy chi tiết người dùng', err);
        this.hoten = 'Người dùng';
      },
    });
  }
}
