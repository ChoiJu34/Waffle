package com.d109.waffle.api.teamaccount.entity;

        import com.d109.waffle.api.user.entity.UserEntity;
        import lombok.*;

        import javax.persistence.*;

@Entity
@Table(name="team_member")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class TeamMemberEntity {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "team_account_id")
    private TeamAccountEntity teamAccount;

    @Column
    private Byte master;

}


