package com.project.react.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.GeneratedValue;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table
public class UserModel implements UserDetails{

    private static final long serialVersionUID = 2396654715019746670L;

	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy="uuid")
    private String id;

    @NotNull
    @Column(name = "username", nullable = false)
    private String username;

    @NotNull
    @Column(name = "password", nullable = false)
    private String password;

    @OneToMany(mappedBy = "userModel", fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<TransactionModel> transactionList;

    @OneToMany(mappedBy = "userModel", fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<CategoryModel> categoryList;

    @OneToMany(mappedBy = "userModel", fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<AccountModel> accountList;

    public UserModel(){
        this("", "");
    }
    
    public UserModel(String username, String password){
        this.username = username;
        this.password = password;
    }

    @JsonIgnore
    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return new ArrayList<>();
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<TransactionModel> getTransactionList() {
		return transactionList;
	}

	public void setTransactionList(List<TransactionModel> transactionList) {
		this.transactionList = transactionList;
	}

	public List<CategoryModel> getCategoryList() {
		return categoryList;
	}

	public void setCategoryList(List<CategoryModel> categoryList) {
		this.categoryList = categoryList;
	}

	public List<AccountModel> getAccountList() {
		return accountList;
	}

	public void setAccountList(List<AccountModel> accountList) {
		this.accountList = accountList;
	}

    
}