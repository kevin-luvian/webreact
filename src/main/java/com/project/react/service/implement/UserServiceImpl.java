package com.project.react.service.implement;

import java.util.List;
import java.util.Optional;

import javax.persistence.Lob;

import com.project.react.model.User;
import com.project.react.model.UserModel;
import com.project.react.repository.UserDb;
import com.project.react.repository.UserRepository;
import com.project.react.service.interfaces.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDb userDb;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Lob
    public String encrypt(String rawPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(rawPassword);
        return hashedPassword;
    }

    @Override
    public List<UserModel> getAll() {
        return userDb.findAll();
    }

    @Override
    public UserModel getById(String id) {
        Optional<UserModel> user = userDb.findById(id);
        if (user.isPresent())
            return user.get();
        return null;
    }

    @Override
    public UserModel getByUsername(String username) {
        return userDb.findByUsername(username);
    }

    @Override
    public User getUserByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return user.get();
        }
        return null;
    }

    @Override
    public UserModel save(UserModel user) {
        return userDb.save(user);
    }

    @Override
    public UserModel create(UserModel user) {
        String rawPassword = user.getPassword();
        String hash = encrypt(rawPassword);
        user.setPassword(hash);
        return save(user);
    }

    @Override
    public void delete(UserModel user) {
        userDb.delete(user);
    }

    @Override
    public UserModel getLoggedUser() {
        try {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            String username = null;

            if (principal instanceof UserDetails) {
                username = ((UserDetails) principal).getUsername();
            } else {
                username = principal.toString();
            }
            return this.getByUsername(username);
        } catch (NullPointerException e) {
            return null;
        }
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }
}