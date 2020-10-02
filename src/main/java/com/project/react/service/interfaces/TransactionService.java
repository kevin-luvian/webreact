package com.project.react.service.interfaces;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.project.react.model.*;
import com.project.react.restModel.TransactionRequest;

public interface TransactionService {
    List<TransactionModel> getAll();

    List<TransactionModel> getUserTransactions(UserModel user);

    Optional<TransactionModel> getById(String id);

    List<TransactionModel> getBetween(UserModel user, LocalDate startDate, LocalDate endDate);

    TransactionModel save(TransactionModel transaction);

    TransactionModel create(TransactionRequest request, AccountModel account, CategoryModel category, UserModel user);

    TransactionModel update(TransactionModel transaction, UserModel user);

    TransactionModel update(TransactionRequest request, AccountModel account, CategoryModel category, UserModel user);

    TransactionModel delete(TransactionModel transaction, UserModel user);

    TransactionModel delete(String id, UserModel user);
}