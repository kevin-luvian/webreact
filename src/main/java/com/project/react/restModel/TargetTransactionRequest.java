package com.project.react.restModel;

import java.time.LocalDate;
import java.util.Optional;

public class TargetTransactionRequest {
    private Optional<String> targetId;
    private Optional<Long> amount;
    private Optional<LocalDate> date;

    public TargetTransactionRequest(String targetId, Long amount, LocalDate date) {
        this.targetId = Optional.of(targetId);
        this.amount = Optional.of(amount);
        this.date = Optional.of(date);
    }

    public Optional<String> getTargetId() {
        return targetId;
    }

    public void setTargetId(Optional<String> targetId) {
        this.targetId = targetId;
    }

    public Optional<Long> getAmount() {
        return amount;
    }

    public void setAmount(Optional<Long> amount) {
        this.amount = amount;
    }

    public Optional<LocalDate> getDate() {
        return date;
    }

    public void setDate(Optional<LocalDate> date) {
        this.date = date;
    }
}