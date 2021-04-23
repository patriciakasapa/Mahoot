package com.turntabl.io.tahoot.repository;

import com.turntabl.io.tahoot.model.Options;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OptionsRepository extends JpaRepository<Options,Long> {
}
