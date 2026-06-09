package com.substring.auth.exceptions;

public class ResourceNotFoundEXception extends RuntimeException{

    public ResourceNotFoundEXception(String message) {
        super(message);
    }

    public ResourceNotFoundEXception() {
        super("Resource Not Found");
    }
}
