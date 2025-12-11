package com.enterprise.email.repository;

import com.enterprise.email.model.EmailPrediction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmailPredictionRepository extends JpaRepository<EmailPrediction, Long> {
    @Query("SELECT intent, COUNT(intent) FROM EmailPrediction GROUP BY intent")
    List<Object[]> getIntentCounts();

    List<EmailPrediction> findTop10ByOrderByIdDesc();

}
