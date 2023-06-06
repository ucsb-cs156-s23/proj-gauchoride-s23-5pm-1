port { render, waitFor, fireEvent } from "@testing-library/react";
import RideCreatePage from "main/pages/Ride/RideCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("RideCreatePage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    test("renders without crashing", () => {
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RideCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();
        const ride = {
            id:17,
            rideId:3,
            day:"Tuesday",
            startTime:"4:30pm",
            endTime:"5:30pm",
            pickupLocation:"San Clemente",
            dropoffLocation:"Music Building",
        };

        axiosMock.onPost("/api/rides/post").reply( 202, ride );

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RideCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(getByTestId("RideForm-day")).toBeInTheDocument();
        });

        const dayField = getByTestId("RideForm-day");
        const startTimeField = getByTestId("RideForm-startTime");
        const endTimeField = getByTestId("RideForm-endTime");
        const pickupLocationField = getByTestId("RideForm-pickupLocation");
        const dropoffLocationField = getByTestId("RideForm-dropoffLocation");
        const submitButton = getByTestId("RideForm-submit");

        fireEvent.change(dayField, { target: { value: 'Tuesday' } });
        fireEvent.change(startTimeField, { target: { value: '4:30pm' } });
        fireEvent.change(endTimeField, { target: { value: '5:30pm' } });
        fireEvent.change(pickupLocationField, { target: { value: 'San Clemente' } });
        fireEvent.change(dropoffLocationField, { target: { value: 'Music Building' } });


        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual(
            {
                "rideId":2,
                "day":"Tuesday",
                "startTime":"4:30pm",
                "endTime":"5:30pm",
                "pickupLocation":"San Clemente",
                "dropoffLocation":"Music Building",
        });

        expect(mockToast).toBeCalledWith("New Ride Created - id: 17 rideId: 2");
        expect(mockNavigate).toBeCalledWith({ "to": "/rides/" });
    });


});