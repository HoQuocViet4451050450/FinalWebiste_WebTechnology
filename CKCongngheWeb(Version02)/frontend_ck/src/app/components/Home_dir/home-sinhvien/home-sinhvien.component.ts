import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/combination services/service.service';
import { Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-home-sinhvien',
  templateUrl: './home-sinhvien.component.html',
  styleUrls: ['./home-sinhvien.component.scss'],
})
export class HomeSinhvienComponent implements OnInit {
  posts: any[] = [];
  editMode: boolean = false;

  post = {
    id: 0,
    tieude: '',
    motangan: '',
    kynangchuyenmon: '',
    kinhnghiemlamviec: '',
    trinhdohocvan: null,
    mucluongmongmuon: '',
    vitritimviec: '',
    hinhthuclamviec: '',
    thongtinlienhe: '',
    ngaybatdaulam: '',
    hinhanh: '',
  };

  message = '';

  constructor(private authService: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (user: any) => {
        if (!user?.id) {
          alert('Bạn chưa đăng nhập!');
          this.router.navigate(['/login']);
        } else {
          this.loadPosts();
        }
      },
      error: () => {
        alert('Bạn chưa đăng nhập!');
        this.router.navigate(['/login']);
      },
    });
  }

  loadPosts() {
    this.authService.getUngTuyenPosts().subscribe(
      (data) => (this.posts = data),
      (error) =>
        console.error('Lỗi khi tải danh sách bài đăng ứng tuyển', error)
    );
  }

  createPost() {
    if (!this.post.tieude || !this.post.motangan) {
      this.message = 'Tiêu đề và mô tả ngắn không được để trống!';
      return;
    }

    this.authService.createUngTuyenPost(this.post).subscribe(
      () => {
        this.message = 'Bài đăng ứng tuyển đã được tạo thành công!';
        this.resetForm();
        this.loadPosts();
      },
      () => {
        this.message = 'Lỗi khi tạo bài đăng!';
      }
    );
  }

  editPost(item: any) {
    this.post = { ...item };
    this.editMode = true;
  }

  updatePost() {
    if (!this.post.tieude || !this.post.motangan) {
      this.message = 'Tiêu đề và mô tả ngắn không được để trống!';
      return;
    }

    this.authService.updateUngTuyenPost(this.post).subscribe(
      () => {
        this.message = 'Bài đăng ứng tuyển đã được cập nhật thành công!';
        this.resetForm();
        this.loadPosts();
      },
      () => {
        this.message = 'Lỗi khi cập nhật bài đăng!';
      }
    );
  }

  deletePost(postId: string) {
    if (confirm(`Bạn có chắc chắn muốn xóa bài đăng có ID ${postId} không?`)) {
      this.authService.deleteUngTuyenPost(postId).subscribe(
        () => {
          this.message = `Bài đăng có ID ${postId} đã được xóa thành công!`;
          this.loadPosts();
        },
        (error) => {
          this.message = `Lỗi khi xóa bài đăng có ID ${postId}!`;
          console.error('Lỗi khi xóa bài đăng', error);
        }
      );
    }
  }

  resetForm() {
    this.post = {
      id: 0,
      tieude: '',
      motangan: '',
      kynangchuyenmon: '',
      kinhnghiemlamviec: '',
      trinhdohocvan: null,
      mucluongmongmuon: '',
      vitritimviec: '',
      hinhthuclamviec: '',
      thongtinlienhe: '',
      ngaybatdaulam: '',
      hinhanh: '',
    };

    this.editMode = false;
    this.message = '';
  }
}
