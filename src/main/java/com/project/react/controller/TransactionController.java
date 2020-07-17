package com.project.react.controller;

import com.project.react.service.interfaces.AccountService;
import com.project.react.service.interfaces.CategoryService;
import com.project.react.service.interfaces.TransactionService;
import com.project.react.service.interfaces.UserService;

import java.util.List;
import java.util.NoSuchElementException;

import javax.validation.Valid;

import com.project.react.model.AccountModel;
import com.project.react.model.CategoryModel;
import com.project.react.model.TransactionModel;
import com.project.react.model.UserModel;
import com.project.react.restModel.BaseResponse;
import com.project.react.restModel.TransactionListRequest;
import com.project.react.restModel.TransactionRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
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
//@CrossOrigin(origins = {"http://mywallet.atkev.site", "http://localhost:8080", "http://localhost:3000"})
@CrossOrigin(origins = {"http://mywallet.atkev.site"})
@RequestMapping("/api/transaction")
public class TransactionController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private UserService userService;

    @GetMapping(value = "/all")
    private ResponseEntity<?> retrieveAll(@AuthenticationPrincipal UserDetails userDetails) {
        List<TransactionModel> transactions = userService.getByUsername(userDetails.getUsername()).get()
                .getTransactionList();
        return ResponseEntity.ok().body(new BaseResponse<List<TransactionModel>>(200,
                userDetails.getUsername() + "'s transaction list", transactions));
    }

    @GetMapping(value = "/template")
    private ResponseEntity<?> getTemplate() {
        return ResponseEntity.ok().body(
                new BaseResponse<TransactionRequest>(200, "empty transaction template", new TransactionRequest()));
    }

    @PostMapping(value = "/betweendate")
    private ResponseEntity<?> retrieveByDate(@AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody TransactionListRequest request) {
        UserModel user = userService.getByUsername(userDetails.getUsername()).get();
        List<TransactionModel> transactions = transactionService.getBetween(user, request.getStartDate().get(),
                request.getEndDate().get());
        return ResponseEntity.ok()
                .body(new BaseResponse<Object>(200, userDetails.getUsername() + "'s transaction list", transactions));
    }

    @PostMapping
    public ResponseEntity<?> postModel(@AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody TransactionRequest request) {
        try {
            if (request.getName().get().trim().isEmpty() || request.getAccountId().get().trim().isEmpty()
                    || request.getCategoryId().get().trim().isEmpty())
                throw new NullPointerException();
            UserModel user = userService.getByUsername(userDetails.getUsername()).get();
            AccountModel account = accountService.getById(request.getAccountId().get()).get();
            CategoryModel category = categoryService.getById(request.getCategoryId().get()).get();
            TransactionModel transaction = transactionService.create(request, account, category, user);
            return ResponseEntity.ok()
                    .body(new BaseResponse<TransactionModel>(200, "transaction successfully created", transaction));
        } catch (AccessDeniedException e) {
            return ResponseEntity.badRequest()
                    .body(new BaseResponse<String>(400, "request is unauthorized", e.getMessage()));
        } catch (NullPointerException e) {
            return ResponseEntity.badRequest()
                    .body(new BaseResponse<String>(400, "null pointer exception", e.getMessage()));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest()
                    .body(new BaseResponse<String>(400, "no such element exception", e.getMessage()));
        }
    }

    @PutMapping
    ResponseEntity<?> putModel(@AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody TransactionRequest request) {
        try {
            if (request.getId().get().trim().isEmpty() || request.getName().get().trim().isEmpty()
                    || request.getAccountId().get().trim().isEmpty()
                    || request.getCategoryId().get().trim().isEmpty()) {
                throw new NullPointerException(" id or name or account or category is null ");
            }
            UserModel user = userService.getByUsername(userDetails.getUsername()).get();
            AccountModel account = accountService.getById(request.getAccountId().get()).get();
            CategoryModel category = categoryService.getById(request.getCategoryId().get()).get();
            TransactionModel transaction = transactionService.update(request, account, category, user);
            return ResponseEntity.ok()
                    .body(new BaseResponse<TransactionModel>(200, "category successfully updated", transaction));
        } catch (AccessDeniedException e) {
            return ResponseEntity.badRequest()
                    .body(new BaseResponse<Object>(400, "request is unauthorized", e.getMessage()));
        } catch (NullPointerException e) {
            return ResponseEntity.badRequest()
                    .body(new BaseResponse<Object>(400, "null pointer exception", e.getMessage()));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest()
                    .body(new BaseResponse<Object>(400, "no such element exception", e.getMessage()));
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteModel(@AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody String id) {
        try {
            TransactionModel transaction = transactionService.delete(id,
                    userService.getByUsername(userDetails.getUsername()).get());
            return ResponseEntity.ok()
                    .body(new BaseResponse<TransactionModel>(200, "transaction successfully deleted", transaction));
        } catch (AccessDeniedException e) {
            return ResponseEntity.badRequest()
                    .body(new BaseResponse<String>(400, "request is unauthorized", e.getMessage()));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest()
                    .body(new BaseResponse<String>(400, "no such element exception", e.getMessage()));
        }
    }
}