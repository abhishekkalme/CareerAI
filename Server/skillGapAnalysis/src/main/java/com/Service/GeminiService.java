package com.Service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

import java.util.*;
import java.util.concurrent.*;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private static final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

    private final RestTemplate restTemplate = new RestTemplate();

    
    private final Map<String, String> cache = new ConcurrentHashMap<>();

    
    private final BlockingQueue<String> requestQueue = new LinkedBlockingQueue<>();

    
    public GeminiService() {
        Thread worker = new Thread(this::processQueue);
        worker.setDaemon(true); 
        worker.start();
    }
    

    public String getCareerAdvice(String userProfile) {
        if (userProfile == null || userProfile.isEmpty())
            return "⚠️ Profile cannot be empty!";

        if (cache.containsKey(userProfile)) {
            return cache.get(userProfile); // return cached advice
        }

        try {
            String response = callGeminiApi(userProfile);
            cache.put(userProfile, response); // safe cache
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            return "⚠️ Unable to get advice now. Try again later.";
        }
    }

    private void processQueue() {
        while (true) {
            try {
                String userProfile = requestQueue.take(); // अगला सवाल लो
                String response = callGeminiApi(userProfile);
                cache.put(userProfile, response); // Cache में save करो
                System.out.println("✅ Processed: " + userProfile);
            } catch (Exception e) {
                System.err.println("❌ Queue Processing Error: " + e.getMessage());
            }
        }
    }

    /**
     * Actual Gemini API call
     */
    private String callGeminiApi(String userProfile) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-goog-api-key", apiKey);

//        String prompt = "Based on this profile, suggest 3 suitable career options and skill " +
//                "improvement areas in simple, user-friendly language:\n\n" + userProfile;

        
        
        String prompt = """
        		Based on this user profile, suggest:

        		1️⃣ Three suitable career options (short, simple names)
        		2️⃣ Three key skills to improve (bullet points)
        		3️⃣ One actionable next step

        		Keep it short and user-friendly. Avoid long paragraphs.

        		Profile:
        		%s
        		""".formatted(userProfile);
       
        
        String body = """
        {
          "contents": [
            {
              "parts": [
                { "text": "%s" }
              ]
            }
          ]
        }
        """.formatted(prompt);

        HttpEntity<String> entity = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response =
                restTemplate.exchange(GEMINI_URL, HttpMethod.POST, entity, Map.class);

        return extractAdvice(response.getBody());
    }

    /**
     * Response extractor
     */
    
    private String extractAdvice(Map responseMap) {
        if (responseMap == null || !responseMap.containsKey("candidates")) {
            return "⚠️ No advice generated. Please try again later.";
        }

        try {
            Map candidate = (Map) ((List) responseMap.get("candidates")).get(0);
            Map content = (Map) candidate.get("content");
            List parts = (List) content.get("parts");
            Map firstPart = (Map) parts.get(0);

            String text = (String) firstPart.get("text");
            
            // Optional: clean up extra spaces / newlines
            text = text.replaceAll("\\n{2,}", "\n"); // remove multiple blank lines
            return text;
        } catch (Exception e) {
            return "⚠️ Unable to parse AI response.";
        }
    }
 
    
    
    
    public String getCachedAdvice(String userProfile) {
        return cache.get(userProfile); // safe access to cache
    }

}
