package com.turntabl.io.tahoot.controller;

import com.turntabl.io.tahoot.model.Host;
import com.turntabl.io.tahoot.repository.HostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HostController {

    @Autowired
    HostRepository hostRepository;

    @PostMapping("createhost")
    public String host (@RequestBody Host host){
        hostRepository.save(host);
        return "Host saved";
    }
}
