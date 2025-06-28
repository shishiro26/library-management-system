package com.library.controller;

import com.library.model.Reservation;
import com.library.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "*")
public class ReservationController {
    
    @Autowired
    private ReservationService reservationService;

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable String id) {
        Optional<Reservation> reservation = reservationService.getReservationById(id);
        return reservation.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody Map<String, String> request) {
        try {
            String userId = request.get("userId");
            String bookId = request.get("bookId");
            
            if (userId == null || bookId == null) {
                return ResponseEntity.badRequest().body("userId and bookId are required");
            }
            
            Reservation reservation = reservationService.createReservation(userId, bookId);
            return ResponseEntity.ok(reservation);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable String id, @RequestBody Reservation reservation) {
        if (!reservationService.getReservationById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        reservation.setId(id);
        return ResponseEntity.ok(reservationService.saveReservation(reservation));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable String id) {
        if (!reservationService.getReservationById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        reservationService.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public List<Reservation> getReservationsByUser(@PathVariable String userId) {
        return reservationService.getReservationsByUserId(userId);
    }

    @GetMapping("/book/{bookId}")
    public List<Reservation> getReservationsByBook(@PathVariable String bookId) {
        return reservationService.getReservationsByBookId(bookId);
    }

    @GetMapping("/status/{status}")
    public List<Reservation> getReservationsByStatus(@PathVariable Reservation.ReservationStatus status) {
        return reservationService.getReservationsByStatus(status);
    }

    @PostMapping("/{id}/return")
    public ResponseEntity<String> returnBook(@PathVariable String id) {
        boolean success = reservationService.returnBook(id);
        if (success) {
            return ResponseEntity.ok("Book returned successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to return book");
        }
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<String> cancelReservation(@PathVariable String id) {
        boolean success = reservationService.cancelReservation(id);
        if (success) {
            return ResponseEntity.ok("Reservation cancelled successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to cancel reservation");
        }
    }
} 