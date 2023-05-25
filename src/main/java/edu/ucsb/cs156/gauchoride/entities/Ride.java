package edu.ucsb.cs156.gauchoride.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.AccessLevel;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity(name = "users")
public class Ride {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  // these members are of the users class, refer to User.java
  private User rider;
  private User driver;
  // In the future, we would want to make a location class to organize these easier
  private String rideDay;
  private String courseNum;
  private String Bulding;
  private String room;
  private String pickUp;
  // time start and stop, using string and military time? 
  private String timeStart;
  private String timeStop;

}
