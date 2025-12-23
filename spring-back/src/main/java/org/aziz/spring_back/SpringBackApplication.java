package org.aziz.spring_back;

import org.aziz.spring_back.entities.Payment;
import org.aziz.spring_back.entities.PaymentStatus;
import org.aziz.spring_back.entities.PaymentType;
import org.aziz.spring_back.entities.Student;
import org.aziz.spring_back.repository.PaymentRepository;
import org.aziz.spring_back.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;


@SpringBootApplication
public class SpringBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBackApplication.class, args);
	}

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository studentRepository, PaymentRepository paymentRepository) {
        return args -> {
            studentRepository.save(Student.builder()
                            .id(UUID.randomUUID().toString())
                            .firstName("Aziz")
                            .lastName("Khalil")
                            .code("S1001")
                            .programId("P1001")
                            .photo("aziz.png")
                            .build()
            );
            studentRepository.save(Student.builder()
                    .id(UUID.randomUUID().toString())
                    .firstName("Mohamed")
                    .lastName("trioui")
                    .code("S1002")
                    .programId("P1002")
                    .photo("mohamed.png")
                    .build()
            );
            studentRepository.save(Student.builder()
                    .id(UUID.randomUUID().toString())
                    .firstName("Sara")
                    .lastName("Mansour")
                    .code("S1003")
                    .programId("P1003")
                    .photo("sara.png")
                    .build()
            );
            PaymentType[] paymentType = PaymentType.values();
            Random random = new Random();

            AtomicLong counter = new AtomicLong(1L);
            studentRepository.findAll().forEach(student -> {
                long start = counter.get();
                for(long i = start; i < start + 10; i++){
                    int index = random.nextInt(paymentType.length);
                    Payment payment = Payment.builder()
                            .amount(1000.0 + i * 100)
                            .paymentDate(LocalDate.now())
                            .paymentType(paymentType[index])
                            .paymentStatus(PaymentStatus.CREATED)
                            .student(student)
                            .build();

                    paymentRepository.save(payment);
                }
                counter.addAndGet(10);
            });
        };
    }
}
