import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private apiUrl = 'http://localhost:5026/api';
  public userSubject = new BehaviorSubject<any>(null); // Lưu trạng thái người dùng hiện tại

  constructor(private http: HttpClient) {}

  /**
   * Lấy thông tin người dùng hiện tại
   */
  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  /**
   * Đăng ký người dùng mới
   * @param user - Dữ liệu người dùng để đăng ký
   */
  register(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/auth/dangky`, user, { headers });
  }

  /**
   * Đăng nhập người dùng
   * @param user - Dữ liệu đăng nhập của người dùng
   */
  login(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post(`${this.apiUrl}/auth/dangnhap`, user, { headers })
      .pipe(
        map((response: any) => {
          localStorage.setItem('token', response.token); // Lưu token
          const decodedUser = this.decodeToken(response.token); // Giải mã token lấy thông tin
          this.userSubject.next(decodedUser); // Cập nhật trạng thái người dùng
          return decodedUser; // Trả về thông tin người dùng
        })
      );
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.apiUrl}/auth/dangxuat`, {}, { headers }).pipe(
      map((response: any) => {
        localStorage.removeItem('token'); // Xóa token localStorage
        this.userSubject.next(null); // Reset trạng thái user
        return response;
      })
    );
  }

  /**
   * Giải mã token JWT để lấy thông tin người dùng
   * @param token - Chuỗi token JWT
   */
  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  /**
   * Lấy thông tin  của một người dùng theo ID
   * @param userId - ID của người dùng
   */
  getNguoiDung(userId: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/nguoidung/laynguoidung/${userId}`
    );
  }

  /**
   * Lấy chi tiết người dùng
   * @param userId - ID người dùng
   */
  getChiTietNguoiDung(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/nguoidung/chitiet/${userId}`);
  }

  /**
   * Cập nhật chi tiết người dùng
   * @param userId - ID người dùng
   * @param data - Dữ liệu cập nhật
   */
  updateChiTietNguoiDung(userId: string, data: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/nguoidung/chitiet/${userId}`,
      data
    );
  }

  getStudentProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any>(`${this.apiUrl}/hoso/sinhvien`, { headers });
  }

  /**
   * Cập nhật thông tin hồ sơ sinh viên
   */
  updateStudentProfile(profileData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.put<any>(`${this.apiUrl}/hoso/sinhvien`, profileData, {
      headers,
    });
  }

  getEmployerProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any>(`${this.apiUrl}/hoso/nhatuyendung`, { headers });
  }

  /**
   * Cập nhật thông tin hồ sơ sinh viên
   */
  updateEmployerProfile(profileData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.put<any>(`${this.apiUrl}/hoso/nhatuyendung`, profileData, {
      headers,
    });
  }

  // Lấy danh sách bài đăng tuyển dụng
  getTuyenDungPosts(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<any[]>(`${this.apiUrl}/baidang/baidangtuyendungall`);
  }

  // Tạo bài đăng tuyển dụng mới
  createTuyenDungPost(post: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(
      `${this.apiUrl}/baidang/baidangtuyendung`,
      post,
      { headers }
    );
  }

  // Cập nhật bài đăng tuyển dụng theo ID
  updateTuyenDungPost(post: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.put<any>(
      `${this.apiUrl}/baidang/baidangtuyendung/${post.id}`,
      post,
      { headers }
    );
  }

  // Xóa bài đăng tuyển dụng theo ID
  deleteTuyenDungPost(postId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<any>(
      `${this.apiUrl}/baidang/baidangtuyendung/${postId}`,
      { headers }
    );
  }

  // Lấy danh sách bài đăng ứng tuyển
  getUngTuyenPosts(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<any[]>(`${this.apiUrl}/baidang/baidangungtuyenall`);
  }

  // Tạo bài đăng ứng tuyển mới
  createUngTuyenPost(post: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiUrl}/baidang/baidangungtuyen`, post, {
      headers,
    });
  }

  // Cập nhật bài đăng ứng tuyển theo ID
  updateUngTuyenPost(post: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.put<any>(
      `${this.apiUrl}/baidang/baidangungtuyen/${post.id}`,
      post,
      { headers }
    );
  }

  // Xóa bài đăng ứng tuyển theo ID
  deleteUngTuyenPost(postId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<any>(
      `${this.apiUrl}/baidang/baidangungtuyen/${postId}`,
      { headers }
    );
  }
}
