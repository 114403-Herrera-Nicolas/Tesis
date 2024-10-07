package app.tesis.User;

import app.tesis.Jwt.JwtService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Transactional
    public UserResponse updateUser(UserRequest userRequest,String token) throws Exception {


        User user = User.builder()
        .id(userRequest.id)
                .username(userRequest.getUsername())
        .firstname(userRequest.getFirstname())
        .lastname(userRequest.lastname)
        .country(userRequest.getCountry())
        .role(Role.USER)
        .build();
        if (!jwtService.isTokenValid(token,user)) {
            throw new Exception("No autorizado: el nombre de usuario no coincide.");
        }else {
            userRepository.updateUser(user.id, user.firstname, user.lastname, user.country);
            return new UserResponse("El usuario se registró satisfactoriamente");
    }}

    public UserDTO getUser(Integer id) {
        User user= userRepository.findById(id).orElse(null);
       
        if (user!=null)
        {
            UserDTO userDTO = UserDTO.builder()
            .id(user.id)
            .username(user.username)
            .firstname(user.firstname)
            .lastname(user.lastname)
            .country(user.country)
            .build();
            return userDTO;
        }
        return null;
    }

    public Role getRolUser(String token) {
        String username = jwtService.getUsernameFromToken(token);
        Optional<User> user= userRepository.findByUsername(username);
        if (user.isPresent()) {
            return user.get().getRole();
        }
        return null;
    }
    public boolean isAdmin(String token){
        Role role = getRolUser(token);
        return role==Role.ADMIN;
    }
}
