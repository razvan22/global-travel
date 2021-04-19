package com.globalTravel.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class MediaService {
    public String saveImage(MultipartFile imageFile) {
        String folder = "./uploads/";
        String fileName = UUID.randomUUID()+ imageFile.getOriginalFilename();
       try{
           byte[] bytes = imageFile.getBytes();
           Path filePath = Paths.get(folder + fileName);
            Files.write(filePath, bytes);
       } catch (Exception e){
           e.printStackTrace();
       }
       return "/uploads/"+fileName;
    }
}
