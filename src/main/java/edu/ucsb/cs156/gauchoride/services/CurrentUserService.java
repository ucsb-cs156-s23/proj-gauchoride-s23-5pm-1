package edu.ucsb.cs156.gauchoride.services;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import edu.ucsb.cs156.gauchoride.entities.User;
import edu.ucsb.cs156.gauchoride.models.CurrentUser;

public abstract class CurrentUserService {
  public abstract User getUser();
  public abstract CurrentUser getCurrentUser();
  public abstract Collection<? extends GrantedAuthority> getRoles();

  public final boolean isLoggedIn() {
    return getUser() != null;
  }

  /**
   * This should only be called in test code, never in production code!
   * 
   * It resets the current user to a known state for tests, in case
   * a previous test has changed it in some way.
   */
  public abstract void resetCurrentUser();
}
