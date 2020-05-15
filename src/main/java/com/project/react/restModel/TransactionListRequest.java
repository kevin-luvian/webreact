package com.project.react.restModel;

import java.time.LocalDate;
import java.util.Optional;

public class TransactionListRequest {
    Optional<LocalDate> startDate;
    Optional<LocalDate> endDate;

    public TransactionListRequest(String startDate, String endDate) {
        this.startDate = Optional.of(LocalDate.parse(startDate));
        this.endDate = Optional.of(LocalDate.parse(endDate));
    }

    public Optional<LocalDate> getStartDate() {
        return startDate;
    }

    public void setStartDate(Optional<LocalDate> startDate) {
        this.startDate = startDate;
    }

    public Optional<LocalDate> getEndDate() {
        return endDate;
    }

    public void setEndDate(Optional<LocalDate> endDate) {
        this.endDate = endDate;
    }
}