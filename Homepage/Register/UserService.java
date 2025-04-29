package com.ayurvedicbliss.service;

import com.ayurvedicbliss.dto.AuthResponse;
import com.ayurvedicbliss.dto.UserDto;
import com.ayurvedicbliss.model.User;
import com.ayurvedicbliss.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, 
                     PasswordEncoder passwordEncoder,
                     JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse registerUser(User user) {
        // Check if user exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }
        
        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        // Save user
        User savedUser = userRepository.save(user);
        
        // Generate JWT token
        String token = jwtService.generateToken(savedUser);
        
        return new AuthResponse(
            token,
            "Registration successful",
            convertToDto(savedUser)
        );
    }

    public AuthResponse authenticateUser(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        String token = jwtService.generateToken(user);
        
        return new AuthResponse(
            token,
            "Login successful",
            convertToDto(user)
        );
    }

    public AuthResponse handleGoogleLogin(String email, String name, String googleId) {
        Optional<User> existingUser = userRepository.findByGoogleId(googleId);
        
        if (existingUser.isPresent()) {
            String token = jwtService.generateToken(existingUser.get());
            return new AuthResponse(
                token,
                "Google login successful",
                convertToDto(existingUser.get())
            );
        }
        
        // Split name into first and last name
        String[] names = name.split(" ");
        String firstName = names[0];
        String lastName = names.length > 1 ? names[1] : "";
        
        // Create new user
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setGoogleId(googleId);
        
        User savedUser = userRepository.save(newUser);
        String token = jwtService.generateToken(savedUser);
        
        return new AuthResponse(
            token,
            "Google registration successful",
            convertToDto(savedUser)
        );
    }

    private UserDto convertToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        return dto;
    }
}