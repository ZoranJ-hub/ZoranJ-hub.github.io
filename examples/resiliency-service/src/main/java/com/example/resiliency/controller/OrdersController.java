package com.example.resiliency.controller;

import com.example.resiliency.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;

@RestController
public class OrdersController {

    private final OrderService orderService;

    public OrdersController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/api/orders/{id}")
    @CircuitBreaker(name = "ordersService", fallbackMethod = "ordersFallback")
    public ResponseEntity<String> getOrder(@PathVariable String id) {
        String order = orderService.fetchOrder(id);
        return ResponseEntity.ok(order);
    }

    public ResponseEntity<String> ordersFallback(String id, Throwable t) {
        String cached = orderService.getCachedOrder(id);
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(cached);
    }
}
