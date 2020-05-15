package com.project.react.service.interfaces;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.project.react.model.AccountModel;
import com.project.react.model.CategoryModel;
import com.project.react.model.TransactionModel;
import com.project.react.model.UserModel;
import com.project.react.restModel.TransactionRequest;

public interface TransactionService {
    List<TransactionModel> getAll();

    Optional<TransactionModel> getById(String id);

    List<TransactionModel> getBetween(UserModel user, LocalDate startDate, LocalDate endDate);

    TransactionModel save(TransactionModel transaction);

    TransactionModel create(TransactionRequest request, AccountModel account, CategoryModel category, UserModel user);

    TransactionModel update(TransactionRequest request, AccountModel account, CategoryModel category, UserModel user);

    TransactionModel delete(String id, UserModel user);
}