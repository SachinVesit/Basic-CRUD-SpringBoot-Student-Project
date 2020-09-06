package com.darkhorse.model;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonSetter;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int id;
	private String username;
	private String password;
	private String fullName;
	private String email;
	private String employeeCode;
	private String department;
	@JsonSetter
	private List<Role> roles;
}
