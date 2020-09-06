package com.darkhorse.service;

import java.util.List;

import com.darkhorse.model.User;
import com.darkhorse.model.UserDto;

public interface UserService {

	User save(UserDto user);

	List<User> findAll();

	void delete(int id);

	User findOne(String username);

	User findById(int id);

	UserDto update(UserDto userDto);
}
