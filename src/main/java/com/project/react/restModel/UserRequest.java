package com.project.react.restModel;

import java.util.Optional;

public class UserRequest {
    private Optional<String> adminPassword;
    private Optional<String> id;
    private Optional<String> username;
    private Optional<String> password;
    private Optional<String> role;

    public UserRequest(String adminPassword, String id, String username, String password, String role) {
        this.adminPassword = Optional.of(adminPassword);
        this.id = Optional.of(id);
        this.username = Optional.of(username);
        this.password = Optional.of(password);
        this.role = Optional.of(role);
    }

    public Optional<String> getAdminPassword() {
        return adminPassword;
    }

    public void setAdminPassword(Optional<String> adminPassword) {
        this.adminPassword = adminPassword;
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

    public Optional<String> getRole() {
        return role;
    }

    public void setRole(Optional<String> role) {
        this.role = role;
    }
}