import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Payment, Student } from '../models/students.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  public getAllStudents(): Observable<Array<Student>> {
    return this.http.get<Array<Student>>(`${environment.BACKEND_STUDENTS_URL}`);
  }

  public getAllpayments(): Observable<Array<Payment>> {
    return this.http.get<Array<Payment>>(`${environment.BACKEND_PAYMENTS_URL}`);
  }

  public getPaymentsByStudentCode(studentCode: String ): Observable<Array<Payment>> {
    return this.http.get<Array<Payment>>(`${environment.BACKEND_PAYMENTS_URL}/student/${studentCode}`); 
  }


  public createPayment(formData: FormData): Observable<Payment>{
    return this.http.post<Payment>(`${environment.BACKEND_PAYMENTS_URL}`, formData); 
  }
}
