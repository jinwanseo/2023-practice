package com.rainbow.task.entity;

import com.rainbow.common.entity.CoreEntity;
import com.rainbow.user.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "works")
public class Work extends CoreEntity {

    @Schema(name = "업무 할당 유저 목록")
    @OneToMany(mappedBy = "work")
    private List<User> users = new ArrayList<>();

    @Schema(name = "할당 멉무")
    @OneToOne(mappedBy = "work")
    private Task task;
}
