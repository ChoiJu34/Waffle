package com.d109.waffle.api.teamaccount.repository;

import com.d109.waffle.api.teamaccount.entity.TeamAccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamAccountRepository extends JpaRepository<TeamAccountEntity, Integer> {

}
