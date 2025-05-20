import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/combination services/service.service';
import { Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-home-nhatuyendung',
  templateUrl: './home-nhatuyendung.component.html',
  styleUrls: ['./home-nhatuyendung.component.scss'],
})
export class HomeNhatuyendungComponent implements OnInit {
  posts: any[] = [];
  editMode: boolean = false;
hoten: string = '';
  post = {
    id: 0,
    tieude: '',
    motacongviec: '',
    yeucaucongviec: '',
    quyenloi: '',
    mucluong: null,
    vitrivieclam: '',
    thongtinlienhe: '',
    hannophoso: '',
    yeucauvehoso: '',
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
    this.authService.getTuyenDungPosts().subscribe(
      (data) => (this.posts = data),
      (error) =>
        console.error('Lỗi khi tải danh sách bài đăng tuyển dụng', error)
    );
  }

  createPost() {
    if (!this.post.tieude || !this.post.motacongviec) {
      this.message = 'Tiêu đề và mô tả công việc không được để trống!';
      return;
    }

    this.authService.createTuyenDungPost(this.post).subscribe(
      () => {
        this.message = 'Bài đăng tuyển dụng đã được tạo thành công!';
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
    if (!this.post.tieude || !this.post.motacongviec) {
      this.message = 'Tiêu đề và mô tả công việc không được để trống!';
      return;
    }

    this.authService.updateTuyenDungPost(this.post).subscribe(
      () => {
        this.message = 'Bài đăng tuyển dụng đã được cập nhật thành công!';
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
      this.authService.deleteTuyenDungPost(postId).subscribe(
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
      motacongviec: '',
      yeucaucongviec: '',
      quyenloi: '',
      mucluong: null,
      vitrivieclam: '',
      thongtinlienhe: '',
      hannophoso: '',
      yeucauvehoso: '',
      hinhanh: '',
    };
    this.editMode = false;
    this.message = '';
  }
}
