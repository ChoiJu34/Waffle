package com.d109.waffle.api.user.service;

import com.d109.waffle.api.user.entity.UserEntity;

public interface UserService {
	public void signUp(UserEntity userDto) throws Exception;

}
