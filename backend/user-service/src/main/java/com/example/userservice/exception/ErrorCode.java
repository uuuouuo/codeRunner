package com.example.userservice.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // 공통
    UNAUTHORIZED_TOKEN(HttpStatus.UNAUTHORIZED,"권한이 없습니다"),

    INVALID_PARAMETER(HttpStatus.BAD_REQUEST,"잘못된 요청입니다."),

    // USER 관련
    USER_ID_NOT_FOUND(HttpStatus.NOT_FOUND, "회원 정보를 찾을 수 없습니다."),
    USER_ID_DUPLICATION(HttpStatus.CONFLICT, "이미 가입된 이메일입니다."),
    USER_EMAIL_NOT_FORMATTED(HttpStatus.NOT_ACCEPTABLE, "Email 형식이 일치하지 않습니다"),
    USER_NOT_EXIST(HttpStatus.NOT_FOUND, "사용자 이름을 찾을 수 없습니다"),

    // CHAT 관련
    CHAT_NOT_FOUND(HttpStatus.NOT_FOUND, "채팅방 정보를 찾을 수 없습니다.")

    ;

    private HttpStatus httpStatus;
    private String message;
}
