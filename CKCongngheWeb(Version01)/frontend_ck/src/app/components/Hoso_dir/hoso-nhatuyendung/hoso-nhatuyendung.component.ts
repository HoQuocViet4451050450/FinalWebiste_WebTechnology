import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/combination services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-hoso-nhatuyendung',
  templateUrl: './hoso-nhatuyendung.component.html',
  styleUrls: ['./hoso-nhatuyendung.component.scss'],
})
export class HosoNhatuyendungComponent implements OnInit {
  userProfile: any = {}; // Hồ sơ nhà tuyển dụng
  isEditMode: boolean = false; // Chế độ chỉnh sửa
  loading: boolean = false; // Tải dữ liệu

  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  // Lấy hồ sơ nhà tuyển dụng
  getUserProfile(): void {
    this.loading = true;
    this.service.getEmployerProfile().subscribe(
      (data) => {
        this.userProfile = data;
        this.loading = false;
      },
      (error) => {
        console.error('Lỗi khi lấy hồ sơ nhà tuyển dụng:', error);
        this.loading = false;
      }
    );
  }

  // Chuyển sang chế độ chỉnh sửa
  enableEditMode(): void {
    this.isEditMode = true;
  }

  // Cập nhật thông tin hồ sơ nhà tuyển dụng
  updateUserProfile(): void {
    this.loading = true;
    this.service.updateEmployerProfile(this.userProfile).subscribe(
      (data) => {
        this.isEditMode = false;
        this.loading = false;
        alert('Cập nhật thành công!');
      },
      (error) => {
        console.error('Lỗi khi cập nhật hồ sơ nhà tuyển dụng:', error);
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
