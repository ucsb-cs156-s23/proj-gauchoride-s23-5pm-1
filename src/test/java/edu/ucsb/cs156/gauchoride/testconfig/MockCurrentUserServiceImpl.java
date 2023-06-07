package edu.ucsb.cs156.gauchoride.testconfig;

import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import edu.ucsb.cs156.gauchoride.entities.User;
import edu.ucsb.cs156.gauchoride.models.CurrentUser;
import edu.ucsb.cs156.gauchoride.repositories.UserRepository;
import edu.ucsb.cs156.gauchoride.services.CurrentUserServiceImpl;

@Slf4j
@Service("currentUser")
public class MockCurrentUserServiceImpl extends CurrentUserServiceImpl {

  private User mockUser;
  private User savedUser;

  public void initMockUser(SecurityContext securityContext, Authentication authentication) {
    Object principal = authentication.getPrincipal();

    String googleSub = "fakeUser";
    String email = "user@example.org";
    String pictureUrl = "https://example.org/fake.jpg";
    String fullName = "Fake User";
    String givenName = "Fake";
    String familyName = "User";
    boolean emailVerified = true;
    String locale = "";
    String hostedDomain = "example.org";
    boolean admin = false;

    org.springframework.security.core.userdetails.User user = null;

    if (principal instanceof org.springframework.security.core.userdetails.User) {
      log.info("principal instance of org.springframework.security.core.userdetails.User");
      user = (org.springframework.security.core.userdetails.User) principal;
      googleSub = "fake_" + user.getUsername();
      email = user.getUsername() + "@example.org";
      pictureUrl = "https://example.org/" + user.getUsername() + ".jpg";
      fullName = "Fake " + user.getUsername();
      givenName = "Fake";
      familyName = user.getUsername();
      emailVerified = true;
      locale = "";
      hostedDomain = "example.org";
      admin = (user.getUsername().equals("admin"));
    }

    this.mockUser = User.builder()
        .googleSub(googleSub)
        .email(email)
        .pictureUrl(pictureUrl)
        .fullName(fullName)
        .givenName(givenName)
        .familyName(familyName)
        .emailVerified(emailVerified)
        .locale(locale)
        .hostedDomain(hostedDomain)
        .admin(admin)
        .id(1L)
        .build();

    this.savedUser = User.builder()
        .googleSub(googleSub)
        .email(email)
        .pictureUrl(pictureUrl)
        .fullName(fullName)
        .givenName(givenName)
        .familyName(familyName)
        .emailVerified(emailVerified)
        .locale(locale)
        .hostedDomain(hostedDomain)
        .admin(admin)
        .id(1L)
        .build();

    log.info("************** ALERT **********************");
    log.info("************* MOCK USER********************");
    log.info("authentication={}", authentication);
    log.info("securityContext={}", securityContext);
    log.info("principal={}", principal);
    log.info("user (spring security) ={}", user);
    log.info("u (our custom user entity)={}", this.mockUser);
    log.info("************** END ALERT ******************");

  }

  private User initUser() {
    SecurityContext securityContext = SecurityContextHolder.getContext();
    Authentication authentication = securityContext.getAuthentication();

    if (!(authentication instanceof OAuth2AuthenticationToken)) {
      initMockUser(securityContext, authentication);
    }

    return mockUser;
  }

  public User getUser() {
    if (mockUser == null) {
      mockUser = initUser();
    }
    return mockUser;
  }

  public void resetCurrentUser() {
    mockUser = User.builder()
    .googleSub(savedUser.getGoogleSub())
    .email(savedUser.getEmail())
    .pictureUrl(savedUser.getPictureUrl())
    .fullName(savedUser.getFullName())
    .givenName(savedUser.getGivenName())
    .familyName(savedUser.getFamilyName())
    .emailVerified(savedUser.getEmailVerified())
    .locale(savedUser.getLocale())
    .hostedDomain(savedUser.getHostedDomain())
    .admin(savedUser.getAdmin())
    .id(savedUser.getId())
    .build();
  }

}
