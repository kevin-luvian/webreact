package com.project.react.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
      registry.addViewController("/{spring:^[a-zA-Z\d-_]+}")
            .setViewName("forward:/");
      registry.addViewController("/**/{spring:^[a-zA-Z\d-_]+}")
            .setViewName("forward:/");
      registry.addViewController("/{spring:^[a-zA-Z\d-_]+}/**{spring:?!(\\.js|\\.css)$}")
            .setViewName("forward:/");
  }
}