package edu.ucsb.cs156.gauchoride.controllers;

import edu.ucsb.cs156.gauchoride.ControllerTestCase;
import edu.ucsb.cs156.gauchoride.entities.IndividualRides;

import edu.ucsb.cs156.gauchoride.repositories.UserRepository;
import edu.ucsb.cs156.gauchoride.repositories.IndividualRidesRepository;
import edu.ucsb.cs156.gauchoride.testconfig.TestConfig;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@WebMvcTest(controllers = IndividualRidesController.class)
@Import(TestConfig.class)
public class IndividualRidesControllerTest extends ControllerTestCase {

  @MockBean
  IndividualRidesRepository individualRidesRepository;

  @MockBean
  UserRepository userRepository;

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void test_getRides() throws Exception {
      // arrange
      LocalDateTime startTime =  LocalDateTime.parse("2023-05-30T21:43:43.349");
      LocalDateTime endTime =  LocalDateTime.parse("2023-05-30T21:43:43.349");
      
      Long riderIds[] = {1L,2L,3L};

      IndividualRides indivudialRide = IndividualRides.builder()
        .id(7)
        .tripId(12L)
        .driverId(1L)
        .riderIds(riderIds)
        .startTime(startTime)
        .endTime(endTime)
        .pickupLocation("Phelps")
        .dropoffLocation("Broida")
        .autoRenew(false)
        .build();

      when(individualRidesRepository.findById(eq(7L))).thenReturn(Optional.of(indivudialRide));

      // act
      MvcResult response = mockMvc.perform(get("/api/individualRides?id=7"))
        .andExpect(status().isOk()).andReturn();

      // assert
      verify(individualRidesRepository, times(1)).findById(eq(7L));
      String expectedJson = mapper.writeValueAsString(indivudialRide);
      String responseString = response.getResponse().getContentAsString();
      assertEquals(expectedJson, responseString);
  }

  // @WithMockUser(roles = { "ADMIN" })
  // @Test
  // public void test_add_and_delete_ride() throws Exception {
  //     // arrange
  //     LocalDateTime startTime =  LocalDateTime.parse("2023-05-30T21:43:43.349");
  //     LocalDateTime endTime =  LocalDateTime.parse("2023-05-30T21:43:43.349");
      
  //     Long riderIds[] = {1L,2L,3L};

  //     IndividualRides indivudialRide = IndividualRides.builder()
  //       .id(7)
  //       .tripId(12L)
  //       .driverId(1L)
  //       .riderIds(riderIds)
  //       .startTime(startTime)
  //       .endTime(endTime)
  //       .pickupLocation("Phelps")
  //       .dropoffLocation("Broida")
  //       .autoRenew(false)
  //       .build();

  //     when(individualRidesRepository.findById(eq(7L))).thenReturn(Optional.of(indivudialRide));

  //     // act
  //     MvcResult response = mockMvc.perform(get("/api/individualRides?id=7"))
  //     .andExpect(status().isOk()).andReturn();

  //     // assert
  //     verify(individualRidesRepository, times(1)).findById(eq(7L));

  //     MvcResult response2 = mockMvc.perform(delete("/api/individualRides?id=7"))
  //       .andExpect(status().isOk()).andReturn();


  //     String expectedJson = mapper.writeValueAsString("{}");
  //     String responseString = response2.getResponse().getContentAsString();
  //     assertEquals(expectedJson, responseString);
  // }

}
