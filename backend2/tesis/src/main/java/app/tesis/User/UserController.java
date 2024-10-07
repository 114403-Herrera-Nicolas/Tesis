package app.tesis.User;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping(value = "/api/v1/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "User", description = "Endpoints relacionados con los usuarios")
public class UserController {
    private final UserService userService;

    @GetMapping(value = "{id}")
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<UserDTO> getUser(@PathVariable Integer id) {

        UserDTO userDTO = userService.getUser(id);
        if (userDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping()
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<UserResponse> updateUser(
            @RequestBody UserRequest userRequest,
            @RequestHeader("Authorization") String authorizationHeader) throws Exception {
        String token = authorizationHeader.replace("Bearer ", "");
        return ResponseEntity.ok(userService.updateUser(userRequest,token));
    }
}
