package com.project.react;

import java.util.Arrays;

import com.project.react.model.User;
import com.project.react.model.UserModel;
import com.project.react.service.interfaces.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class ReactStartupData implements ApplicationRunner {

    @Autowired
    private UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;
    
    @Override
    public void run(ApplicationArguments args) throws Exception {
        if(userService.getUserByUsername("user")==null){
            User user = new User();
            user.setUsername("user");
            user.setPassword(this.passwordEncoder.encode("password"));
            user.setRoles(Arrays.asList( "ROLE_USER"));
            userService.saveUser(user);
        }

        if(userService.getByUsername("user")==null){
            UserModel user = new UserModel("user", "user123");
            userService.create(user);
        }
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}