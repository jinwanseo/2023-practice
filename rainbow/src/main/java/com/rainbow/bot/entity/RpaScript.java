package com.rainbow.bot.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RpaScript {

    private Integer id;
    private Integer parentId;
    private String name;
    private String botStatus;
}
