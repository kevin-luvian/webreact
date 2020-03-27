package com.project.react.service.interfaces;

import java.util.List;

import com.project.react.model.TransactionModel;

public interface TransactionService {
    List<TransactionModel> getAll();
    TransactionModel getById(String id);
    TransactionModel save(TransactionModel transaction);
    void delete(TransactionModel transaction);
}