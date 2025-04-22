import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private apiUrl = 'http://localhost:5009/api';
  private userSubject = new BehaviorSubject<any>(null); // Lưu trạng thái người dùng hiện tại

  constructor(private http: HttpClient) {}

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
}
