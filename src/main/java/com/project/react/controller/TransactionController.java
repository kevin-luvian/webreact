package com.project.react.controller;

import com.project.react.service.interfaces.TransactionService;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.project.react.model.TransactionModel;

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
@RequestMapping("/api/transaction")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping(value = "/all")
    private ResponseEntity<?> retrieveModel() {
        List<TransactionModel> transactions = transactionService.getAll();
        if (transactions == null) {
            transactions = new ArrayList<>();
        }
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    private ResponseEntity<TransactionModel> retrieveModelById(@PathVariable String id) {
        TransactionModel transaction = transactionService.getById(id);
        return new ResponseEntity<TransactionModel>(transaction, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    ResponseEntity<TransactionModel> updateModel(@PathVariable String id, @Valid @RequestBody TransactionModel transaction) {
        transaction.setId(id);
        TransactionModel result = transactionService.save(transaction);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteModel(@PathVariable String id) {
        TransactionModel transaction = transactionService.getById(id);
        transactionService.delete(transaction);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "")
    public ResponseEntity<?> postModel(@Valid @RequestBody TransactionModel transaction) throws URISyntaxException {
        TransactionModel result = transactionService.save(transaction);
        return ResponseEntity.created(new URI("/api/transaction/" + result.getId())).body(result);
    }

    @PostMapping(value = "/expense")
    public ResponseEntity<?> basicExpense(@Valid @RequestBody TransactionModel transaction) throws URISyntaxException {
        TransactionModel result = transactionService.save(transaction);
        return ResponseEntity.created(new URI("/api/transaction/" + result.getId())).body(result);
    }

    @GetMapping(value = "/template")
    private ResponseEntity<?> getTemplate() {
        return new ResponseEntity<>(new TransactionModel(), HttpStatus.OK);
    }
}