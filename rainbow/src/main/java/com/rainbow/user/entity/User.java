package com.rainbow.user.entity;

import com.rainbow.common.entity.CoreEntity;
import com.rainbow.team.entity.Team;
import com.rainbow.user.dto.CreateUserInput;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "users")
public class User extends CoreEntity {

    @Column(nullable = false)
    private String name;
    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true, nullable = false)
    private String loginId;
    @Column(nullable = false)
    private String loginPw;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoleType role;

    private Integer loginFailedCount;
    private LocalDateTime lastLoginDateTime;

    /* 관계형 설정 */
    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    public User(CreateUserInput createUserInput) {
        this.name = createUserInput.getName();
        this.email = createUserInput.getEmail();
        this.loginId = createUserInput.getLoginId();
        this.loginPw = createUserInput.getLoginPw();
        this.role = createUserInput.getRole();
    }

}
