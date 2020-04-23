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

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.project.react.model.UserModel;
import com.project.react.restModel.BaseResponse;
import com.project.react.security.jwtAuth.AuthenticationRequest;
import com.project.react.security.jwtAuth.JwtTokenProvider;
import com.project.react.service.interfaces.UserService;

import static org.springframework.http.ResponseEntity.ok;

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
    public ResponseEntity<?> signin(@RequestBody AuthenticationRequest data) {
        try {
            String username = data.getUsername();
            Optional<UserModel> user = userService.getByUsername(username);
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, data.getPassword()));
            String token = jwtTokenProvider.createToken(username, user
                    .orElseThrow(() -> new UsernameNotFoundException("Username " + username + "not found")).getRoles());
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.get().getId());
            response.put("roles", user.get().getRoles());
            response.put("username", username);
            response.put("token", token);
            return ResponseEntity.ok().body(new BaseResponse<Map<String, Object>>(200, "sign in success", response));
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username/password supplied");
        }
    }

    @GetMapping("/check")
    public ResponseEntity<String> checkAuth(@AuthenticationPrincipal UserDetails userDetails) {
        return ok("auth");
    }
}