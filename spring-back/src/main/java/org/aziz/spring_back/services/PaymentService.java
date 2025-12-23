package org.aziz.spring_back.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.aziz.spring_back.dtos.NewPaymentDto;
import org.aziz.spring_back.entities.Payment;
import org.aziz.spring_back.entities.PaymentStatus;
import org.aziz.spring_back.entities.PaymentType;
import org.aziz.spring_back.entities.Student;
import org.aziz.spring_back.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository repo;
    private final StudentService studentService;

    public List<Payment> getAllPayments() {
        return repo.findAll();
    }

    public Payment getPaymentById(Long paymentId) {
        return repo.findById(paymentId).orElse(null);
    }

    public List<Payment> getPaymentsByStudentCode(String code) {
        return repo.findByStudentCode(code);
    }

    public List<Payment> getPaymentsByType(PaymentType type) {
        return repo.findByPaymentType(type);
    }

    public List<Payment> getPaymentsByStatus(String status) {
        return repo.findByPaymentStatus(status);
    }

    public Payment updatePaymentStatus(Long id, PaymentStatus status) {
        Payment payment = getPaymentById(id);
        if (payment != null) {
            payment.setPaymentStatus(status);
            return repo.save(payment);
        }
        return null;
    }

    public Payment createPayment(
            MultipartFile file,
            NewPaymentDto newPaymentDto
    ) throws IOException {
        Path folderPath = Paths.get(System.getProperty("user.home"), "Data", "Payments");
        if(!Files.exists(folderPath)){
            Files.createDirectories(folderPath);
        }
        String filename = UUID.randomUUID().toString();
        Path filePath = Paths.get(System.getProperty("user.home"), "Data", "Payments", filename + ".pdf");
        Files.copy(file.getInputStream(), filePath);
        Student student = studentService.getStudentByCode(newPaymentDto.studentCode());
        Payment payment = Payment.builder()
                .amount(newPaymentDto.amount().doubleValue())
                .paymentDate(newPaymentDto.paymentDate())
                .paymentType(newPaymentDto.paymentType())
                .paymentStatus(PaymentStatus.CREATED)
                .file(filePath.toUri().toString())
                .student(student)
                .build();
        repo.save(payment);
        return payment;
    }

    public byte[] viewPaymentFile(Long paymentId) throws IOException {
        Payment payment = repo.findById(paymentId).get();
        Path path = Path.of(URI.create(payment.getFile()));
        return Files.readAllBytes(path);
    }
}
