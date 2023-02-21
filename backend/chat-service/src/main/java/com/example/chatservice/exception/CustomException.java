package com.example.chatservice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

public class CustomException {

    @Getter
    @RequiredArgsConstructor
    public static class BadRequestException extends RuntimeException {
        private final ErrorCode errorCode;
    }

    @Getter
    @RequiredArgsConstructor
    public static class NotFoundException extends RuntimeException{
        private final ErrorCode errorCode;
    }

}
