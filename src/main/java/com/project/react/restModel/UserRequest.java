package com.project.react.restModel;

import java.util.Optional;

public class UserRequest {
    private Optional<String> id;
    private Optional<String> username;
    private Optional<String> password;
    private Optional<String> newPassword;
    private Optional<String> role;

    public UserRequest(String id, String username, String password, String newPassword, String role) {
        this.id = Optional.of(id);
        this.username = Optional.of(username);
        this.password = Optional.of(password);
        this.newPassword = Optional.of(newPassword);
        this.role = Optional.of(role);
    }

    public Optional<String> getId() {
        return id;
    }

    public void setId(Optional<String> id) {
        this.id = id;
    }

    public Optional<String> getUsername() {
        return username;
    }

    public void setUsername(Optional<String> username) {
        this.username = username;
    }

    public Optional<String> getPassword() {
        return password;
    }

    public void setPassword(Optional<String> password) {
        this.password = password;
    }

    public Optional<String> getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(Optional<String> newPassword) {
        this.newPassword = newPassword;
    }

    public Optional<String> getRole() {
        return role;
    }

    public void setRole(Optional<String> role) {
        this.role = role;
    }

}