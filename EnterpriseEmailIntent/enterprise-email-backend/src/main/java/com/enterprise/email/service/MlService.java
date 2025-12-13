package com.enterprise.email.service;

import com.enterprise.email.model.EmailPrediction;
import com.enterprise.email.repository.EmailPredictionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class MlService {

    @Autowired
    private EmailPredictionRepository repo;

    private final RestTemplate rest = new RestTemplate();

    @Value("${ml.url}")
    private String mlUrl;

    public Map<String, Object> predict(String text) {


        if (mlUrl == null) {
            throw new RuntimeException("ML_URL environment variable not set");
        }

        // 2️⃣ Request body
        Map<String, String> req = new HashMap<>();
        req.put("text", text);

        // 3️⃣ Call FastAPI ML service
        Map<String, Object> response =
                rest.postForObject(mlUrl, req, Map.class);

        if (response == null) {
            throw new RuntimeException("ML service returned null response");
        }

        // 4️⃣ Save prediction to DB
        EmailPrediction ep = new EmailPrediction();
        ep.setEmailText(text);
        ep.setIntent(response.get("intent").toString());
        ep.setConfidence(
                Double.parseDouble(response.get("confidence").toString())
        );

        repo.save(ep);

        // 5️⃣ Return response to controller
        return response;
    }
}
