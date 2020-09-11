package com.project.react.service.interfaces;

import com.project.react.Exception.ModelConflictException;
import com.project.react.model.TargetModel;
import com.project.react.model.TransactionModel;
import com.project.react.model.UserModel;
import com.project.react.restModel.TargetRequest;
import com.project.react.restModel.TargetResponse;
import com.project.react.restModel.TargetTransactionRequest;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TargetService {
    Optional<TargetModel> getById(String id);

    List<TargetResponse> getAll(UserModel user);

    TargetResponse getTargetResponse(TargetModel target);

    TargetModel save(TargetModel target) throws ModelConflictException;

    TargetModel create(TargetRequest request, UserModel user) throws ModelConflictException;

    TargetModel update(TargetRequest request, UserModel user) throws ModelConflictException;

    TargetModel delete(String id, UserModel user);

    TargetModel endTarget(String id, UserModel user);

    TransactionModel addTransaction(TargetTransactionRequest request);

    TransactionModel transactionsCleanup(TargetModel target, List<TransactionModel> transactions, LocalDate date);

    String formatTransactionName(String name);
}
