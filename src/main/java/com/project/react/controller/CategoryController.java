package com.project.react.controller;

import com.project.react.service.interfaces.CategoryService;
import com.project.react.service.interfaces.UserService;

import java.util.List;
import java.util.NoSuchElementException;

import javax.validation.Valid;

import com.project.react.model.CategoryModel;
import com.project.react.restModel.BaseResponse;
import com.project.react.restModel.CategoryRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = {"http://mywallet.atkev.site", "http://localhost:3000"})
// @CrossOrigin(origins = {"http://mywallet.atkev.site"})
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    @GetMapping(value = "/all")
    private ResponseEntity<?> retrieveAll(@AuthenticationPrincipal UserDetails userDetails) {
        List<CategoryModel> categories = userService.getByUsername(userDetails.getUsername()).get().getCategoryList();
        return ResponseEntity.ok().body(
                new BaseResponse<List<CategoryModel>>(200, userDetails.getUsername() + "'s category list", categories));
    }

    @RequestMapping(value = "/template")
    private ResponseEntity<?> getTemplate() {
        return ResponseEntity.ok()
                .body(new BaseResponse<CategoryModel>(200, "empty category template", new CategoryModel()));
    }

    @GetMapping
    private ResponseEntity<?> getModel(@AuthenticationPrincipal UserDetails userDetails, @Valid @RequestBody String id) {
        try {
            CategoryModel category = categoryService.getById(id).get();
            if (category.getUserModel().equals(userService.getByUsername(userDetails.getUsername()).get())) {
                return ResponseEntity.ok()
                        .body(new BaseResponse<CategoryModel>(200, "category successfully deleted", category));
            }
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "request is unauthorized", null));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "no such element exception", ""));
        }
    }

    @PutMapping
    ResponseEntity<?> putModel(@AuthenticationPrincipal UserDetails userDetails,
                               @Valid @RequestBody CategoryRequest request) {
        try {
            if (request.getId().get().trim().isEmpty() || request.getName().get().trim().isEmpty()
                    || request.getColor().get().trim().isEmpty()) {
                throw new NullPointerException();
            }
            CategoryModel category = categoryService.update(request,
                    userService.getByUsername(userDetails.getUsername()).get());
            return ResponseEntity.ok().body(new BaseResponse<Object>(200, "category successfully updated", category));
        } catch (AccessDeniedException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "request is unauthorized", ""));
        } catch (NullPointerException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "null pointer exception", ""));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "no such element exception", ""));
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteModel(@AuthenticationPrincipal UserDetails userDetails,
                                         @Valid @RequestBody String id) {
        try {
            CategoryModel category = categoryService.delete(id,
                    userService.getByUsername(userDetails.getUsername()).get());
            return ResponseEntity.ok()
                    .body(new BaseResponse<CategoryModel>(200, "category successfully deleted", category));
        } catch (AccessDeniedException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "request is unauthorized", ""));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "no such element exception", ""));
        }
    }

    @PostMapping
    public ResponseEntity<?> postModel(@AuthenticationPrincipal UserDetails userDetails,
                                       @Valid @RequestBody CategoryRequest request) {
        try {
            if (request.getName().get().trim().isEmpty() || request.getColor().get().trim().isEmpty()) {
                throw new NullPointerException();
            }
            CategoryModel category = categoryService.create(request,
                    userService.getByUsername(userDetails.getUsername()).get());
            return ResponseEntity.ok().body(new BaseResponse<Object>(200, "category successfully created", category));
        } catch (NullPointerException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "null pointer exception", ""));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "no such element exception", ""));
        }
    }
}