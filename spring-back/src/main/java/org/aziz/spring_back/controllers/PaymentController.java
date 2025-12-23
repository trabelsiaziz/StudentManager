package org.aziz.spring_back.controllers;

import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.aziz.spring_back.dtos.NewPaymentDto;
import org.aziz.spring_back.entities.Payment;
import org.aziz.spring_back.entities.PaymentStatus;
import org.aziz.spring_back.entities.PaymentType;
import org.aziz.spring_back.services.PaymentService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PaymentController {

    private final PaymentService service;

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(service.getAllPayments());
    }

    @GetMapping("/type")
    public ResponseEntity<List<Payment>> getPaymentsByType(
            @RequestParam PaymentType type
    ) {
        return ResponseEntity.ok(service.getPaymentsByType(type));
    }

    @GetMapping("/status")
    public ResponseEntity<List<Payment>> getPaymentsByStatus(
            @RequestParam String status
    ) {
        return ResponseEntity.ok(service.getPaymentsByStatus(status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(
            @PathParam("id") Long paymentId
    ) {
        Payment payment = service.getPaymentById(paymentId);
        if (payment != null) {
            return ResponseEntity.ok(payment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(path = "/paymentFile/{paymentId}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> viewPaymentFile(
            @PathVariable Long paymentId
    ) throws IOException {
        return ResponseEntity.ok(service.viewPaymentFile(paymentId));
    }

    @GetMapping("/student/{code}")
    public ResponseEntity<List<Payment>> getPaymentsByStudentCode(
            @PathVariable String code
    ) {
        return ResponseEntity.ok(service.getPaymentsByStudentCode(code));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Payment> updatePaymentStatus(
            @PathVariable Long id,
            @RequestBody PaymentStatus status
    ) {
        return ResponseEntity.ok(service.updatePaymentStatus(id, status));
    }


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Payment> createPayment(
            @RequestParam("file") MultipartFile file,
            NewPaymentDto newPaymentDto
    ) throws IOException {
        return ResponseEntity.ok(service.createPayment(file, newPaymentDto));
    }


}
