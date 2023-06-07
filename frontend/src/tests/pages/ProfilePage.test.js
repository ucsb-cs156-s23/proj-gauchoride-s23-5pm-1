import { render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { apiCurrentUserFixtures }  from "fixtures/currentUserFixtures";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import ProfilePage from "main/pages/ProfilePage";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

describe("ProfilePage tests", () => {

    const queryClient = new QueryClient();

    test("renders correctly for regular logged in user", async () => {

        const axiosMock =new AxiosMockAdapter(axios);
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ProfilePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor( () => expect(getByText("Phillip Conrad")).toBeInTheDocument() );
        expect(getByText("pconrad.cis@gmail.com")).toBeInTheDocument();
    });

    test("renders correctly for admin user", async () => {

        const axiosMock =new AxiosMockAdapter(axios);
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);

        const { getByText, getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ProfilePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor( () => expect(getByText("Phill Conrad")).toBeInTheDocument() );
        expect(getByTestId("role-badge-user")).toBeInTheDocument();
        expect(getByTestId("role-badge-admin")).toBeInTheDocument();
        expect(getByTestId("role-badge-member")).toBeInTheDocument();
        const contactMessage = getByText(
            "Please contact an admin if any of these parameters are incorrect"
          );
      
        expect(contactMessage).toHaveStyle("color: rgba(128, 128, 128, 0.5)");
        expect(getByText("phtcon@ucsb.edu")).toBeInTheDocument();
        expect(getByText("Active Admin")).toBeInTheDocument();
        expect(getByText("Not a Rider")).toBeInTheDocument();
        expect(getByText("Not a Driver")).toBeInTheDocument();
    });
    test("renders correctly for Rider user", async () => {

        const axiosMock =new AxiosMockAdapter(axios);
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly2);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);

        const { getByText, getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ProfilePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor( () => expect(getByText("Phillip Conrad")).toBeInTheDocument() );
        expect(getByTestId("role-badge-user")).toBeInTheDocument();
        // expect(getByTestId("role-badge-admin")).toBeInTheDocument();
        // expect(getByTestId("role-badge-member")).toBeInTheDocument();
        expect(getByText("pconrad.cis@gmail.com")).toBeInTheDocument();
        expect(getByText("Not an Admin")).toBeInTheDocument();
        expect(getByText("Active Rider")).toBeInTheDocument();
        expect(getByText("Not a Driver")).toBeInTheDocument();
    });
    test("renders correctly for Driver user", async () => {

        const axiosMock =new AxiosMockAdapter(axios);
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);

        const { getByText, getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ProfilePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor( () => expect(getByText("Phillip Conrad")).toBeInTheDocument() );
        expect(getByTestId("role-badge-user")).toBeInTheDocument();
        // expect(getByTestId("role-badge-admin")).toBeInTheDocument();
        // expect(getByTestId("role-badge-member")).toBeInTheDocument();
        expect(getByText("pconrad.cis@gmail.com")).toBeInTheDocument();
        expect(getByText("Not an Admin")).toBeInTheDocument();
        expect(getByText("Not a Rider")).toBeInTheDocument();
        expect(getByText("Active Driver")).toBeInTheDocument();
    });
});


