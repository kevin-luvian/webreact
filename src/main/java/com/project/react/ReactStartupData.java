package com.project.react;

import java.util.Arrays;

import com.project.react.model.UserModel;
import com.project.react.service.interfaces.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class ReactStartupData implements ApplicationRunner {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(ApplicationArguments args) throws Exception {        
        if(!userService.getByUsername("admin").isPresent()){
            UserModel user = new UserModel();
            user.setUsername("admin");
            user.setPassword(this.passwordEncoder.encode("password"));
            user.setRoles(Arrays.asList( "ROLE_ADMIN"));
            userService.save(user);
        }

        if(!userService.getByUsername("user").isPresent()){
            UserModel user = new UserModel();
            user.setUsername("user");
            user.setPassword(this.passwordEncoder.encode("password"));
            user.setRoles(Arrays.asList( "ROLE_USER"));
            userService.save(user);
        }

        if(!userService.getByUsername("bob").isPresent()){
            UserModel user = new UserModel();
            user.setUsername("bob");
            user.setPassword(this.passwordEncoder.encode("password"));
            user.setRoles(Arrays.asList( "ROLE_USER"));
            userService.save(user);
        }
    }
}