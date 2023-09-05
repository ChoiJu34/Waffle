package com.d109.waffle.api.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserDto, Integer> {

	Optional<UserDto> findById(int id);
	Optional<UserDto> findByEmail(String email);
	Optional<UserDto> findByName(String name);
	Optional<UserDto> findByRefreshToken(String refreshToken);
	boolean existsByEmail(String email);

}

