package com.project.react.service.implement;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.project.react.model.AccountModel;
import com.project.react.model.CategoryModel;
import com.project.react.model.TransactionModel;
import com.project.react.model.UserModel;
import com.project.react.repository.TransactionDb;
import com.project.react.restModel.TransactionRequest;
import com.project.react.service.interfaces.TransactionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
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
    public Optional<TransactionModel> getById(String id) {
        return transactionDb.findById(id);
    }

    @Override
    public List<TransactionModel> getBetween(UserModel user, LocalDate startDate, LocalDate endDate) {
        return transactionDb.findAllByUserModelAndDateLessThanAndDateGreaterThanEqualOrderByDateAsc(user, endDate, startDate);
    }

    @Override
    public TransactionModel create(TransactionRequest request, AccountModel account, CategoryModel category,
            UserModel user) {
        if (!account.getUserModel().equals(user) || !category.getUserModel().equals(user))
            throw new AccessDeniedException("unauthorized");
        TransactionModel transaction = new TransactionModel();
        transaction.setName(request.getName().get());
        transaction.setType(request.getType().get());
        transaction.setValue(Math.abs(request.getValue().get()));
        transaction.setDate(request.getDate().get());
        transaction.setAccountModel(account);
        transaction.setCategoryModel(category);
        transaction.setUserModel(user);
        return transactionDb.save(transaction);
    }

    @Override
    public TransactionModel update(TransactionRequest request, AccountModel account, CategoryModel category,
            UserModel user) {
        TransactionModel transaction = getById(request.getId().get()).get();
        if (!account.getUserModel().equals(user) || !category.getUserModel().equals(user)
                || !transaction.getUserModel().equals(user))
            throw new AccessDeniedException("unauthorized");
        transaction.setName(request.getName().get());
        transaction.setType(request.getType().get());
        transaction.setValue(Math.abs(request.getValue().get()));
        transaction.setDate(request.getDate().get());
        transaction.setAccountModel(account);
        transaction.setCategoryModel(category);
        return transactionDb.save(transaction);
    }

    @Override
    public TransactionModel save(TransactionModel transaction) {
        return transactionDb.save(transaction);
    }

    @Override
    public TransactionModel delete(String id, UserModel user) {
        TransactionModel transaction = getById(id).get();
        if (!transaction.getUserModel().equals(user)) {
            throw new AccessDeniedException("unauthorized");
        }
        transactionDb.delete(transaction);
        return transaction;
    }
}