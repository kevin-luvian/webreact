package com.project.react.controller;

import com.project.react.service.interfaces.CategoryService;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.project.react.model.CategoryModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping(value = "/all")
    private ResponseEntity<?> retrieveModel() {
        List<CategoryModel> transactions = categoryService.getAll();
        if (transactions == null) {
            transactions = new ArrayList<>();
        }
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    private ResponseEntity<CategoryModel> retrieveModelById(@PathVariable Long id) {
        CategoryModel category = categoryService.getById(id);
        return new ResponseEntity<CategoryModel>(category, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    ResponseEntity<CategoryModel> updateModel(@PathVariable Long id, @Valid @RequestBody CategoryModel category) {
        category.setId(id);
        CategoryModel result = categoryService.save(category);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteModel(@PathVariable Long id) {
        CategoryModel category = categoryService.getById(id);
        categoryService.delete(category);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "")
    public ResponseEntity<?> postModel(@Valid @RequestBody CategoryModel category) throws URISyntaxException {
        System.out.println("THIS IS USER>> "+category.getUserModel().getUsername());
        CategoryModel result = categoryService.save(category);
        return ResponseEntity.created(new URI("/api/category/" + result.getId())).body(result);
    }

    @GetMapping(value = "/template")
    private ResponseEntity<?> getTemplate() {
        return new ResponseEntity<>(new CategoryModel(), HttpStatus.OK);
    }
}