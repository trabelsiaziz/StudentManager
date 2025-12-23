import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student-service';
import { Payment } from '../models/students.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-student-details',
  standalone: false,
  templateUrl: './student-details.html',
  styleUrl: './student-details.css',
})
export class StudentDetails implements OnInit {
  constructor(
    private studentService: StudentService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  public studentCode!: String;
  public studentPayments: Array<Payment> = [];
  public displayedColumns: String[] = ['id', 'date', 'date', 'status', 'amount', 'firstName'];
  public dataSource: any;
  public targetName!: String;

  ngOnInit(): void {
    this.studentCode = this.activateRoute.snapshot.params['code'];
    this.studentService.getPaymentsByStudentCode(this.studentCode).subscribe({
      next: (value: any) => {
        this.studentPayments = value;
        this.dataSource = new MatTableDataSource(this.studentPayments);
      },
      error: (er: any) => {
        console.error(er);
      },
    });
  }

  createPayment() {
    this.router.navigateByUrl(`/admin/new-payment/${this.studentCode}`); 
  }
}
