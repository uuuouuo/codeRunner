package com.example.userservice.exception;

import com.example.userservice.exception.CustomException.BadRequestException;
import com.example.userservice.exception.CustomException.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import static com.example.userservice.util.Message.*;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionController {

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<Object> badRequestHandler(BadRequestException e) {
        log.error(BAD_REQUEST);
        e.printStackTrace();

        ErrorCode code = e.getErrorCode();
        return ResponseEntity.status(code.getHttpStatus())
                .body(getErrorResponse(code));
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Object> nullPointerHandler(NotFoundException e) {
        log.error(NOT_FOUND);
        e.printStackTrace();

        ErrorCode code = e.getErrorCode();
        return ResponseEntity.status(code.getHttpStatus())
                .body(getErrorResponse(code));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ErrorResponse typeMismatchHandler(MethodArgumentTypeMismatchException e) {
        log.error(PARAMETER_TYPE_MISMATCH);
        e.printStackTrace();

        return ErrorResponse.builder()
                .errorCode(e.getErrorCode())
                .message(PARAMETER_TYPE_MISMATCH)
                .build();
    }

    private ErrorResponse getErrorResponse(ErrorCode code) {
        return ErrorResponse.builder()
                .errorCode(code.name())
                .message(code.getMessage())
                .httpStatus(code.getHttpStatus())
                .build();
    }

}
