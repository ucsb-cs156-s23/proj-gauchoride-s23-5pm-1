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
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;


import java.time.LocalDateTime;
import java.util.Optional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import java.util.List;
import java.time.LocalDate;

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

  @WithMockUser(roles = { "ADMIN", "USER" })
  @Test
  public void test_getRides_does_not_exist() throws Exception {
      // arrange
      when(individualRidesRepository.findById(eq(15L))).thenReturn(Optional.empty());
  
      // act
      MvcResult response = mockMvc.perform(
        get("/api/individualRides?id=15")
            .with(csrf()))
        .andExpect(status().isNotFound()).andReturn();
  
      // assert
      verify(individualRidesRepository, times(1)).findById(15L);
      Map<String, Object> json = responseToJson(response);
      assertEquals("IndividualRides with id 15 not found", json.get("message"));
  }


  @WithMockUser(roles = { "ADMIN", "USER" })
  @Test
  public void admin_can_delete_a_ride() throws Exception {
          // arrange

          LocalDateTime startTime =  LocalDateTime.parse("2023-05-30T21:43:43.349");
          LocalDateTime endTime =  LocalDateTime.parse("2023-05-30T21:43:43.349");
          
          Long riderIds[] = {1L,2L,3L};
    
          IndividualRides individualRide = IndividualRides.builder()
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

          when(individualRidesRepository.findById(eq(15L))).thenReturn(Optional.of(individualRide));

          // act
          MvcResult response = mockMvc.perform(
                          delete("/api/individualRides?id=15")
                                          .with(csrf()))
                          .andExpect(status().isOk()).andReturn();

          // assert
          verify(individualRidesRepository, times(1)).findById(15L);
          verify(individualRidesRepository, times(1)).delete(any());

          Map<String, Object> json = responseToJson(response);
          assertEquals("Ride with id 15 deleted", json.get("message"));
  }

  @WithMockUser(roles = { "USER" })
  @Test
  public void logged_in_users_can_get_all() throws Exception {
          mockMvc.perform(get("/api/individualRides/all"))
                          .andExpect(status().is(200)); // logged
  }

  @WithMockUser(roles = { "USER" })
  @Test
  public void logged_in_user_can_get_all_rides() throws Exception {

          // arrange
          LocalDateTime startTime =  LocalDateTime.parse("2023-05-30T21:43:43.349");
          LocalDateTime endTime =  LocalDateTime.parse("2023-05-30T21:43:43.349");
          
          Long riderIds[] = {1L,2L,3L};
    
          IndividualRides individualRide1 = IndividualRides.builder()
            .tripId(12L)
            .driverId(1L)
            .riderIds(riderIds)
            .startTime(startTime)
            .endTime(endTime)
            .pickupLocation("Phelps")
            .dropoffLocation("Broida")
            .autoRenew(false)
            .build();

            IndividualRides individualRide2 = IndividualRides.builder()
              .tripId(12L)
              .driverId(12L)
              .riderIds(riderIds)
              .startTime(startTime)
              .endTime(endTime)
              .pickupLocation("Phelps1")
              .dropoffLocation("Broida1")
              .autoRenew(false)
              .build();

          ArrayList<IndividualRides> expectedRides = new ArrayList<>();
          expectedRides.addAll(Arrays.asList(individualRide1, individualRide2));

          when(individualRidesRepository.findAll()).thenReturn(expectedRides);

          // act
          MvcResult response = mockMvc.perform(get("/api/individualRides/all"))
                          .andExpect(status().isOk()).andReturn();

          // assert
          verify(individualRidesRepository, times(1)).findAll();
          String expectedJson = mapper.writeValueAsString(expectedRides);
          String responseString = response.getResponse().getContentAsString();
          assertEquals(expectedJson, responseString);
  }

  @WithMockUser(roles = { "USER" })
  @Test
  public void logged_in_user_can_get_all_rides_with_driver_id() throws Exception {

          // arrange
          LocalDateTime startTime =  LocalDateTime.parse("2023-05-30T21:43:43.349");
          LocalDateTime endTime =  LocalDateTime.parse("2023-05-30T21:43:43.349");
          
          Long riderIds[] = {1L,2L,3L};
    
          IndividualRides individualRide1 = IndividualRides.builder()
            .tripId(12L)
            .driverId(1L)
            .riderIds(riderIds)
            .startTime(startTime)
            .endTime(endTime)
            .pickupLocation("Phelps")
            .dropoffLocation("Broida")
            .autoRenew(false)
            .build();

            IndividualRides individualRide2 = IndividualRides.builder()
              .tripId(12L)
              .driverId(12L)
              .riderIds(riderIds)
              .startTime(startTime)
              .endTime(endTime)
              .pickupLocation("Phelps1")
              .dropoffLocation("Broida1")
              .autoRenew(false)
              .build();

          ArrayList<IndividualRides> expectedRides = new ArrayList<>();
          expectedRides.add(individualRide1);

          when(individualRidesRepository.findAll()).thenReturn(expectedRides);

          // act
          MvcResult response = mockMvc.perform(get("/api/individualRides/allWithDriverId?id=1"))
                          .andExpect(status().isOk()).andReturn();

          // assert
          verify(individualRidesRepository, times(1)).findAll();
          String expectedJson = mapper.writeValueAsString(expectedRides);
          String responseString = response.getResponse().getContentAsString();
          assertEquals(expectedJson, responseString);
  }

  @WithMockUser(roles = { "USER" })
  @Test
  public void logged_in_user_can_get_all_rides_with_rider_id() throws Exception {

          // arrange
          LocalDateTime startTime =  LocalDateTime.parse("2023-05-30T21:43:43.349");
          LocalDateTime endTime =  LocalDateTime.parse("2023-05-30T21:43:43.349");
          
          Long riderIds1[] = {1L,2L,3L};
          Long riderIds2[] = {12L,22L,32L};
    
          IndividualRides individualRide1 = IndividualRides.builder()
            .tripId(12L)
            .driverId(1L)
            .riderIds(riderIds1)
            .startTime(startTime)
            .endTime(endTime)
            .pickupLocation("Phelps")
            .dropoffLocation("Broida")
            .autoRenew(false)
            .build();

          IndividualRides individualRide2 = IndividualRides.builder()
            .tripId(12L)
            .driverId(12L)
            .riderIds(riderIds2)
            .startTime(startTime)
            .endTime(endTime)
            .pickupLocation("Phelps1")
            .dropoffLocation("Broida1")
            .autoRenew(false)
            .build();

          ArrayList<IndividualRides> expectedRides = new ArrayList<>();
          expectedRides.add(individualRide1);

          when(individualRidesRepository.findAll()).thenReturn(expectedRides);

          // act
          MvcResult response = mockMvc.perform(get("/api/individualRides/allWithRiderId?id=1"))
                          .andExpect(status().isOk()).andReturn();

          // assert
          verify(individualRidesRepository, times(1)).findAll();
          String expectedJson = mapper.writeValueAsString(expectedRides);
          String responseString = response.getResponse().getContentAsString();
          assertEquals(expectedJson, responseString);
  }

  @WithMockUser(roles = { "ADMIN", "USER" })
  @Test
  public void an_admin_user_can_post_a_new_ride() throws Exception {
      // arrange
      LocalDateTime startTime =  LocalDateTime.parse("2023-05-30T21:43:43.349");
      LocalDateTime endTime =  LocalDateTime.parse("2023-05-30T21:43:43.349");
      
      Long riderIds[] = {1L,2L,3L};

      IndividualRides individualRide1 = IndividualRides.builder()
        .tripId(12L)
        .driverId(1L)
        .riderIds(riderIds)
        .startTime(startTime)
        .endTime(endTime)
        .pickupLocation("Phelps")
        .dropoffLocation("Broida")
        .autoRenew(true)
        .build();

      when(individualRidesRepository.save(eq(individualRide1))).thenReturn(individualRide1);

      // act
      MvcResult response = mockMvc.perform(
        post("/api/individualRides/post")
            .param("tripId", "12")
            .param("driverId", "1")
            .param("riderIds", "1", "2", "3")
            .param("startTimeString", "2023-05-30T21:43:43.349")
            .param("endTimeString", "2023-05-30T21:43:43.349")
            .param("pickupLocation", "Phelps")
            .param("dropoffLocation", "Broida")
            .param("autoRenew", "true")
            .with(csrf()))
      .andExpect(status().isOk())
      .andReturn();

      // assert
      verify(individualRidesRepository, times(1)).save(individualRide1);
      String expectedJson = mapper.writeValueAsString(individualRide1);
      String responseString = response.getResponse().getContentAsString();

      assertEquals(expectedJson, responseString);
  }

  @WithMockUser(roles = { "ADMIN", "USER" })
  @Test
  public void admin_can_edit_an_existing_ride() throws Exception {
    // arrange
    LocalDateTime startTime =  LocalDateTime.parse("2023-05-30T21:43:43.349");
    LocalDateTime endTime =  LocalDateTime.parse("2023-05-30T21:43:43.349");

    LocalDateTime startTime1 =  LocalDateTime.parse("2023-05-30T21:45:43.349");
    LocalDateTime endTime1 =  LocalDateTime.parse("2023-05-30T21:45:43.349");
    
    Long riderIds1[] = {1L,2L,3L};
    Long riderIds2[] = {12L,22L,32L};

    IndividualRides individualRide = IndividualRides.builder()
      .tripId(12L)
      .driverId(1L)
      .riderIds(riderIds1)
      .startTime(startTime)
      .endTime(endTime)
      .pickupLocation("Phelps")
      .dropoffLocation("Broida")
      .autoRenew(false)
      .build();

    IndividualRides individualRideEdited = IndividualRides.builder()
      .tripId(22L)
      .driverId(12L)
      .riderIds(riderIds2)
      .startTime(startTime1)
      .endTime(endTime1)
      .pickupLocation("Phelps1")
      .dropoffLocation("Broida1")
      .autoRenew(true)
      .build();

    String requestBody = mapper.writeValueAsString(individualRideEdited);

    when(individualRidesRepository.findById(eq(67L))).thenReturn(Optional.of(individualRide));

    // act
    MvcResult response = mockMvc.perform(
                    put("/api/individualRides?id=67")
                                    .contentType(MediaType.APPLICATION_JSON)
                                    .characterEncoding("utf-8")
                                    .content(requestBody)
                                    .with(csrf()))
                    .andExpect(status().isOk()).andReturn();

    // assert
    verify(individualRidesRepository, times(1)).findById(67L);
    verify(individualRidesRepository, times(1)).save(individualRideEdited); // should be saved with correct user
    String responseString = response.getResponse().getContentAsString();
    assertEquals(requestBody, responseString);
  }

  @WithMockUser(roles = { "ADMIN", "USER" })
  @Test
  public void admin_tries_to_delete_non_existant_ride_and_gets_right_error_message()
    throws Exception {
    // arrange

    when(individualRidesRepository.findById(eq(15L))).thenReturn(Optional.empty());

    // act
    MvcResult response = mockMvc.perform(
                    delete("/api/individualRides?id=15")
                        .with(csrf()))
                    .andExpect(status().isNotFound()).andReturn();

    // assert
    verify(individualRidesRepository, times(1)).findById(15L);
    Map<String, Object> json = responseToJson(response);
    assertEquals("IndividualRides with id 15 not found", json.get("message"));
  }

  @WithMockUser(roles = { "ADMIN", "USER" })
  @Test
  public void admin_cannot_edit_individualRide_that_does_not_exist() throws Exception {
    // arrange
    LocalDateTime startTime =  LocalDateTime.parse("2023-05-30T21:43:43.349");
    LocalDateTime endTime =  LocalDateTime.parse("2023-05-30T21:43:43.349");
    
    Long riderIds[] = {1L,2L,3L};

    IndividualRides editedRide = IndividualRides.builder()
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

    String requestBody = mapper.writeValueAsString(editedRide);

    when(individualRidesRepository.findById(eq(67L))).thenReturn(Optional.empty());

    // act
    MvcResult response = mockMvc.perform(
                    put("/api/individualRides?id=67")
                                    .contentType(MediaType.APPLICATION_JSON)
                                    .characterEncoding("utf-8")
                                    .content(requestBody)
                                    .with(csrf()))
                    .andExpect(status().isNotFound()).andReturn();

    // assert
    verify(individualRidesRepository, times(1)).findById(67L);
    Map<String, Object> json = responseToJson(response);
    assertEquals("IndividualRides with id 67 not found", json.get("message"));

  }
}
