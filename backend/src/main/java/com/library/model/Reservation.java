package com.library.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Document(collection = "reservations")
public class Reservation {

    @Id
    private String id;

    @NotNull(message = "User ID is required")
    @Indexed
    private String userId;

    @NotNull(message = "Book ID is required")
    @Indexed
    private String bookId;

    @CreatedDate
    private LocalDateTime reservationDate;

    private LocalDateTime expectedReturnDate;

    private LocalDateTime actualReturnDate;

    private ReservationStatus status = ReservationStatus.ACTIVE;

    // Reference fields for easier querying
    private String userUsername;
    private String userFirstName;
    private String userLastName;
    private String bookTitle;
    private String bookAuthor;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    // Constructors
    public Reservation() {}

    public Reservation(String userId, String bookId) {
        this.userId = userId;
        this.bookId = bookId;
        this.reservationDate = LocalDateTime.now();
        this.expectedReturnDate = this.reservationDate.plusDays(14); // 14 days default
    }

    // Business methods
    public boolean isOverdue() {
        return status == ReservationStatus.ACTIVE && 
               expectedReturnDate != null && 
               LocalDateTime.now().isAfter(expectedReturnDate);
    }

    public void returnBook() {
        this.status = ReservationStatus.RETURNED;
        this.actualReturnDate = LocalDateTime.now();
    }

    public void cancelReservation() {
        this.status = ReservationStatus.CANCELLED;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public LocalDateTime getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(LocalDateTime reservationDate) {
        this.reservationDate = reservationDate;
    }

    public LocalDateTime getExpectedReturnDate() {
        return expectedReturnDate;
    }

    public void setExpectedReturnDate(LocalDateTime expectedReturnDate) {
        this.expectedReturnDate = expectedReturnDate;
    }

    public LocalDateTime getActualReturnDate() {
        return actualReturnDate;
    }

    public void setActualReturnDate(LocalDateTime actualReturnDate) {
        this.actualReturnDate = actualReturnDate;
    }

    public ReservationStatus getStatus() {
        return status;
    }

    public void setStatus(ReservationStatus status) {
        this.status = status;
    }

    public String getUserUsername() {
        return userUsername;
    }

    public void setUserUsername(String userUsername) {
        this.userUsername = userUsername;
    }

    public String getUserFirstName() {
        return userFirstName;
    }

    public void setUserFirstName(String userFirstName) {
        this.userFirstName = userFirstName;
    }

    public String getUserLastName() {
        return userLastName;
    }

    public void setUserLastName(String userLastName) {
        this.userLastName = userLastName;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public String getBookAuthor() {
        return bookAuthor;
    }

    public void setBookAuthor(String bookAuthor) {
        this.bookAuthor = bookAuthor;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // Status enum
    public enum ReservationStatus {
        ACTIVE, RETURNED, CANCELLED, OVERDUE
    }
} 