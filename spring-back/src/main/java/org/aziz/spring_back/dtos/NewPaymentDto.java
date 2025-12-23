package org.aziz.spring_back.dtos;

import org.aziz.spring_back.entities.PaymentType;

import java.time.LocalDate;

public record NewPaymentDto(
        Long amount,
        LocalDate paymentDate,
        PaymentType paymentType,
        String studentCode
) {
}
