package com.project.react.service.implement;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.project.react.model.UserModel;
import com.project.react.repository.UserDb;
import com.project.react.restModel.UserRequest;
import com.project.react.service.interfaces.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDb userDb;

    @Override
    public List<UserModel> getAll() {
        return userDb.findAll();
    }

    @Override
    public Optional<UserModel> getById(String id) {
        return userDb.findById(id);
    }

    @Override
    public Optional<UserModel> getByUsername(String username) {
        return userDb.findByUsername(username);
    }

    @Override
    public UserModel create(UserModel currentUser, UserRequest request) {
        if (!currentUser.getRoles().contains("ROLE_ADMIN") || !checkPassword(currentUser,request.getAdminPassword().get()))
            throw new AccessDeniedException("unauthorized");
        UserModel user = new UserModel();
        user.setUsername(request.getUsername().get());
        user.setPassword(this.passwordEncoder.encode(request.getPassword().get()));
        user.setRoles(new ArrayList<>(Arrays.asList(request.getRole().get())));
        return userDb.save(user);
    }

    @Override
    public UserModel update(UserModel currentUser, UserRequest request) {
        if (!currentUser.getRoles().contains("ROLE_ADMIN") || !checkPassword(currentUser,request.getAdminPassword().get()))
            throw new AccessDeniedException("unauthorized");
        UserModel user = getById(request.getId().get()).get();
        user.setUsername(request.getUsername().get());
        user.setPassword(this.passwordEncoder.encode(request.getPassword().get()));
        user.setRoles(new ArrayList<>(Arrays.asList(request.getRole().get())));
        return userDb.save(user);
    }

    @Override
    public UserModel save(UserModel user) {
        return userDb.save(user);
    }

    @Override
    public UserModel delete(UserModel currentUser, String id) {
        if (!currentUser.getRoles().contains("ROLE_ADMIN"))
            throw new AccessDeniedException("unauthorized");
        UserModel user = getById(id).get();
        userDb.delete(user);
        return user;
    }

    @Override
    public Boolean checkPassword(UserModel user, String password) {
        return passwordEncoder.matches(password, user.getPassword());
    }
}