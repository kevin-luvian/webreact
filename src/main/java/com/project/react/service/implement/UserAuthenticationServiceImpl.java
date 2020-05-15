package com.project.react.service.implement;

import com.project.react.model.UserModel;
import com.project.react.restModel.BaseResponse;
import com.project.react.service.interfaces.UserAuthenticationService;
import com.project.react.service.interfaces.UserService;

import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import static lombok.AccessLevel.PACKAGE;
import static lombok.AccessLevel.PRIVATE;

@Service
@AllArgsConstructor(access = PACKAGE)
@FieldDefaults(level = PRIVATE, makeFinal = true)
final class UserAuthenticationServiceImpl implements UserAuthenticationService {
    final Map<String, String> tokens = new HashMap<String, String>();

    @Autowired
    private UserService userService;

    private String generateUUID() {
        String uuid = UUID.randomUUID().toString();
        return uuid;
    }

    @Override
    public BaseResponse<String> login(final String username, final String password) {
        try {
            UserModel user = userService.getByUsername(username).get();
            if (matchPassword(user, password)) {
                String token = generateUUID();
                tokens.put(token, username);
                int i = 0;
                for (String key : tokens.keySet()) {
                    System.out.println("(login) " + i++ + ". " + tokens.get(key) + " : " + key);
                }
                return new BaseResponse<String>(200, "success", token);
            } else {
                return new BaseResponse<String>(401, "password incorrect", "");
            }
        } catch (NullPointerException e) {
            return new BaseResponse<String>(401, "user is invalid", "");
        }
    }

    @Override
    public boolean matchPassword(UserModel user, String rawPassword) {
        String encodedPassword = user.getPassword();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    @Override
    public Optional<UserModel> findByToken(final String token) {
        try {
            String username = tokens.get(token);
            return userService.getByUsername(username);
        } catch (NullPointerException e) {
            return Optional.empty();
        }
    }

    @Override
    public BaseResponse<Boolean> logout(String token) {
        BaseResponse<Boolean> response;

        int i = 0;
        for (String key : tokens.keySet()) {
            System.out.println("(logout) " + i++ + ". " + tokens.get(key) + " : " + key);
        }

        if (tokens.containsKey(token)) {
            response = new BaseResponse<Boolean>(200, "Logout successfull", true);
            tokens.remove(token);
        } else {
            response = new BaseResponse<Boolean>(401, "Token Incorrect", false);
        }
        return response;
    }
}