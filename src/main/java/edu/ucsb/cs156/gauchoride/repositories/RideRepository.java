package edu.ucsb.cs156.gauchoride.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import edu.ucsb.cs156.gauchoride.entities.Ride;

import java.util.Optional;

@Repository
public interface RideRepository extends CrudRepository<Ride, Long> {
  Optional<Ride> findById(long id);
}