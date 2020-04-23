package com.project.react.restModel;

import java.util.List;
import java.util.Optional;

public class AuthResponse {
    private Optional<String> id;
    private Optional<String> username;
    private Optional<List<String>> roles;
    private Optional<String> token;

    public AuthResponse(String id, String username, List<String> roles, String token) {
        this.id = Optional.of(id);
        this.username = Optional.of(username);
        this.roles = Optional.of(roles);
        this.token = Optional.of(token);
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

    public Optional<List<String>> getRoles() {
        return roles;
    }

    public void setRoles(Optional<List<String>> roles) {
        this.roles = roles;
    }

    public Optional<String> getToken() {
        return token;
    }

    public void setToken(Optional<String> token) {
        this.token = token;
    }
}