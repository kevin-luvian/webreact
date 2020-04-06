package com.project.react.service.interfaces;

import java.util.List;
import java.util.Optional;

import com.project.react.model.UserModel;
import com.project.react.restModel.UserRequest;

public interface UserService {
    List<UserModel> getAll();
    Optional<UserModel> getById(String id);
    Optional<UserModel> getByUsername(String username);
    UserModel create(UserRequest request);
    UserModel update(UserRequest request);
    UserModel save(UserModel user);
    UserModel delete(String id);
}
