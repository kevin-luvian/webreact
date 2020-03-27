package com.project.react.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.react.model.Model;

@Repository
public interface ModelDb extends JpaRepository<Model, String>{
}
