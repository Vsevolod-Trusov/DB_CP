package by.spring.promo.promoDB.exception.advice;

import by.spring.promo.promoDB.exception.DataNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class DataNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(DataNotFoundException.class)
public Map<String, String> exceptionHandler(DataNotFoundException dataNotFoundException) {
    Map<String,String> errorMap = new HashMap<>();
    errorMap.put("message", dataNotFoundException.getMessage());
    return errorMap;
}
}
