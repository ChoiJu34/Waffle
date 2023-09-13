package com.d109.waffle.api.user.service;

import com.d109.waffle.api.user.dto.UpdateUserDto;
import com.d109.waffle.api.user.entity.UserEntity;

public interface UserService {
	public void signUp(UserEntity userEntity) throws Exception;

	public void verifyEmail(String email) throws Exception;

	public String findEmail(String name, String tel) throws Exception;

	public void findPassword(String email) throws Exception;

	public void updatePassword(String token, String newPassword) throws Exception;

	void updateUser(String authorization, UpdateUserDto updateUserDto) throws Exception;

	void saveUserUuid(String authorization, String uuid) throws Exception;
}
