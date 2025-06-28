package com.library.controller;

import com.library.model.Book;
import com.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {
    
    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable String id) {
        Optional<Book> book = bookService.getBookById(id);
        return book.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Book createBook(@RequestBody Book book) {
        return bookService.saveBook(book);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable String id, @RequestBody Book book) {
        if (!bookService.getBookById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        book.setId(id);
        return ResponseEntity.ok(bookService.saveBook(book));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable String id) {
        if (!bookService.getBookById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam String query) {
        return bookService.searchBooks(query);
    }

    @GetMapping("/category")
    public List<Book> getBooksByCategory(@RequestParam List<String> categories) {
        return bookService.findByCategories(categories);
    }

    @PostMapping("/{id}/reserve")
    public ResponseEntity<String> reserveBook(@PathVariable String id) {
        boolean success = bookService.reserveBook(id);
        if (success) {
            return ResponseEntity.ok("Book reserved successfully");
        } else {
            return ResponseEntity.badRequest().body("Book is not available for reservation");
        }
    }

    @PostMapping("/{id}/return")
    public ResponseEntity<String> returnBook(@PathVariable String id) {
        boolean success = bookService.returnBook(id);
        if (success) {
            return ResponseEntity.ok("Book returned successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to return book");
        }
    }
} 