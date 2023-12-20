package com.rainbow.task.entity;

import com.rainbow.common.entity.CoreEntity;
import com.rainbow.team.entity.Team;
import com.rainbow.user.entity.User;
import jakarta.persistence.*;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "tasks")
public class Task extends CoreEntity {

    private String title;
    private Boolean useYn;
    private Boolean operateYn;
    private Boolean recordYn;
    private Boolean deployYn;
    private Integer rpaScriptId;

    @Column(name = "task_order")
    private Integer order;

    /* 관계형 설정 */
    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    // 이건 어쩔수 없이 1: n 관계 주인으로 만듦 나중에 기회 되면 변경
    @OneToMany
    @JoinColumn(name = "task_id")
    private List<User> managers;

    @ManyToOne
    @JoinColumn(name = "created_by_id")
    private User createdBy;

    @ManyToOne
    @JoinColumn(name = "updated_by_id")
    private User updatedBy;
}
