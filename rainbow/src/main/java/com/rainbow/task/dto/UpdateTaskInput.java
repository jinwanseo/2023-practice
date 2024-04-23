package com.rainbow.task.dto;

import java.util.List;
import java.util.Optional;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Update
 */
@Getter
@Setter
@NoArgsConstructor
public class UpdateTaskInput {

    private Optional<String> title = Optional.empty();
    private Optional<Boolean> useYn = Optional.empty();
    private Optional<Integer> rpaScriptId = Optional.empty();
    private Optional<Integer> order = Optional.empty();
    private Optional<Long> teamId = Optional.empty();
    private Optional<List<Long>> managerPkList = Optional.empty();
}