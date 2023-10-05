package com.d109.waffle.api.teamaccount.repository;

import com.d109.waffle.api.teamaccount.entity.TeamMemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeamMemberRepository extends JpaRepository<TeamMemberEntity, Integer> {
    List<TeamMemberEntity> findByUser_Id(int userId);
    List<TeamMemberEntity> findByTeamAccount_Id(int accountId);
    Boolean existsByUser_IdAndTeamAccount_Id(int userId, int accountId);
    Optional<TeamMemberEntity> findByUser_IdAndTeamAccount_Id(int userId, int accountId);
}
