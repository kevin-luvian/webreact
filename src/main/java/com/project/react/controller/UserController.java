package com.project.react.controller;

import com.project.react.service.interfaces.UserService;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.project.react.model.UserModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/all")
    private ResponseEntity<?> retrieveModel() {
        List<UserModel> users = userService.getAll();
        if (users == null) {
            users = new ArrayList<>();
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    private ResponseEntity<UserModel> retrieveModelById(@PathVariable String id) {
        UserModel user = userService.getById(id);
        return new ResponseEntity<UserModel>(user, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    ResponseEntity<UserModel> updateModel(@PathVariable String id, @Valid @RequestBody UserModel user) {
        user.setId(id);
        UserModel result = userService.save(user);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteModel(@PathVariable String id) {
        UserModel user = userService.getById(id);
        userService.delete(user);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "")
    public ResponseEntity<?> postModel(@Valid @RequestBody UserModel user) throws URISyntaxException {
        UserModel result = userService.create(user);
        return ResponseEntity.created(new URI("/api/user/" + result.getId())).body(result);
    }

    @GetMapping(value = "/template")
    private ResponseEntity<?> getTemplate() {
        return new ResponseEntity<>(new UserModel("",""), HttpStatus.OK);
    }

    @GetMapping(value = "")
    private ResponseEntity<?> getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String username = null;

        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        } else {
            username = principal.toString();
        }

        UserModel currentUser = userService.getByUsername(username);

        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }
}