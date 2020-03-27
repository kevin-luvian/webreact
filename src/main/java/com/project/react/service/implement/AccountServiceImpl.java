package com.project.react.service.implement;

import java.util.List;
import java.util.Optional;

import com.project.react.model.AccountModel;
import com.project.react.repository.AccountDb;
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
    public AccountModel getById(Long id) {
        Optional<AccountModel> account = accountDb.findById(id);
        if(account.isPresent()) return account.get();
        return null;
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