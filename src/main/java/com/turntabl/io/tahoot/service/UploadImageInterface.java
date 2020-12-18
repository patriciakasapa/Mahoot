package com.turntabl.io.tahoot.service;

import com.turntabl.io.tahoot.model.Questions;
import org.springframework.web.multipart.MultipartFile;

public interface UploadImageInterface {
    public Questions uploadToDatabase (MultipartFile file);

    public Questions download (long question_id);
}
