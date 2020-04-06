package com.project.react.restModel;

import java.util.Optional;

public class CategoryRequest {
    private Optional<String> id;
    private Optional<String> name;
    private Optional<String> color;

    public CategoryRequest(String id, String name, String color) {
        this.id = Optional.of(id);
        this.name = Optional.of(name);
        this.color = Optional.of(color);
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

    public Optional<String> getId() {
        return id;
    }

    public void setId(Optional<String> id) {
        this.id = id;
    }

}