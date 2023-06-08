
import React from 'react';

import { currentUserFixtures } from 'fixtures/currentUserFixtures';
import ProfilePage from "main/pages/ProfilePage";

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
};

const Template = () => <ProfilePage user = {currentUserFixtures.adminUser} />;

export const Default = Template.bind({});