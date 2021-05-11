package com.turntabl.io.tahoot.repository;

import com.turntabl.io.tahoot.model.Host;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HostRepository extends JpaRepository<Host,Long> {

}
