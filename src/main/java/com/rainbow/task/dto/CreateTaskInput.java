package com.rainbow.task.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateTaskInput {

    private String title;
    private Boolean useYn;
    private Integer rpaScriptId;
    private Integer order;
    private Long teamId;
    private List<Long> managerPkList = new ArrayList<>();
}
