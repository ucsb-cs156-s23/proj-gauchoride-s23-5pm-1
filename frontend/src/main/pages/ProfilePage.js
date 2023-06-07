import React from "react";
import { Row, Col } from "react-bootstrap";
import RoleBadge from "main/components/Profile/RoleBadge";
import { useCurrentUser } from "main/utils/currentUser";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

const ProfilePage = ({user}) => {
  const { data: currentUserFromHook } = useCurrentUser();

  const currentUser = (user || currentUserFromHook)
  if (!currentUser.loggedIn) {
    return <p>Not logged in.</p>;
  }

  const { email, pictureUrl, fullName } = currentUser.root.user;

  return (
    <BasicLayout>
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={pictureUrl}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{fullName}</h2>
          {/* FUTURE: Pronouns go here, if pronoun field is null, add endpoint for user to modify*/}
          <RoleBadge role={"ROLE_USER"} currentUser={currentUser} />
          <RoleBadge role={"ROLE_MEMBER"} currentUser={currentUser} />
          <RoleBadge role={"ROLE_ADMIN"} currentUser={currentUser} />
          <p style={{ color: 'rgba(128, 128, 128, 0.5)' }}>
          Please contact an admin if any of these parameters are incorrect
          </p>
        </Col>
      </Row>
      <Row className="text-left">
        <div>
            <h4>Email:</h4>
            <p>{email}</p>
            <h4>Admin Status:</h4>
            <p>
              {currentUser.root.user.admin ? "Active Admin" : "Not an Admin"}
            </p>
            <h4>Rider Status:</h4>
            <p>
            {currentUser.root.user.rider
              ? "Active Rider" : "Not a Rider"}
            </p>
            <h4>Driver Status:</h4>
            <p>{currentUser.root.user.driver ? "Active Driver" : "Not a Driver" }</p>

            {/*FUTURE: Include Wheelchair status in this page. Add toggle functionality*/}
        </div>
      </Row>
    </BasicLayout>
  );
};

export default ProfilePage;



