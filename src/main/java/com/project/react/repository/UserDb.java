package com.project.react.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.react.model.UserModel;

@Repository
public interface UserDb extends JpaRepository<UserModel, String>{
    UserModel findByUsername(String username);
}
