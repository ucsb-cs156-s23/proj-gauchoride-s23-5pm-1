import React from "react";
import { Row, Col } from "react-bootstrap";
import RoleBadge from "main/components/Profile/RoleBadge";
import { useCurrentUser } from "main/utils/currentUser";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

const ProfilePage = () => {
  const { data: currentUser } = useCurrentUser();

  if (!currentUser.loggedIn) {
    return <p>Not logged in.</p>;
  }

  const { email, pictureUrl, fullName } = currentUser.root.user;
//   const emailVerified = currentUser.root.user.emailVerified;

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
          <p className="lead text-muted">{email}</p>
          <RoleBadge role={"ROLE_USER"} currentUser={currentUser} />
          <RoleBadge role={"ROLE_MEMBER"} currentUser={currentUser} />
          <RoleBadge role={"ROLE_ADMIN"} currentUser={currentUser} />
          <RoleBadge role={"ROLE_DRIVER"} currentUser={currentUser} />
          <RoleBadge role={"ROLE_RIDER"} currentUser={currentUser} />
        </Col>
      </Row>
      <Row className="text-left">
        <div>
            <h4>Email Verified?</h4>
            <p>{currentUser.root.user.emailVerified ? "Yes" : "No"}</p>
            <h4>Email</h4>
            <p>{email}</p>
        </div>
      </Row>
    </BasicLayout>
  );
};

export default ProfilePage;



