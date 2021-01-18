package com.turntabl.io.tahoot.controller;

import com.turntabl.io.tahoot.model.Host;
import com.turntabl.io.tahoot.model.Quiz;
import com.turntabl.io.tahoot.repository.HostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class HostController {

    Quiz quiz;

    @Autowired
    HostRepository hostRepository;

    @CrossOrigin
    @PostMapping("createhost")
    public String host (@RequestBody Host host){
        hostRepository.save(host);
        return "Host saved";
    }

    @CrossOrigin
    @GetMapping("/gethost")
    public List<Host> findAll() {
        return hostRepository.findAll();
    }

    @CrossOrigin
    @GetMapping("host/{host_id}")
    public ResponseEntity<?>findId(@PathVariable("host_id") Long host_id){

        Optional<Host>host=null;
        Map<String,Object>response = new HashMap<>();

        try{
            host = hostRepository.findById(host_id);
        }catch(DataAccessException e){
            response.put("error", e.getMessage().concat(": "+e.getMostSpecificCause().toString()));
            new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        System.out.println("Patient with id: "+host_id+" / "+host.get().getHost_id());

        return ResponseEntity.ok(host);
    }
//    public List<Host> findById(){
//        Host host = new Host();
//        return hostRepository.findById(host.getHost_id());
//    }
}
