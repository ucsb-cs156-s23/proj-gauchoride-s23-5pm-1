package edu.ucsb.cs156.gauchoride.controllers;

import edu.ucsb.cs156.gauchoride.entities.IndividualRides;
import edu.ucsb.cs156.gauchoride.errors.EntityNotFoundException;
import edu.ucsb.cs156.gauchoride.repositories.IndividualRidesRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;

import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Api(description = "IndividualRides")
@RequestMapping("/api/individualRides")
@RestController
@Slf4j
public class IndividualRidesController extends ApiController {
 
    @Autowired
    IndividualRidesRepository individualRidesRepository;
    
    @ApiOperation(value = "List all individualRides")
    @PreAuthorize("hasRole('ROLE_DRIVER') || hasRole('ROLE_ADMIN') || hasRole('ROLE_RIDER')")
    @GetMapping("/all")
    public Iterable<IndividualRides> allIndividualRides() {
        Iterable<IndividualRides> individualRides = individualRidesRepository.findAll();
        return individualRides;
    }

    @ApiOperation(value = "List all individualRides with driverId")
@PreAuthorize("hasRole('ROLE_DRIVER') || hasRole('ROLE_ADMIN') || hasRole('ROLE_RIDER')")
    @GetMapping("/allWithDriverId")
    public Iterable<IndividualRides> allIndividualRidesWithDriverId( 
        @ApiParam("driverId") @RequestParam Long id) {

        Iterable<IndividualRides> individualRides = individualRidesRepository.findAll();
        List<IndividualRides> filteredList = new ArrayList<>();

        for(IndividualRides ride : individualRides){
            if(ride.getDriverId() == id)
                filteredList.add(ride);
        }

        return (Iterable<IndividualRides>)filteredList;
    }

    @ApiOperation(value = "List all individualRides with riderId")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/allWithRiderId")
    public Iterable<IndividualRides> allIndividualRidesWithRiderId( 
        @ApiParam("driverId") @RequestParam Long id) {

        Iterable<IndividualRides> individualRides = individualRidesRepository.findAll();
        List<IndividualRides> filteredList = new ArrayList<>();

        for(IndividualRides ride : individualRides){
            List<Long> riderIds = Arrays.asList(ride.getRiderIds());
            if(riderIds.contains(id))
                filteredList.add(ride);
        }

        return (Iterable<IndividualRides>)filteredList;
    }

    @ApiOperation(value = "Get a single ride")
@PreAuthorize("hasRole('ROLE_DRIVER') || hasRole('ROLE_ADMIN') || hasRole('ROLE_RIDER')")
    @GetMapping("")
    public IndividualRides getById(
            @ApiParam("id") @RequestParam Long id) {
                IndividualRides individualRide = individualRidesRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(IndividualRides.class, id));

        return individualRide;
    }

    @ApiOperation(value = "Delete a ride")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("")
    public Object deleteRide(
            @ApiParam("id") @RequestParam Long id) {
        IndividualRides individualRide = individualRidesRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(IndividualRides.class, id));

            individualRidesRepository.delete(individualRide);
        return genericMessage("Ride with id %s deleted".formatted(id));
    }

    @ApiOperation(value = "Update a single ride")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("")
    public IndividualRides updateIndividualRide(
            @ApiParam("id") @RequestParam Long id,
            @RequestBody @Valid IndividualRides incoming) {

        IndividualRides individualRide = individualRidesRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(IndividualRides.class, id));

        individualRide.setDriverId(incoming.getDriverId());
        individualRide.setRiderIds(incoming.getRiderIds());
        individualRide.setStartTime(incoming.getStartTime());
        individualRide.setEndTime(incoming.getEndTime());
        individualRide.setPickupLocation(incoming.getPickupLocation());
        individualRide.setDropoffLocation(incoming.getDropoffLocation());
        individualRidesRepository.save(individualRide);

        return individualRide;
    }

    @ApiOperation(value = "Create a new individualRide")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/post")
    public IndividualRides postIndividualRide(
        @ApiParam("driverId") @RequestParam Long driverId,
        @ApiParam("riderIds") @RequestParam Long[] riderIds,
        @ApiParam("startTime") @RequestParam String startTimeString,
        @ApiParam("endTime") @RequestParam String endTimeString,
        @ApiParam("pickupLocation") @RequestParam String pickupLocation,
        @ApiParam("dropoffLocation") @RequestParam String dropoffLocation
        )
    {


        LocalDateTime startTime = LocalDateTime.parse(startTimeString);
        LocalDateTime endTime = LocalDateTime.parse(endTimeString);

        IndividualRides individualRide = new IndividualRides();
        individualRide.setDriverId(driverId);
        individualRide.setRiderIds(riderIds);
        individualRide.setStartTime(startTime);
        individualRide.setEndTime(endTime);
        individualRide.setPickupLocation(pickupLocation);
        individualRide.setDropoffLocation(dropoffLocation);

        IndividualRides savedRide = individualRidesRepository.save(individualRide);
        return savedRide;
    }
}

