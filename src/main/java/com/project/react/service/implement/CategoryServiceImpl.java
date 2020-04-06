package com.project.react.service.implement;

import java.util.List;
import java.util.Optional;

import com.project.react.model.CategoryModel;
import com.project.react.model.UserModel;
import com.project.react.repository.CategoryDb;
import com.project.react.restModel.CategoryRequest;
import com.project.react.service.interfaces.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryDb categoryDb;

    @Override
    public List<CategoryModel> getAll() {
        return categoryDb.findAll();
    }

    @Override
    public Optional<CategoryModel> getById(String id) {
        return categoryDb.findById(id);
    }

    @Override
    public CategoryModel create(CategoryRequest request, UserModel user) {
        CategoryModel category = new CategoryModel();
        category.setName(request.getName().get());
        category.setColor(request.getColor().get());
        category.setUserModel(user);
        return categoryDb.save(category);
    }

    @Override
    public CategoryModel update(CategoryRequest request, UserModel user) {
        CategoryModel category = getById(request.getId().get()).get();
        if (!category.getUserModel().equals(user)) {
            throw new AccessDeniedException("unauthorized");
        }
        category.setName(request.getName().get());
        category.setColor(request.getColor().get());
        return categoryDb.save(category);
    }

    @Override
    public CategoryModel save(CategoryModel category) {
        return categoryDb.save(category);
    }

    @Override
    public CategoryModel delete(String id, UserModel user) {
        CategoryModel category = getById(id).get();
        if (!category.getUserModel().equals(user)) {
            throw new AccessDeniedException("unauthorized");
        }
        categoryDb.delete(category);
        return category;
    }
}