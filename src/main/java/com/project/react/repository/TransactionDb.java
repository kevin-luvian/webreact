package com.project.react.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.react.model.TransactionModel;

@Repository
public interface TransactionDb extends JpaRepository<TransactionModel, String>{
}
