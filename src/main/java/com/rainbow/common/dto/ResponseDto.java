package com.rainbow.common.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import java.util.Map;


public class ResponseDto<T> extends ResponseEntity<Object> {
    public ResponseDto(ResponseSuccessBody<T> body, HttpStatusCode status) {
        super(body, status);
    }

    public ResponseDto(ResponseFailBody body, HttpStatusCode status) {
        super(body, status);
    }
}
