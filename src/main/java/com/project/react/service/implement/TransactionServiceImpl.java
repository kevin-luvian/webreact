package com.project.react.service.implement;

import java.util.List;
import java.util.Optional;

import com.project.react.model.TransactionModel;
import com.project.react.repository.TransactionDb;
import com.project.react.service.interfaces.TransactionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionDb transactionDb;
    
    @Override
    public List<TransactionModel> getAll() {
        return transactionDb.findAll();
    }

    @Override
    public TransactionModel getById(String id) {
        Optional<TransactionModel> transaction = transactionDb.findById(id);
        if(transaction.isPresent()) return transaction.get();
        return null;
    }

    @Override
    public TransactionModel save(TransactionModel transaction) {
        return transactionDb.save(transaction);
    }

    @Override
    public void delete(TransactionModel transaction) {
        transactionDb.delete(transaction);
    }
}