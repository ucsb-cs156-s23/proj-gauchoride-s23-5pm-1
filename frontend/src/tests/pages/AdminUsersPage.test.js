import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import AdminUsersPage from "main/pages/AdminUsersPage";
import usersFixtures from "fixtures/usersFixtures";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import mockConsole from "jest-mock-console";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

describe("AdminUsersPage tests", () => {

    const axiosMock = new AxiosMockAdapter(axios);

    const testId = "UsersTable";

    beforeEach( () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    const setupAdminUser = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    test("renders without crashing on three users", async () => {
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/admin/users").reply(200, usersFixtures.threeUsers);

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AdminUsersPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByText("Users")).toBeInTheDocument());


    });

    test("renders empty table when backend unavailable", async () => {
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/admin/users").timeout();

        const restoreConsole = mockConsole();

        const { queryByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AdminUsersPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(1); });
        restoreConsole();

        expect(queryByTestId(`${testId}-cell-row-0-col-id`)).not.toBeInTheDocument();

    });

    test("usertable toggle admin tests", async ()=>{
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/admin/users").reply(200, usersFixtures.threeUsers);
        axiosMock.onPost("/api/admin/users/toggleAdmin").reply(200, "User with id 1 has toggled admin status");
        const { getByText} = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AdminUsersPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => expect(getByText("Users")).toBeInTheDocument());

        const toggleAdminButton = screen.getByTestId(`${testId}-cell-row-0-col-toggle-admin-button`);
        expect(toggleAdminButton).toBeInTheDocument();

        fireEvent.click(toggleAdminButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));
        expect(axiosMock.history.post[0].url).toBe("/api/admin/users/toggleAdmin");
        expect(axiosMock.history.post[0].params).toEqual({id:1});
      

    })
    test("usertable toggle rider tests", async ()=>{
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/admin/users").reply(200, usersFixtures.threeUsers);
        axiosMock.onPost("/api/admin/users/toggleRider").reply(200, "User with id 1 has toggled rider status");
        const { getByText} = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AdminUsersPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => expect(getByText("Users")).toBeInTheDocument());

        const toggleRiderButton = screen.getByTestId(`${testId}-cell-row-0-col-toggle-rider-button`);
        expect(toggleRiderButton).toBeInTheDocument();

        fireEvent.click(toggleRiderButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));
        expect(axiosMock.history.post[0].url).toBe("/api/admin/users/toggleRider");
        expect(axiosMock.history.post[0].params).toEqual({id:1});


    })
    test("usertable toggle driver tests", async ()=>{
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/admin/users").reply(200, usersFixtures.threeUsers);
        axiosMock.onPost("/api/admin/users/toggleDriver").reply(200, "User with id 1 has toggled driver status");
        const { getByText} = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AdminUsersPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => expect(getByText("Users")).toBeInTheDocument());

        const toggleDriverButton = screen.getByTestId(`${testId}-cell-row-0-col-toggle-driver-button`);
        expect(toggleDriverButton).toBeInTheDocument();

        fireEvent.click(toggleDriverButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));
        expect(axiosMock.history.post[0].url).toBe("/api/admin/users/toggleDriver");
        expect(axiosMock.history.post[0].params).toEqual({id:1});
      

    })

    test("Tests All->Drivers->All", async ()=>{
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/admin/users").reply(200, usersFixtures.threeUsers);
        axiosMock.onGet("/api/admin/users/riders").reply(200, usersFixtures.justRider);
        axiosMock.onGet("/api/admin/users/drivers").reply(200, usersFixtures.justDriver);

        const { getByText, getByLabelText} = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AdminUsersPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => expect(getByText("Phill")).toBeInTheDocument());
        
        const riderCheckbox = screen.getByLabelText("Riders");
        const driverCheckbox = screen.getByLabelText("Drivers");
        const allCheckbox = screen.getByLabelText("All");
        expect(riderCheckbox).not.toBeChecked();
        expect(riderCheckbox).toBeInTheDocument();
        expect(driverCheckbox).toBeInTheDocument();
        expect(driverCheckbox).not.toBeChecked();
        expect(allCheckbox).toBeInTheDocument();
        expect(allCheckbox).toBeChecked();

        const nameCell1 = screen.getByTestId(`${testId}-cell-row-0-col-givenName`);
        const nameCell2 = screen.getByTestId(`${testId}-cell-row-1-col-givenName`);
        const nameCell3 = screen.getByTestId(`${testId}-cell-row-2-col-givenName`);
        expect(nameCell1).toHaveTextContent("Phill");
        expect(nameCell2).toBeInTheDocument();
        expect(nameCell3).toBeInTheDocument();

        fireEvent.click(driverCheckbox);
        expect(nameCell1).toHaveTextContent("Phillip");
        expect(allCheckbox).not.toBeChecked();
        expect(driverCheckbox).toBeChecked();

        fireEvent.click(allCheckbox);
        expect(nameCell1).toHaveTextContent("Phill");
        expect(allCheckbox).toBeChecked();
        expect(riderCheckbox).not.toBeChecked();
    })

    test("Tests All->Riders", async ()=>{
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/admin/users").reply(200, usersFixtures.threeUsers);
        axiosMock.onGet("/api/admin/users/riders").reply(200, usersFixtures.justRider);
        axiosMock.onGet("/api/admin/users/drivers").reply(200, usersFixtures.justDriver);

        const { getByText} = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AdminUsersPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => expect(getByText("Phill")).toBeInTheDocument());
        
        const riderCheckbox = screen.getByLabelText("Riders");
        const driverCheckbox = screen.getByLabelText("Drivers");
        const allCheckbox = screen.getByLabelText("All");
        expect(riderCheckbox).not.toBeChecked();
        expect(riderCheckbox).toBeInTheDocument();
        expect(driverCheckbox).toBeInTheDocument();
        expect(driverCheckbox).not.toBeChecked();
        expect(allCheckbox).toBeInTheDocument();
        expect(allCheckbox).toBeChecked();

        const nameCell1 = screen.getByTestId(`${testId}-cell-row-0-col-givenName`);
        const nameCell2 = screen.getByTestId(`${testId}-cell-row-1-col-givenName`);
        const nameCell3 = screen.getByTestId(`${testId}-cell-row-2-col-givenName`);
        expect(nameCell1).toHaveTextContent("Phill");
        expect(nameCell2).toBeInTheDocument();
        expect(nameCell3).toBeInTheDocument();
        fireEvent.click(riderCheckbox);
        expect(allCheckbox).not.toBeChecked();
        expect(riderCheckbox).toBeChecked();
        expect(nameCell1).toHaveTextContent("Craig");
    })

    test("Tests All->Riders->All Filter", async ()=>{
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/admin/users").reply(200, usersFixtures.threeUsers);
        axiosMock.onGet("/api/admin/users/riders").reply(200, usersFixtures.justRider);
        axiosMock.onGet("/api/admin/users/drivers").reply(200, usersFixtures.justDriver);

        const { getByText, getByLabelText} = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AdminUsersPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => expect(getByText("Phill")).toBeInTheDocument());
        
        const riderCheckbox = screen.getByLabelText("Riders");
        const driverCheckbox = screen.getByLabelText("Drivers");
        const allCheckbox = screen.getByLabelText("All");
        expect(riderCheckbox).not.toBeChecked();
        expect(riderCheckbox).toBeInTheDocument();
        expect(driverCheckbox).toBeInTheDocument();
        expect(driverCheckbox).not.toBeChecked();
        expect(allCheckbox).toBeInTheDocument();
        expect(allCheckbox).toBeChecked();

        const nameCell1 = screen.getByTestId(`${testId}-cell-row-0-col-givenName`);
        const nameCell2 = screen.getByTestId(`${testId}-cell-row-1-col-givenName`);
        const nameCell3 = screen.getByTestId(`${testId}-cell-row-2-col-givenName`);
        expect(nameCell1).toHaveTextContent("Phill");
        expect(nameCell2).toBeInTheDocument();
        expect(nameCell3).toBeInTheDocument();
        fireEvent.click(riderCheckbox);
        expect(allCheckbox).not.toBeChecked();
        expect(riderCheckbox).toBeChecked();
        expect(driverCheckbox).not.toBeChecked();
        expect(nameCell1).toHaveTextContent("Craig");
        fireEvent.click(allCheckbox);
        expect(nameCell1).toHaveTextContent("Phill");
        expect(allCheckbox).toBeChecked();
        expect(driverCheckbox).not.toBeChecked();
        expect(riderCheckbox).not.toBeChecked();
    })

    test("Tests All->Riders->Drivers Filter", async ()=>{
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/admin/users").reply(200, usersFixtures.threeUsers);
        axiosMock.onGet("/api/admin/users/riders").reply(200, usersFixtures.justRider);
        axiosMock.onGet("/api/admin/users/drivers").reply(200, usersFixtures.justDriver);

        const { getByText, getByLabelText} = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AdminUsersPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => expect(getByText("Phill")).toBeInTheDocument());
        
        const riderCheckbox = screen.getByLabelText("Riders");
        const driverCheckbox = screen.getByLabelText("Drivers");
        const allCheckbox = screen.getByLabelText("All");
        expect(riderCheckbox).not.toBeChecked();
        expect(riderCheckbox).toBeInTheDocument();
        expect(driverCheckbox).toBeInTheDocument();
        expect(driverCheckbox).not.toBeChecked();
        expect(allCheckbox).toBeInTheDocument();
        expect(allCheckbox).toBeChecked();

        const nameCell1 = screen.getByTestId(`${testId}-cell-row-0-col-givenName`);
        const nameCell2 = screen.getByTestId(`${testId}-cell-row-1-col-givenName`);
        const nameCell3 = screen.getByTestId(`${testId}-cell-row-2-col-givenName`);
        expect(nameCell1).toHaveTextContent("Phill");
        expect(nameCell2).toBeInTheDocument();
        expect(nameCell3).toBeInTheDocument();

        fireEvent.click(riderCheckbox);
        expect(allCheckbox).not.toBeChecked();
        expect(riderCheckbox).toBeChecked();
        expect(driverCheckbox).not.toBeChecked();
        expect(nameCell1).toHaveTextContent("Craig");

        fireEvent.click(driverCheckbox);
        expect(nameCell1).toHaveTextContent("Phillip");
        expect(allCheckbox).not.toBeChecked();
        expect(driverCheckbox).toBeChecked();
        expect(riderCheckbox).not.toBeChecked();
    })
});


