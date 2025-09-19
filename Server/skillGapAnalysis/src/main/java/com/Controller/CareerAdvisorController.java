package com.Controller;

import com.Service.GeminiService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Map;

@RestController   // ✅ important: JSON ke liye
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class CareerAdvisorController {

    private final GeminiService geminiService;

    public CareerAdvisorController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    // ✅ React se POST JSON request
    @PostMapping("/get-advice")
    public ResponseEntity<Map<String, Object>> getAdvice(@RequestBody Map<String, Object> request) {
        String profile = (String) request.get("profile"); // frontend se aa raha hoga

        String advice = geminiService.getCareerAdvice(profile);

        // response JSON
        return ResponseEntity.ok(Map.of(
            "profile", profile,
            "advice", advice
        ));
    }

    // ✅ GET (agar cache se advice lena ho)
    @GetMapping("/get-advice-json")
    public ResponseEntity<Map<String, String>> getAdviceJson(@RequestParam String profile) {
        String advice = geminiService.getCachedAdvice(profile);
        return ResponseEntity.ok(Map.of("advice", advice != null ? advice : ""));
    }

}
