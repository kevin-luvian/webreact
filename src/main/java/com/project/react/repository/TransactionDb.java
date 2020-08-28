package com.project.react.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import com.project.react.model.TransactionModel;
import com.project.react.model.UserModel;

@Repository
public interface TransactionDb extends JpaRepository<TransactionModel, String> {
    List<TransactionModel> findAllByUserModelAndDateLessThanAndDateGreaterThanEqualOrderByDateAsc(
            UserModel user, LocalDate startDate, LocalDate endDate);
}
