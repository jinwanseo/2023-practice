package com.rainbow.common.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ResponseSuccessBody<T> {
    private final Boolean ok;
    private final T result;
}
