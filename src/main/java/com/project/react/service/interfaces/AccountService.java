package com.project.react.service.interfaces;

import java.util.List;

import com.project.react.model.AccountModel;

public interface AccountService {
    List<AccountModel> getAll();
    AccountModel getById(Long id);
    AccountModel save(AccountModel account);
    void delete(AccountModel account);
}
