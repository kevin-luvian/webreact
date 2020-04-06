package com.project.react.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import com.project.react.model.UserModel;

@Repository
public interface UserDb extends JpaRepository<UserModel, String>{
    Optional<UserModel> findByUsername(String username);
}
