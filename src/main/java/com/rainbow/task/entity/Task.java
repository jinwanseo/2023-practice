package com.rainbow.task.entity;

import com.rainbow.common.entity.CoreEntity;
import com.rainbow.team.entity.Team;
import com.rainbow.user.entity.User;
import jakarta.persistence.*;
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

    @ManyToOne
    @JoinColumn(name = "work_id")
    private Work work;

    @ManyToOne
    @JoinColumn(name = "created_by_id")
    private User createdBy;

    @ManyToOne
    @JoinColumn(name = "updated_by_id")
    private User updatedBy;
}
