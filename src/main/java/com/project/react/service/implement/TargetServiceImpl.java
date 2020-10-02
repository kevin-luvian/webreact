package com.project.react.service.implement;

import com.project.react.Exception.ModelConflictException;
import com.project.react.model.*;
import com.project.react.repository.TargetDb;
import com.project.react.restModel.TargetRequest;
import com.project.react.restModel.TargetResponse;
import com.project.react.restModel.TargetTransactionRequest;
import com.project.react.service.interfaces.AccountService;
import com.project.react.service.interfaces.CategoryService;
import com.project.react.service.interfaces.TargetService;
import com.project.react.service.interfaces.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TargetServiceImpl implements TargetService {

    @Autowired
    private TargetDb targetDb;

    @Autowired
    private AccountService accountService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private TransactionService transactionService;

    @Override
    public Optional<TargetModel> getById(String id) {
        return targetDb.findById(id);
    }

    @Override
    public List<TargetResponse> getAll(UserModel user) {
        List<TargetModel> targets = targetDb.findAllByUserModelOrderByNameAsc(user);
        List<TargetResponse> targetResponses = new ArrayList<TargetResponse>();
        for (TargetModel target : targets) {
            targetResponses.add(getTargetResponse(target));
        }
        return targetResponses;
    }

    @Override
    public TargetResponse getTargetResponse(TargetModel target) {
        List<TransactionModel> transactions = target.getUserModel().getTransactionList();
        long currentAmount = 0L;
        for (TransactionModel transaction : transactions) {
            if (transaction.getName().contains("[target]") && transaction.getName().contains(target.getName())) {
                currentAmount = Long.sum(currentAmount, transaction.getValue());
            }
        }
        return new TargetResponse(target, currentAmount);
    }

    @Override
    public TargetModel save(TargetModel newTarget) throws ModelConflictException {
        List<TargetModel> allTarget = newTarget.getUserModel().getTargetList();
        for (TargetModel target : allTarget) {
            if (newTarget.getName().equals(target.getName()) && !newTarget.getId().equals(target.getId())) {
                throw new ModelConflictException();
            }
        }
        return targetDb.save(newTarget);
    }

    @Override
    public TargetModel create(TargetRequest request, UserModel user) throws ModelConflictException {
        AccountModel account = accountService.getById(request.getAccountId().get()).get();
        CategoryModel category = categoryService.getById(request.getCategoryId().get()).get();
        if (!account.getUserModel().equals(user) || !category.getUserModel().equals(user)) {
            throw new AccessDeniedException("unauthorized");
        }
        TargetModel newTarget = new TargetModel();
        newTarget.setId("");
        newTarget.setName(request.getName().get());
        newTarget.setValue(request.getValue().get());
        newTarget.setAccountModel(account);
        newTarget.setCategoryModel(category);
        newTarget.setUserModel(user);
        return save(newTarget);
    }

    @Override
    public TargetModel update(TargetRequest request, UserModel user) throws ModelConflictException {
        TargetModel target = getById(request.getId().get()).get();
        String oldTargetName = target.getName();
        AccountModel account = accountService.getById(request.getAccountId().get()).get();
        CategoryModel category = categoryService.getById(request.getCategoryId().get()).get();
        if (!target.getUserModel().equals(user) || !account.getUserModel().equals(user)
                || !category.getUserModel().equals(user)) {
            throw new AccessDeniedException("unauthorized");
        }
        target.setName(request.getName().get());
        target.setValue(request.getValue().get());
        target.setAccountModel(account);
        target.setCategoryModel(category);
        save(target);
        for (TransactionModel transaction : transactionService.getUserTransactions(user)) {
            if (transaction.getName().contains("[target]") && transaction.getName().contains(oldTargetName)) {
                transaction.setName(formatTransactionName(target.getName()));
                transaction.setAccountModel(account);
                transaction.setCategoryModel(category);
                transactionService.save(transaction);
            }
        }
        return target;
    }

    @Override
    public TargetModel delete(String id, UserModel user) {
        TargetModel target = getById(id).get();
        if (!target.getUserModel().equals(user)) {
            throw new AccessDeniedException("unauthorized");
        }
        for (TransactionModel transaction : transactionService.getUserTransactions(user)) {
            if (transaction.getName().contains("[target]") && transaction.getName().contains(target.getName())) {
                transactionService.delete(transaction.getId(), user);
            }
        }
        targetDb.delete(target);
        return target;
    }

    @Override
    public TargetModel endTarget(String id, UserModel user) {
        TargetModel target = getById(id).get();
        if (!target.getUserModel().equals(user)) {
            throw new AccessDeniedException("unauthorized");
        }
        List<TransactionModel> allTransactions = transactionService.getUserTransactions(user);
        TransactionModel newTransaction = transactionsCleanup(target, allTransactions, LocalDate.now());
        newTransaction.setName(target.getName());
        if (newTransaction.getValue() > target.getValue())
            newTransaction.setValue(target.getValue());
        transactionService.update(newTransaction, user);
        return delete(target.getId(), user);
    }

    @Override
    public TransactionModel addTransaction(TargetTransactionRequest request) {
        TargetModel target = getById(request.getTargetId().get()).get();
        List<TransactionModel> todayTransactions = transactionService.getBetween(target.getUserModel(), LocalDate.now(),
                LocalDate.now().plusDays(1));
        TransactionModel transaction = transactionsCleanup(target, todayTransactions, request.getDate().get());
        transaction.setValue(Long.sum(request.getAmount().get(), transaction.getValue()));
        transactionService.update(transaction, target.getUserModel());
        return transaction;
    }

    @Override
    public TransactionModel transactionsCleanup(TargetModel target, List<TransactionModel> transactions,
            LocalDate date) {
        long totalAmount = 0L;
        for (TransactionModel transaction : transactions) {
            if (transaction.getName().contains("[target]") && transaction.getName().contains(target.getName())) {
                totalAmount = Long.sum(totalAmount, transaction.getValue());
                transactionService.delete(transaction.getId(), target.getUserModel());
            }
        }
        TransactionModel transaction = new TransactionModel();
        transaction.setName(formatTransactionName(target.getName()));
        transaction.setType(true);
        transaction.setDate(date);
        transaction.setValue(totalAmount);
        transaction.setUserModel(target.getUserModel());
        transaction.setCategoryModel(target.getCategoryModel());
        transaction.setAccountModel(target.getAccountModel());
        transactionService.save(transaction);
        return transaction;
    }

    @Override
    public String formatTransactionName(String name) {
        return String.format("[target] %s", name);
    }
}