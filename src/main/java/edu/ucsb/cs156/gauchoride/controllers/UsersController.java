package edu.ucsb.cs156.gauchoride.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.cs156.gauchoride.entities.User;
import edu.ucsb.cs156.gauchoride.repositories.UserRepository;

import edu.ucsb.cs156.gauchoride.errors.EntityNotFoundException;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;


@Api(description = "User information (admin only)")
@RequestMapping("/api/admin/users")
@RestController
public class UsersController extends ApiController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ObjectMapper mapper;

    @ApiOperation(value = "Get a list of all users")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("")
    public ResponseEntity<String> users()
            throws JsonProcessingException {
        Iterable<User> users = userRepository.findAll();
        String body = mapper.writeValueAsString(users);
        return ResponseEntity.ok().body(body);
    }

    @ApiOperation(value = "Get a list of all riders")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/riders")
    public ResponseEntity<String> riders()
            throws JsonProcessingException {
        Iterable<User> users = userRepository.findAll();
        List<User> riders = new ArrayList<>();
        for(User user : users) {
            if (user.getRider()) {
                riders.add(user);
            }
        }
        String body = mapper.writeValueAsString((Iterable<User>)riders);
        return ResponseEntity.ok().body(body);
    }

    @ApiOperation(value = "Get a list of all drivers")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/drivers")
    public ResponseEntity<String> drivers()
            throws JsonProcessingException {
        Iterable<User> users = userRepository.findAll();
        List<User> drivers = new ArrayList<>();
        for(User user : users) {
            if (user.getDriver()) {
                drivers.add(user);
            }
        }
        String body = mapper.writeValueAsString((Iterable<User>)drivers);
        return ResponseEntity.ok().body(body);
    }

    @ApiOperation(value = "Get user by id")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/get")
    public User users(
            @ApiParam("id") @RequestParam Long id)
            throws JsonProcessingException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(User.class, id));
        return user;
    }

    @ApiOperation(value = "Delete a user (admin)")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/delete")
    public Object deleteUser_Admin(
            @ApiParam("id") @RequestParam Long id) {
              User user = userRepository.findById(id)
          .orElseThrow(() -> new EntityNotFoundException(User.class, id));

          userRepository.delete(user);

        return genericMessage("User with id %s deleted".formatted(id));
    }

    
    @ApiOperation(value = "Toggle the admin field")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/toggleAdmin")
    public Object toggleAdmin( @ApiParam("id") @RequestParam Long id){
        User user = userRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException(User.class, id));

        user.setAdmin(!user.getAdmin());
        userRepository.save(user);
        if (user.getAdmin()) {
            return genericMessage("User with id %s has toggled admin status from false to true".formatted(id));
        }
        else {
            return genericMessage("User with id %s has toggled admin status from true to false".formatted(id));
        }
    }

    @ApiOperation(value = "Toggle the driver field")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/toggleDriver")
    public Object toggleDriver( @ApiParam("id") @RequestParam Long id){
        User user = userRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException(User.class, id));

        user.setDriver(!user.getDriver());
        userRepository.save(user);
        
        if (user.getDriver()) {
            return genericMessage("User with id %s has toggled driver status from false to true".formatted(id));
        }
        else {
            return genericMessage("User with id %s has toggled driver status from true to false".formatted(id));
        }
    }

    @ApiOperation(value = "Toggle the rider field")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/toggleRider")
    public Object toggleRider( @ApiParam("id") @RequestParam Long id){
        User user = userRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException(User.class, id));

        user.setRider(!user.getRider());
        userRepository.save(user);
        if (user.getRider()) {
            return genericMessage("User with id %s has toggled rider status from false to true".formatted(id));
        }
        else {
            return genericMessage("User with id %s has toggled rider status from true to false".formatted(id));
        }
    }

    @ApiOperation(value = "Toggle the wheelchair field")
    @PostMapping("/toggleWheelchair")
    public Object toggleWheelchair( @ApiParam("id") @RequestParam Long id){
        User user = userRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException(User.class, id));

        user.setWheelchair(!user.getWheelchair());
        userRepository.save(user);
        return genericMessage("User with id %s has toggled wheelchair status".formatted(id));
    }

}