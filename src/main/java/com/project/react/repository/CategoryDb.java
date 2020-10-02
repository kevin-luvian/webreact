package com.project.react.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.react.model.CategoryModel;

@Repository
public interface CategoryDb extends JpaRepository<CategoryModel, String> {
}
