package com.project.react.service.interfaces;

import java.util.List;
import java.util.Optional;

import com.project.react.model.UserModel;
import com.project.react.restModel.UserRequest;

public interface UserService {
    List<UserModel> getAll();
    Optional<UserModel> getById(String id);
    Optional<UserModel> getByUsername(String username);
    Boolean checkPassword(UserModel user, String password);
    UserModel create(UserModel currentUser, UserRequest request);
    UserModel update(UserModel currentUser, UserRequest request);
    UserModel delete(UserModel currentUser, String id);
    UserModel save(UserModel user);
}
