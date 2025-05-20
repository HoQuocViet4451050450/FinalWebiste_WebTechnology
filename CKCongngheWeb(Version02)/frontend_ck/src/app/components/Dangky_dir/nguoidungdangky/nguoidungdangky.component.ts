import { Component } from '@angular/core';
import { ServiceService } from 'src/app/combination services/service.service';
import { Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-nguoidungdangky',
  templateUrl: './nguoidungdangky.component.html',
  styleUrls: ['./nguoidungdangky.component.scss'],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }), // trượt từ trên xuống
        animate(
          '1.2s ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class NguoidungdangkyComponent {
  user = { tendangnhap: '', email: '', matkhau: '', loainguoidung: '' }; // Thêm biến user
  repassword: string = '';
  passwordMismatch: boolean = false;
  constructor(private authService: ServiceService, private router: Router) {}

  onSubmit() {
    if (this.user.matkhau !== this.repassword) {
      this.passwordMismatch = true;
      return;
    } else {
      this.passwordMismatch = false;
      // Thực hiện logic gửi form đăng ký ở đây
      console.log('Form hợp lệ:', this.user);
      this.authService.register(this.user).subscribe({
        next: () => {
          alert('Đăng ký thành công!'), this.router.navigate(['/dangnhap']);
        },
        error: () => alert('Lỗi khi đăng ký!'),
      });
    }
  }
}
