package com.project.react.service.interfaces;

import java.util.List;
import java.util.Optional;

import com.project.react.model.AccountModel;
import com.project.react.restModel.AccountResponse;

public interface AccountService {
    List<AccountModel> getAll();
    List<AccountResponse> parseAllCalculated(List<AccountModel> listAccount);
    Optional<AccountModel> getById(String id);
    AccountModel save(AccountModel account);
    void delete(AccountModel account);
}
