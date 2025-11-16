package com.example.resiliency.service;

import org.springframework.stereotype.Service;

@Service
public class OrderService {

    public String fetchOrder(String id) {
        // Simulate call to downstream service; in a real app this would call an external client
        if (Math.random() &lt; 0.2) throw new RuntimeException("downstream error");
        return "{ \"id\": \"" + id + "\", \"status\": \"ok\" }";
    }

    public String getCachedOrder(String id) {
        return "{ \"id\": \"" + id + "\", \"status\": \"cached\" }";
    }
}
