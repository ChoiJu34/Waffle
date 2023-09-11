package com.d109.waffle.api.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.d109.waffle.api.user.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

	Optional<UserEntity> findById(int id);
	Optional<UserEntity> findByEmail(String email);
	Optional<UserEntity> findByName(String name);
	Optional<UserEntity> findByRefreshToken(String refreshToken);
	boolean existsByEmail(String email);

}
