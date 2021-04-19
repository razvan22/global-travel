package com.globalTravel.repository;

import com.globalTravel.entinty.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Integer> {
}
