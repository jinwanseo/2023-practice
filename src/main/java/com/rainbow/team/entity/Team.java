package com.rainbow.team.entity;

import com.rainbow.common.entity.CoreEntity;
import com.rainbow.task.entity.Task;
import jakarta.persistence.*;
import java.util.Optional;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "teams")
public class Team extends CoreEntity {

    @Column(unique = true, nullable = false)
    private String name;

    @Column(name = "team_order")
    private Integer order;

    @Enumerated(EnumType.STRING)
    private TeamLevel level;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Team parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Team> children = new ArrayList<>();
}

