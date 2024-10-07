package app.tesis.services.impl;

import app.tesis.services.PhotoService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class PhotoServiceImpl implements PhotoService {

    private final String uploadDir = "uploads/cabins";

    public String savePhoto(MultipartFile photo) throws IOException {
        // Generar un nombre único para el archivo (para evitar conflictos)
        String uniqueFileName = UUID.randomUUID().toString() + "_" + photo.getOriginalFilename();

        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(uniqueFileName);
        Files.copy(photo.getInputStream(), filePath);

        return filePath.toString();
    }
    public void deletePhoto(String photoUrl) throws IOException {
        Path photoPath = Paths.get(photoUrl);
        Files.deleteIfExists(photoPath);
    }

}
