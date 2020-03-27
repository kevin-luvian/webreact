package com.project.react.service.interfaces;

import java.util.List;

import com.project.react.model.CategoryModel;

public interface CategoryService {
    List<CategoryModel> getAll();
    CategoryModel getById(Long id);
    CategoryModel save(CategoryModel category);
    void delete(CategoryModel category);
}
