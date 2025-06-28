package com.library.service;

import com.library.model.Reservation;
import com.library.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    
    @Autowired
    private ReservationRepository reservationRepository;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private BookService bookService;

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservationById(String id) {
        return reservationRepository.findById(id);
    }

    public Reservation saveReservation(Reservation reservation) {
        // Populate reference fields
        populateReferenceFields(reservation);
        return reservationRepository.save(reservation);
    }

    public void deleteReservation(String id) {
        reservationRepository.deleteById(id);
    }

    public List<Reservation> getReservationsByUserId(String userId) {
        return reservationRepository.findByUserId(userId);
    }

    public List<Reservation> getReservationsByBookId(String bookId) {
        return reservationRepository.findByBookId(bookId);
    }

    public List<Reservation> getReservationsByStatus(Reservation.ReservationStatus status) {
        return reservationRepository.findByStatus(status);
    }

    public Reservation createReservation(String userId, String bookId) {
        // Check if book is available
        if (!bookService.reserveBook(bookId)) {
            throw new IllegalStateException("Book is not available for reservation");
        }

        Reservation reservation = new Reservation(userId, bookId);
        populateReferenceFields(reservation);
        return reservationRepository.save(reservation);
    }

    public boolean returnBook(String reservationId) {
        Optional<Reservation> reservationOpt = reservationRepository.findById(reservationId);
        if (reservationOpt.isPresent()) {
            Reservation reservation = reservationOpt.get();
            if (reservation.getStatus() == Reservation.ReservationStatus.ACTIVE) {
                reservation.returnBook();
                bookService.returnBook(reservation.getBookId());
                reservationRepository.save(reservation);
                return true;
            }
        }
        return false;
    }

    public boolean cancelReservation(String reservationId) {
        Optional<Reservation> reservationOpt = reservationRepository.findById(reservationId);
        if (reservationOpt.isPresent()) {
            Reservation reservation = reservationOpt.get();
            if (reservation.getStatus() == Reservation.ReservationStatus.ACTIVE) {
                reservation.cancelReservation();
                bookService.returnBook(reservation.getBookId());
                reservationRepository.save(reservation);
                return true;
            }
        }
        return false;
    }

    private void populateReferenceFields(Reservation reservation) {
        // Populate user fields
        userService.getUserById(reservation.getUserId()).ifPresent(user -> {
            reservation.setUserUsername(user.getUsername());
            reservation.setUserFirstName(user.getFirstName());
            reservation.setUserLastName(user.getLastName());
        });

        // Populate book fields
        bookService.getBookById(reservation.getBookId()).ifPresent(book -> {
            reservation.setBookTitle(book.getTitle());
            reservation.setBookAuthor(book.getAuthor());
        });
    }
} 