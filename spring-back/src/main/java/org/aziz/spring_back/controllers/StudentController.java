package org.aziz.spring_back.controllers;

import lombok.RequiredArgsConstructor;
import org.aziz.spring_back.entities.Student;
import org.aziz.spring_back.services.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
@CrossOrigin("*")
public class StudentController {
    private final StudentService service;

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(service.getAllStudents());
    }


    @GetMapping("/code/{code}")
    public ResponseEntity<Student> getStudentByCode(
            @PathVariable String studentCode
    ) {
        Student student = service.getStudentByCode(studentCode);
        if (student != null) {
            return ResponseEntity.ok(student);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/program/{programId}")
    public ResponseEntity<List<Student>> getStudentsByProgramId(
            @PathVariable String programId
    ) {
        return ResponseEntity.ok(service.getStudentsByProgramId(programId));
    }
}
