export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  programId: string;
  photo: string;
  code: string;
}

export interface Payment {
  id: string;
  date: string;
  amount: number;
  type: string;
  status: string;
  file: string;
  student: Student;
}

export enum PaymentStatus {
  CREATED,
  VALIDATED,
  CANCELLED,
}

export enum PaymentType {
  CREDIT_CARD,
  DEBIT_CARD,
  PAYPAL,
  BANK_TRANSFER,
  CASH,
}
