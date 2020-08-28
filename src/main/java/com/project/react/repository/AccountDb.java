package com.project.react.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.react.model.AccountModel;

@Repository
public interface AccountDb extends JpaRepository<AccountModel, String> {
}
