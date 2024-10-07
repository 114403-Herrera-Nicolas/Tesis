package app.tesis.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public interface PhotoService {
    String savePhoto(MultipartFile photo) throws IOException;
    void deletePhoto(String photoUrl) throws IOException;
}
