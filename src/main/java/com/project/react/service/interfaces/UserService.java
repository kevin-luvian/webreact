package com.project.react.service.interfaces;

import java.util.List;

import com.project.react.model.User;
import com.project.react.model.UserModel;

public interface UserService {
    String encrypt(String rawPassword);
    List<UserModel> getAll();
    UserModel getById(String id);
    UserModel getByUsername(String username);
    User getUserByUsername(String username);
    UserModel save(UserModel user);
    User saveUser(User user);
    UserModel create(UserModel user);
    void delete(UserModel user);
    UserModel getLoggedUser();
}
