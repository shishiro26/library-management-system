package com.library.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.library.model.Book;

import java.util.List;

public interface BookRepository extends MongoRepository<Book, String> {
    List<Book> findByCategoriesIn(List<String> categories);
    List<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(String title, String author);
} 