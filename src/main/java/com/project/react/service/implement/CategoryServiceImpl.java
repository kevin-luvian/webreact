package com.project.react.service.implement;

import java.util.List;
import java.util.Optional;

import com.project.react.model.CategoryModel;
import com.project.react.repository.CategoryDb;
import com.project.react.service.interfaces.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
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
    public CategoryModel getById(Long id) {
        Optional<CategoryModel> category = categoryDb.findById(id);
        if(category.isPresent()) return category.get();
        return null;
    }

    @Override
    public CategoryModel save(CategoryModel category) {
        return categoryDb.save(category);
    }

    @Override
    public void delete(CategoryModel category) {
        categoryDb.delete(category);
    }
}