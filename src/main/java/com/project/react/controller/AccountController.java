package com.project.react.controller;

import com.project.react.service.interfaces.AccountService;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.project.react.model.AccountModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping(value = "/all")
    private ResponseEntity<?> retrieveModel() {
        List<AccountModel> account = accountService.getAll();
        if (account == null) {
            account = new ArrayList<>();
        }
        return new ResponseEntity<>(account, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    private ResponseEntity<AccountModel> retrieveModelById(@PathVariable Long id) {
        AccountModel account = accountService.getById(id);
        return new ResponseEntity<AccountModel>(account, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    ResponseEntity<AccountModel> updateModel(@PathVariable Long id, @Valid @RequestBody AccountModel account) {
        account.setId(id);
        AccountModel newAccount = accountService.save(account);
        return ResponseEntity.ok().body(newAccount);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteModel(@PathVariable Long id) {
        AccountModel account = accountService.getById(id);
        accountService.delete(account);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "")
    public ResponseEntity<?> postModel(@Valid @RequestBody AccountModel account) throws URISyntaxException {
        AccountModel result = accountService.save(account);
        return ResponseEntity.created(new URI("/api/account/" + result.getId())).body(result);
    }

    @GetMapping(value = "/template")
    private ResponseEntity<?> getTemplate() {
        return new ResponseEntity<>(new AccountModel(), HttpStatus.OK);
    }
}