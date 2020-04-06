package com.project.react.service.interfaces;

import java.util.List;
import java.util.Optional;

import com.project.react.model.CategoryModel;
import com.project.react.model.UserModel;
import com.project.react.restModel.CategoryRequest;

public interface CategoryService {
    List<CategoryModel> getAll();

    Optional<CategoryModel> getById(String id);

    CategoryModel save(CategoryModel category);

    CategoryModel create(CategoryRequest request, UserModel user);

    CategoryModel update(CategoryRequest request, UserModel user);

    CategoryModel delete(String id, UserModel user);
}
