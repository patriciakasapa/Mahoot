package com.turntabl.io.tahoot.controller;


import com.turntabl.io.tahoot.model.Options;
import com.turntabl.io.tahoot.model.Questions;
import com.turntabl.io.tahoot.repository.OptionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OptionController {

    @Autowired
    OptionsRepository optionsRepository;


        @PostMapping("/create_option")
    public String questions(@RequestBody Options options){
            System.out.println("id: "+ options.getOption_id());
            System.out.println("body: "+ options.getOption_body());

            optionsRepository.save(options);
        return "Options saved";
    }
}
