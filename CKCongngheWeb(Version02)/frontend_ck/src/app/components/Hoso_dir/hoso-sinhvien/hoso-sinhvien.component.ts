import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/combination services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-hoso-sinhvien',
  templateUrl: './hoso-sinhvien.component.html',
  styleUrls: ['./hoso-sinhvien.component.scss'],
})
export class HosoSinhvienComponent implements OnInit {
  userProfile: any = {}; // Hồ sơ sinh viên
  isEditMode: boolean = false; // Chế độ chỉnh sửa
  loading: boolean = false; // Tải dữ liệu

  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  // Lấy hồ sơ sinh viên
  getUserProfile(): void {
    this.loading = true;
    this.service.getStudentProfile().subscribe(
      (data) => {
        this.userProfile = data;
        this.loading = false;
      },
      (error) => {
        console.error('Lỗi khi lấy hồ sơ sinh viên:', error);
        this.loading = false;
      }
    );
  }

  // Chuyển sang chế độ chỉnh sửa
  enableEditMode(): void {
    this.isEditMode = true;
  }

  // Cập nhật thông tin hồ sơ sinh viên
  updateUserProfile(): void {
    this.loading = true;
    this.service.updateStudentProfile(this.userProfile).subscribe(
      (data) => {
        this.isEditMode = false;
        this.loading = false;
        alert('Cập nhật thành công!');
      },
      (error) => {
        console.error('Lỗi khi cập nhật hồ sơ sinh viên:', error);
        this.loading = false;
      }
    );
  }

  // Hủy chế độ chỉnh sửa
  cancelEditMode(): void {
    this.isEditMode = false;
    this.getUserProfile(); // Lấy lại thông tin hồ sơ ban đầu
  }
}
