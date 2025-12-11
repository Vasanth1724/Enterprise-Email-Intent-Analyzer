package com.enterprise.email.service;

import com.enterprise.email.model.EmailPrediction;
import com.enterprise.email.repository.EmailPredictionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class MlService {

    @Autowired
    private EmailPredictionRepository repo;

    public Map<String, Object> predict(String text) {

        RestTemplate rest = new RestTemplate();

        // Request body for ML API
        Map<String, String> req = new HashMap<>();
        req.put("text", text);

        // Call FastAPI ML service
        Map<String, Object> response = rest.postForObject(
                "http://localhost:8001/predict",
                req,
                Map.class
        );

        // Save to database
        EmailPrediction ep = new EmailPrediction();
        ep.setEmailText(text);
        ep.setIntent(response.get("intent").toString());
        ep.setConfidence(
                Double.parseDouble(response.get("confidence").toString())
        );

        repo.save(ep);

        // Return ML result to controller
        return response;
    }
}
