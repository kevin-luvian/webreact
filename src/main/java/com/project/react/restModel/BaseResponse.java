package com.project.react.restModel;

public class BaseResponse<T> {
    private int status;
    private String message;
    private T result;

    public BaseResponse(){
        this(0,null,null);
    }

    public BaseResponse(int status, String message, T result){
        this.status = status;
        this.message = message;
        this.result = result;
    }

    /**
     * @return the status
     */
    public int getStatus() {
        return status;
    }
    /**
     * @return the message
     */
    public String getMessage() {
        return message;
    }
    /**
     * @return the result
     */
    public T getResult() {
        return result;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(int status) {
        this.status = status;
    }
    /**
     * @param message the message to set
     */
    public void setMessage(String message) {
        this.message = message;
    }
    /**
     * @param result the result to set
     */
    public void setResult(T result) {
        this.result = result;
    }
}