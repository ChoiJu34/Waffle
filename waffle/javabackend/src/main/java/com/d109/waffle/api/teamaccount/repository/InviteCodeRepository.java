package com.d109.waffle.api.teamaccount.repository;

import com.d109.waffle.api.teamaccount.entity.InviteCodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InviteCodeRepository extends JpaRepository<InviteCodeEntity, Integer> {
    InviteCodeEntity findByTeamAccount_IdAndExpiredIsFalse(int teamAccountId);
}
