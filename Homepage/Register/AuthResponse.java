package com.ayurvedicbliss.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String message;
    private UserDto user;
}

@Data
class UserDto {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    // Add other fields you want to expose
}