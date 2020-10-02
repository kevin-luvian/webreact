package com.project.react.restModel;

import com.project.react.model.AccountModel;
import com.project.react.model.CategoryModel;
import com.project.react.model.TargetModel;

import java.util.Optional;

public class TargetResponse {
    private Optional<String> id;
    private Optional<String> name;
    private Optional<Long> value;
    private Optional<Long> currentAmount;
    private Optional<CategoryModel> categoryModel;
    private Optional<AccountModel> accountModel;

    public TargetResponse(TargetModel target, Long currentAmount) {
        this(target.getId(), target.getName(), target.getValue(), currentAmount, target.getCategoryModel(), target.getAccountModel());
    }

    public TargetResponse(String id, String name, Long value, Long currentAmount, CategoryModel categoryModel, AccountModel accountModel) {
        this.id = Optional.of(id);
        this.name = Optional.of(name);
        this.value = Optional.of(value);
        this.currentAmount = Optional.of(currentAmount);
        this.categoryModel = Optional.of(categoryModel);
        this.accountModel = Optional.of(accountModel);
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

    public Optional<Long> getCurrentAmount() {
        return currentAmount;
    }

    public void setCurrentAmount(Optional<Long> currentAmount) {
        this.currentAmount = currentAmount;
    }

    public Optional<CategoryModel> getCategoryModel() {
        return categoryModel;
    }

    public void setCategoryModel(Optional<CategoryModel> categoryModel) {
        this.categoryModel = categoryModel;
    }

    public Optional<AccountModel> getAccountModel() {
        return accountModel;
    }

    public void setAccountModel(Optional<AccountModel> accountModel) {
        this.accountModel = accountModel;
    }
}