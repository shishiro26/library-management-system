package com.library.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.library.model.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
} 