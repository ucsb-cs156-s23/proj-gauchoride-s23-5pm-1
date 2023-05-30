package edu.ucsb.cs156.gauchoride.repositories;
import edu.ucsb.cs156.gauchoride.entities.IndividualRides;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndividualRidesRepository extends CrudRepository<IndividualRides, Long> {
    // Optional<IndividualRides> findById(int id);
}
