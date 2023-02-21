package com.example.chatservice.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@Builder
@AllArgsConstructor
class ErrorResponse {
    private String errorCode;
    private String message;
    private HttpStatus httpStatus;
}
