import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../services/student-service';

@Component({
  selector: 'app-new-payment',
  standalone: false,
  templateUrl: './new-payment.html',
  styleUrl: './new-payment.css',
})
export class NewPayment implements OnInit {
  constructor(
    private fb: FormBuilder,
    private activedRoute: ActivatedRoute,
    private studentService: StudentService
  ) {}
  public paymentFormGroup!: FormGroup;
  public studentCode!: String;
  public paymentTypes: String[] = ['CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'BANK_TRANSFER', 'CASH'];

  ngOnInit(): void {
    this.studentCode = this.activedRoute.snapshot.params['code'];

    this.paymentFormGroup = this.fb.group({
      fileSource: this.fb.control(''),
      fileName: this.fb.control(''),
      amount: this.fb.control(''),
      paymentDate: this.fb.control(''),
      paymentType: this.fb.control(''),
      studentCode: this.fb.control(this.studentCode),
      date: this.fb.control(''),
    });
  }

  selectFile(event: any) {
    console.log(event);
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.paymentFormGroup.patchValue({
        fileSource: file,
        fileName: file.name,
      });
    }
  }

  createPayment() {
    let formData = new FormData();
    let date = new Date(this.paymentFormGroup.value.paymentDate);
    let formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    formData.set('file', this.paymentFormGroup.value.fileSource);
    formData.set('amount', this.paymentFormGroup.value.amount);
    formData.set('paymentDate', formattedDate);
    formData.set('paymentType', this.paymentFormGroup.value.paymentType);
    formData.set('studentCode', this.paymentFormGroup.value.studentCode);

    this.studentService.createPayment(formData).subscribe({
      next: (value) => {
        alert("Payment Created Successfully!");
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
