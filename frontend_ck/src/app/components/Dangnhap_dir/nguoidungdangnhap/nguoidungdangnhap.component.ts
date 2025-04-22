import { Component } from '@angular/core';
import { ServiceService } from 'src/app/combination services/service.service';
import { Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-nguoidungdangnhap',
  templateUrl: './nguoidungdangnhap.component.html',
  styleUrls: ['./nguoidungdangnhap.component.scss'],
})
export class NguoidungdangnhapComponent {
  user = { tendangnhap: '', matkhau: '' };
  loainguoidung: string | null = null;
  userId: string | null = null;
  isBubbleVisible: boolean = false;

  constructor(private authService: ServiceService, private router: Router) {}

  onLogin() {
    this.authService.login(this.user).subscribe({
      next: (user: any) => {
        this.userId = user?.id;
        if (this.userId) {
          this.loadUserID();
        }
      },
      error: () => alert('Sai tên đăng nhập hoặc mật khẩu!'),
    });
  }

  // Tải thông tin chi tiết của người dùng
  loadUserID() {
    if (!this.userId) return;
    this.authService.getNguoiDung(this.userId).subscribe({
      next: (data) => {
        this.loainguoidung = data.loainguoidung; // Lấy loại người dùng từ API

        if (this.loainguoidung === 'sinhvien') {
          alert(
            `Đăng nhập thành công với tài khoản có loại người dùng = ${this.loainguoidung} và id = ${this.userId}`
          );
          this.router.navigate(['/home-sinhvien']);
        } else {
          alert(
            `Đăng nhập thành công với tài khoản có loại người dùng = ${this.loainguoidung} và id = ${this.userId}`
          );
          this.router.navigate(['/home-nhatuyendung']);
        }
      },
      error: () => alert('Không thể tải thông tin người dùng!'),
    });
  }
  toggleBubble() {
    this.isBubbleVisible = !this.isBubbleVisible;
  }
}
