package com.d109.waffle.api.user.service;

import com.d109.waffle.api.user.entity.UserEntity;

public interface UserService {
	public void signUp(UserEntity userEntity) throws Exception;

	public void verifyEmail(String email) throws Exception;
}
