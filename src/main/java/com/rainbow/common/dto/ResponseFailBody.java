package com.rainbow.common.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ResponseFailBody {
    private Boolean ok;
    private String error;
}
