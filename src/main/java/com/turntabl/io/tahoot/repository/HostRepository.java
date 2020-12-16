package com.turntabl.io.tahoot.repository;

import com.turntabl.io.tahoot.model.Host;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HostRepository extends JpaRepository<Host,Long> {

}
