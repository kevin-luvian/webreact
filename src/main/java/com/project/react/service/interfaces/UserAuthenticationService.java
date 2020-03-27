package com.project.react.service.interfaces;

import java.util.Optional;

import com.project.react.model.UserModel;
import com.project.react.restModel.BaseResponse;

public interface UserAuthenticationService {

    BaseResponse<String> login(String username, String password);
    boolean matchPassword(UserModel user, String rawPassword);
    Optional<UserModel> findByToken(String token);
    BaseResponse<Boolean> logout(String token);
}