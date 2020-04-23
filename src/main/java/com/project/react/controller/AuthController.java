package com.project.react.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.GrantedAuthority;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

import javax.validation.Valid;

import com.project.react.model.UserModel;
import com.project.react.restModel.AuthResponse;
import com.project.react.restModel.BaseResponse;
import com.project.react.security.jwtAuth.AuthenticationRequest;
import com.project.react.security.jwtAuth.JwtTokenProvider;
import com.project.react.service.interfaces.UserService;

import static org.springframework.http.ResponseEntity.ok;
import static java.util.stream.Collectors.toList;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserService userService;

    @PostMapping("/signin")
    public BaseResponse<?> signin(@RequestBody AuthenticationRequest data) {
        try {
            String username = data.getUsername();
            Optional<UserModel> user = userService.getByUsername(username);
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, data.getPassword()));
            String token = jwtTokenProvider.createToken(username, user
                    .orElseThrow(() -> new UsernameNotFoundException("Username " + username + "not found")).getRoles());
            AuthResponse response = new AuthResponse(user.get().getId(), username, user.get().getRoles(), token);
            return new BaseResponse<AuthResponse>(200, "sign in success", response);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username/password supplied");
        }
    }

    @GetMapping("/check")
    public BaseResponse<String> currentUser(@AuthenticationPrincipal UserDetails userDetails) {
        return new BaseResponse<String>(200, "token is valid", userDetails.getUsername());
    }

    @PostMapping("/validate-admin")
    public ResponseEntity<?> validateAdmin(@AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody Map<String, String> request) {
        try {
            UserModel currentUser = userService.getByUsername(userDetails.getUsername()).get();
            if (userService.checkPassword(currentUser, request.get("password")))
                return ResponseEntity.ok().body(new BaseResponse<Object>(200, "admin is valid", userDetails));
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "request is unauthorized", ""));
        } catch (NullPointerException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "null pointer exception", ""));
        }
    }
}