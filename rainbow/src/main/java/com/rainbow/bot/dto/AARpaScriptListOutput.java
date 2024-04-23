package com.rainbow.bot.dto;

import com.rainbow.bot.entity.RpaScript;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
class AAScriptPageType {

    private Integer offset;
    private Integer total;
    private Integer totalFilter;
}

@Getter
@Setter
public class AARpaScriptListOutput {

    private AAScriptPageType page;
    private List<RpaScript> list;
}
