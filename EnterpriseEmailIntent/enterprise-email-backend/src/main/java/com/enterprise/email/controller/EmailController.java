package com.enterprise.email.controller;

import com.enterprise.email.repository.EmailPredictionRepository;
import com.enterprise.email.service.MlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EmailController {

    @Autowired
    private MlService mlService;

    @Autowired
    private EmailPredictionRepository repo;

    @PostMapping("/analyze")
    public Map<String, Object> analyze(@RequestBody Map<String, String> req) {
        return mlService.predict(req.get("text"));
    }

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();

        stats.put("counts", repo.getIntentCounts());
        stats.put("recent", repo.findTop10ByOrderByIdDesc());

        return stats;
    }
}
