package com.ayurvedicbliss.controller;

import com.ayurvedicbliss.dto.AuthResponse;
import com.ayurvedicbliss.model.User;
import com.ayurvedicbliss.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(@RequestParam String email, 
                                                   @RequestParam String password) {
        return ResponseEntity.ok(userService.authenticateUser(email, password));
    }

    @PostMapping("/google-login")
    public ResponseEntity<AuthResponse> googleLogin(@RequestParam String email,
                                                  @RequestParam String name,
                                                  @RequestParam String googleId) {
        return ResponseEntity.ok(userService.handleGoogleLogin(email, name, googleId));
    }
}