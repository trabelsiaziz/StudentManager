package org.aziz.spring_back.services;

import lombok.RequiredArgsConstructor;
import org.aziz.spring_back.entities.Student;
import org.aziz.spring_back.repository.StudentRepository;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository repo;


    public List<Student> getAllStudents(){
        return repo.findAll();
    }

    public Student getStudentByCode(String studentCode) {
        return repo.findByCode(studentCode);
    }

    public @Nullable List<Student> getStudentsByProgramId(String programId) {
        return repo.findByProgramId(programId);
    }
}
