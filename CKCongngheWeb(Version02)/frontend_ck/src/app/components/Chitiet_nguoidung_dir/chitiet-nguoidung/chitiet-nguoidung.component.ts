import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/combination services/service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chitiet-nguoidung',
  templateUrl: './chitiet-nguoidung.component.html',
  styleUrls: ['./chitiet-nguoidung.component.scss'],
})
export class ChitietNguoidungComponent implements OnInit {
  chitietForm: FormGroup;
  userId: string = ''; // ID người dùng đang đăng nhập
  loainguoidung: string = '';

  constructor(private service: ServiceService, private fb: FormBuilder) {
    this.chitietForm = this.fb.group({
      hoten: [''],
      ngaysinh: [''],
      quequan: [''],
      sodienthoai: [''],
      cccd: [''],
      diachithuongtru: [''],
      nghenghiep: [''],
    });
  }

  ngOnInit(): void {
    const currentUser = this.service.userSubject.value;
    if (currentUser) {
      this.userId = currentUser.id; // hoặc user_id tùy theo payload token bạn giải mã ra
      this.loainguoidung = currentUser.loainguoidung;
      this.loadChiTietNguoiDung();
    }
  }

  loadChiTietNguoiDung() {
    this.service.getChiTietNguoiDung(this.userId).subscribe({
      next: (data) => {
        this.chitietForm.patchValue(data);
      },
      error: (err) => {
        console.error('❌ Lỗi khi lấy chi tiết người dùng:', err);
      },
    });
  }

  onSubmit() {
    if (this.chitietForm.valid) {
      this.service
        .updateChiTietNguoiDung(this.userId, this.chitietForm.value)
        .subscribe({
          next: (res) => {
            alert('✅ Cập nhật thông tin thành công!');
          },
          error: (err) => {
            console.error('❌ Lỗi khi cập nhật:', err);
            alert('❌ Lỗi khi cập nhật!');
          },
        });
    }
  }
}
