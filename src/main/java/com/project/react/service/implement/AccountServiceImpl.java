package com.project.react.service.implement;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.project.react.model.AccountModel;
import com.project.react.model.TransactionModel;
import com.project.react.repository.AccountDb;
import com.project.react.restModel.AccountResponse;
import com.project.react.service.interfaces.AccountService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountDb accountDb;

    @Override
    public List<AccountModel> getAll() {
        return accountDb.findAll();
    }

    @Override
    public List<AccountResponse> parseAllCalculated(List<AccountModel> listAccount) {
        List<AccountResponse> result = new ArrayList<AccountResponse>();
        for (AccountModel account : listAccount) {
            Long total = Long.valueOf(0);
            for (TransactionModel transaction : account.getTransactionList())
                total += transaction.getValue() * (transaction.getType() ? 1 : -1);
            result.add(new AccountResponse(account.getId(), account.getName(), account.getColor(), account.getFavIcon(),
                    total));
        }
        return result;
    }

    @Override
    public Optional<AccountModel> getById(String id) {
        return accountDb.findById(id);
    }

    @Override
    public AccountModel save(AccountModel account) {
        return accountDb.save(account);
    }

    @Override
    public void delete(AccountModel account) {
        accountDb.delete(account);
    }
}