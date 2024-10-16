package app.tesis.Auth;

import app.tesis.Jwt.JwtService;
import app.tesis.User.Role;
import app.tesis.User.User;
import app.tesis.User.UserRepository;
import app.tesis.User.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        User user=userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token=jwtService.getToken(user);
        Role role = userService.getRolUser(token);
        return AuthResponse.builder()
            .token(token)
                .role(role)
                .userId(Long.valueOf(user.getId()))
                .firstName(user.getFirstname())
                .lastName(user.getLastname())
                .userName(user.getUsername())

            .build();

    }

    public AuthResponse register(RegisterRequest request) {
        User user = User.builder()
            .username(request.getUsername())
            .password(passwordEncoder.encode( request.getPassword()))
            .firstname(request.getFirstname())
            .lastname(request.lastname)

            .role(Role.USER)
            .build();

        userRepository.save(user);

        return AuthResponse.builder()
            .token(jwtService.getToken(user))
                .role(user.getRole())
                .userId(Long.valueOf(user.getId()))
                .firstName(user.getFirstname())
                .lastName(user.getLastname())
                .userName(user.getUsername())
            .build();
        
    }

}
