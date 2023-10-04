package com.d109.waffle.api.teamaccount.repository;

import com.d109.waffle.api.teamaccount.entity.InviteCodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface InviteCodeRepository extends JpaRepository<InviteCodeEntity, Integer> {
    Optional<InviteCodeEntity> findByTeamAccount_IdAndExpiredIsFalse(int teamAccountId);
    Optional<InviteCodeEntity> findByCodeAndExpiredIsFalse(String code);
    List<InviteCodeEntity> findByTeamAccount_Id(int teamAccountId);
}
