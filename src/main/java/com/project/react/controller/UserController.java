package com.project.react.controller;

import com.project.react.service.interfaces.UserService;

import java.util.List;
import java.util.NoSuchElementException;

import javax.validation.Valid;

import com.project.react.model.UserModel;
import com.project.react.restModel.BaseResponse;
import com.project.react.restModel.UserRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/all")
    private ResponseEntity<?> retrieveAll(@AuthenticationPrincipal UserDetails userDetails) {
        List<UserModel> users = userService.getAll();
        return ResponseEntity.ok().body(new BaseResponse<List<UserModel>>(200, "user list", users));
    }

    @RequestMapping(value = "/template")
    private ResponseEntity<?> getTemplate() {
        return ResponseEntity.ok().body(new BaseResponse<UserModel>(200, "empty user template", new UserModel()));
    }

    @PostMapping
    public ResponseEntity<?> postModel(@AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody UserRequest request) {
        try {
            if (request.getUsername().get().trim().isEmpty() || request.getPassword().get().trim().isEmpty()) {
                throw new NullPointerException();
            }
            UserModel currentUser = userService.getByUsername(userDetails.getUsername()).get();
            UserModel user = userService.create(currentUser, request);
            return ResponseEntity.ok().body(new BaseResponse<Object>(200, "user successfully created", user));
        } catch (AccessDeniedException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "request is unauthorized", e.getStackTrace()));
        } catch (NullPointerException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "null pointer exception", e.getStackTrace()));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "no such element exception", e.getStackTrace()));
        }
    }

    @PutMapping
    ResponseEntity<?> putModel(@AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody UserRequest request) {
        try {
            if (request.getUsername().get().trim().isEmpty() || request.getNewPassword().get().trim().isEmpty()
                    || request.getPassword().get().trim().isEmpty())
                throw new NullPointerException();
            UserModel currentUser = userService.getByUsername(userDetails.getUsername()).get();
            UserModel user = userService.update(currentUser, request);
            return ResponseEntity.ok().body(new BaseResponse<Object>(200, "user successfully updated", user));
        } catch (AccessDeniedException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "request is unauthorized", e.getStackTrace()));
        } catch (NullPointerException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "null pointer exception", e.getStackTrace()));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "no such element exception", e.getStackTrace()));
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteModel(@AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody String id) {
        try {
            UserModel currentUser = userService.getByUsername(userDetails.getUsername()).get();
            UserModel user = userService.delete(currentUser, id);
            return ResponseEntity.ok().body(new BaseResponse<UserModel>(200, "user successfully deleted", user));
        } catch (AccessDeniedException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "request is unauthorized", e.getStackTrace()));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "no such element exception", e.getStackTrace()));
        }
    }
}