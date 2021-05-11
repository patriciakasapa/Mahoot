package com.turntabl.io.tahoot.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Uploader {

    @Bean
            public Cloudinary getCloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
//                "cloud_name", System.getenv("CLOUD_NAME"),
//                "api_key", System.getenv("API_KEY"),
//                "api_secret", System.getenv("API_SECRET")));
                        "cloud_name", "turntabl",
                        "api_key", "786764898994284",
                        "api_secret", "tLSFd4GlCjyRNyms2ISLEM48-aY"));
    }
}
