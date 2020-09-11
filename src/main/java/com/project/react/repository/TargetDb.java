package com.project.react.repository;

import com.project.react.model.TargetModel;
import com.project.react.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TargetDb extends JpaRepository<TargetModel, String> {
    List<TargetModel> findAllByUserModelOrderByNameAsc(UserModel user);
}
