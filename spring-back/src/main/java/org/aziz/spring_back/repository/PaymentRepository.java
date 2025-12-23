package org.aziz.spring_back.repository;

import org.aziz.spring_back.entities.Payment;
import org.aziz.spring_back.entities.PaymentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByStudentCode(String studentCode);

    List<Payment> findByPaymentStatus(String status);

    List<Payment> findByPaymentType(PaymentType paymentType);
}
