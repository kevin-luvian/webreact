package com.project.react.restModel;

import java.util.Date;

public class BaseResponse<T> {
    private Date timestamp;
    private int status;
    private String message;
    private T payload;

    public BaseResponse(int status, String message, T payload) {
        this.timestamp = new Date();
        this.status = status;
        this.message = message;
        this.payload = payload;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getPayload() {
        return payload;
    }

    public void setPayload(T payload) {
        this.payload = payload;
    }

}