package com.project.react.controller;

import com.project.react.service.interfaces.AccountService;
import com.project.react.service.interfaces.UserService;

import java.util.List;
import java.util.NoSuchElementException;

import javax.validation.Valid;

import com.project.react.model.AccountModel;
import com.project.react.model.TransactionModel;
import com.project.react.restModel.AccountRequest;
import com.project.react.restModel.AccountResponse;
import com.project.react.restModel.BaseResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private UserService userService;

    @GetMapping(value = "/all")
    private ResponseEntity<?> retrieveAll(@AuthenticationPrincipal UserDetails userDetails) {
        List<AccountModel> accounts = userService.getByUsername(userDetails.getUsername()).get().getAccountList();
        return ResponseEntity.ok().body(
                new BaseResponse<List<AccountModel>>(200, userDetails.getUsername() + "'s account list", accounts));
    }

    @GetMapping(value = "/all/calculated")
    private ResponseEntity<?> retrieveAllCalculated(@AuthenticationPrincipal UserDetails userDetails) {
        List<AccountModel> accounts = userService.getByUsername(userDetails.getUsername()).get().getAccountList();
        List<AccountResponse> result = accountService.parseAllCalculated(accounts);
        return ResponseEntity.ok().body(new BaseResponse<List<AccountResponse>>(200,
                userDetails.getUsername() + "'s account list calculated", result));
    }

    @RequestMapping(value = "/template")
    private ResponseEntity<?> getTemplate() {
        return ResponseEntity.ok()
                .body(new BaseResponse<AccountModel>(200, "empty account template", new AccountModel()));
    }

    @PostMapping
    public ResponseEntity<?> postModel(@AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody AccountRequest request) {
        try {
            if (request.getName().get().trim().isEmpty() || request.getColor().get().trim().isEmpty())
                throw new NullPointerException();

            AccountModel account = new AccountModel();
            account.setName(request.getName().get());
            account.setColor(request.getColor().get());
            account.setFavIcon(request.getFavIcon().get());
            account.setUserModel(userService.getByUsername(userDetails.getUsername()).get());
            return ResponseEntity.ok()
                    .body(new BaseResponse<Object>(200, "account successfully created", accountService.save(account)));
        } catch (NullPointerException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "null pointer exception", ""));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "no such element exception", ""));
        }
    }

    @PutMapping
    ResponseEntity<?> putModel(@AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody AccountRequest request) {
        try {
            if (request.getId().get().trim().isEmpty() || request.getName().get().trim().isEmpty()
                    || request.getColor().get().trim().isEmpty()) {
                throw new NullPointerException();
            }
            AccountModel account = accountService.getById(request.getId().get()).get();
            if (account.getUserModel().equals(userService.getByUsername(userDetails.getUsername()).get())) {
                account.setName(request.getName().get());
                account.setColor(request.getColor().get());
                account.setFavIcon(request.getFavIcon().get());
                return ResponseEntity.ok().body(
                        new BaseResponse<Object>(200, "account successfully updated", accountService.save(account)));
            }
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "request is unauthorized", ""));
        } catch (NullPointerException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "null pointer exception", ""));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "no such element exception", ""));
        }
    }

    @GetMapping
    private ResponseEntity<?> getModel(@AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody String id) {
        try {
            AccountModel account = accountService.getById(id).get();
            if (account.getUserModel().equals(userService.getByUsername(userDetails.getUsername()).get())) {
                return ResponseEntity.ok().body(new BaseResponse<AccountModel>(200, "account item", account));
            }
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "request is unauthorized", null));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "no such element exception", ""));
        }
    }

    @PostMapping(value = "/transactions")
    private ResponseEntity<?> getAccountTransactions(@AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody String id) {
        try {
            id = id.replace("=", "");
            AccountModel account = accountService.getById(id).get();
            if (account.getUserModel().equals(userService.getByUsername(userDetails.getUsername()).get())) {
                List<TransactionModel> transactions = account.getTransactionList();
                return ResponseEntity.ok().body(new BaseResponse<List<TransactionModel>>(200,
                        account.getName() + " transaction list", transactions));
            }
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "request is unauthorized", null));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "no such element exception", ""));
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteModel(@AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody String id) {
        try {
            AccountModel account = accountService.getById(id).get();
            if (account.getUserModel().equals(userService.getByUsername(userDetails.getUsername()).get())) {
                accountService.delete(account);
                return ResponseEntity.ok()
                        .body(new BaseResponse<AccountModel>(200, "account successfully deleted", account));
            }
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "request is unauthorized", null));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "no such element exception", ""));
        }
    }
}