package com.project.react.restModel;

import java.time.LocalDate;
import java.util.Optional;

public class TransactionRequest {
    private Optional<String> id;
    private Optional<String> name;
    private Optional<Boolean> type;
    private Optional<Long> value;
    private Optional<LocalDate> date; // yyyy-mm-dd
    private Optional<String> categoryId;
    private Optional<String> accountId;

    public TransactionRequest() {
        this("", "", true, Long.valueOf(10), "2020-02-20", "", "");
    }

    public TransactionRequest(String id, String name, Boolean type, Long value, String date, String categoryId,
                              String accountId) {
        this.id = Optional.of(id);
        this.name = Optional.of(name);
        this.type = Optional.of(type);
        this.value = Optional.of(value);
        this.date = Optional.of(LocalDate.parse(date));
        this.categoryId = Optional.of(categoryId);
        this.accountId = Optional.of(accountId);
    }

    public Optional<String> getId() {
        return id;
    }

    public void setId(Optional<String> id) {
        this.id = id;
    }

    public Optional<String> getName() {
        return name;
    }

    public void setName(Optional<String> name) {
        this.name = name;
    }

    public Optional<Long> getValue() {
        return value;
    }

    public void setValue(Optional<Long> value) {
        this.value = value;
    }

    public Optional<LocalDate> getDate() {
        return date;
    }

    public void setDate(Optional<LocalDate> date) {
        this.date = date;
    }

    public Optional<String> getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Optional<String> categoryId) {
        this.categoryId = categoryId;
    }

    public Optional<String> getAccountId() {
        return accountId;
    }

    public void setAccountId(Optional<String> accountId) {
        this.accountId = accountId;
    }

    public Optional<Boolean> getType() {
        return type;
    }

    public void setType(Optional<Boolean> type) {
        this.type = type;
    }
}