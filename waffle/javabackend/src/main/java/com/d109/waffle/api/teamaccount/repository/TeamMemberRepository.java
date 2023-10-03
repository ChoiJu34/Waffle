package com.d109.waffle.api.teamaccount.repository;

import com.d109.waffle.api.teamaccount.entity.TeamMemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamMemberRepository extends JpaRepository<TeamMemberEntity, Integer> {
    List<TeamMemberEntity> findByUser_Id(int userId);
    List<TeamMemberEntity> findByTeamAccount_Id(int accountId);
}
