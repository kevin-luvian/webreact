package com.project.react.restModel;

import java.util.Optional;

public class AccountResponse {
    private Optional<String> id;
    private Optional<String> name;
    private Optional<String> color;
    private Optional<String> favIcon;
    private Optional<Long> total;

    public AccountResponse(String id, String name, String color, String favIcon, Long total) {
        this.id = Optional.of(id);
        this.name = Optional.of(name);
        this.color = Optional.of(color);
        this.favIcon = Optional.of(favIcon);
        this.total = Optional.of(total);
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

    public Optional<String> getColor() {
        return color;
    }

    public void setColor(Optional<String> color) {
        this.color = color;
    }

    public Optional<String> getFavIcon() {
        return favIcon;
    }

    public void setFavIcon(Optional<String> favIcon) {
        this.favIcon = favIcon;
    }

    public Optional<Long> getTotal() {
        return total;
    }

    public void setTotal(Optional<Long> total) {
        this.total = total;
    }

}