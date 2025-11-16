# Resiliency Service (Spring Boot example)

Minimal Spring Boot application demonstrating a Resilience4j circuit breaker used around a downstream call.

Requirements
- Java 11+
- Maven

Run
```bash
cd examples/resiliency-service
mvn spring-boot:run
# application runs on http://localhost:8080
curl http://localhost:8080/api/orders/123
```

Notes
- This example is intentionally minimal: `OrderService` simulates a downstream error randomly to demonstrate the circuit breaker's fallback behavior.
