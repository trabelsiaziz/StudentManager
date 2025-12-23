import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Student } from '../models/students.model';
import { StudentService } from '../services/student-service';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students implements OnInit, AfterViewInit {
  public students: Array<Student> = [];
  public dataSource: any;
  public displayedColumns = ['id', 'firstName', 'lastName', 'payments'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private studentService: StudentService) {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe({
      next: (value) => {
        this.students = value;
        this.dataSource = new MatTableDataSource(this.students);
      },
    });
  }

  filterStudents(event: Event) {
    let val = (event.target as HTMLInputElement).value;
    this.dataSource.filter = val;
  }

  getPaymentsByStudentCode(student: Student) {
    this.router.navigateByUrl(`/admin/student-details/${student.code}`);
  }
}
