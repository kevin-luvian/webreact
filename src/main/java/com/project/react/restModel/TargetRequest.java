package com.project.react.restModel;

import java.util.Optional;

public class TargetRequest {
    private Optional<String> id;
    private Optional<String> name;
    private Optional<Long> value;
    private Optional<String> categoryId;
    private Optional<String> accountId;

    public TargetRequest(String id, String name, Long value, String categoryId, String accountId) {
        this.id = Optional.of(id);
        this.name = Optional.of(name);
        this.value = Optional.of(value);
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
}