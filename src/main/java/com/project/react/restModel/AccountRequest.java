package com.project.react.restModel;

import java.util.Optional;

public class AccountRequest {
    private Optional<String> id;
    private Optional<String> name;
    private Optional<String> color;
    private Optional<String> favIcon;

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
}