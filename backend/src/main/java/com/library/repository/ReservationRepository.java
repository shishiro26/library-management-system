package com.library.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.library.model.Reservation;

import java.util.List;

public interface ReservationRepository extends MongoRepository<Reservation, String> {
    List<Reservation> findByUserId(String userId);
    List<Reservation> findByBookId(String bookId);
    List<Reservation> findByStatus(Reservation.ReservationStatus status);
} 