import { render } from "@testing-library/react";
import HomePage from "main/pages/HomePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures }  from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

describe("HomePage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);
    axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
    axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HomePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

   test("home page styles", () => {
    const {getByTestId} = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HomePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(getByTestId("UCSBLogo")).toHaveStyle("width: 150px");
        expect(getByTestId("UCSBLogo")).toHaveStyle("display: inline-block");
        expect(getByTestId("UCSBLogo")).toHaveStyle("verticalAlign: middle");
        expect(getByTestId("UCSBLogo")).toHaveStyle("margin: 0px 20px");

        expect(getByTestId("header")).toHaveStyle("display: inline-block");
        expect(getByTestId("header")).toHaveStyle("verticalAlign: middle");

        expect(getByTestId("container")).toHaveStyle("margin: 0px 20px");
        expect(getByTestId("container")).toHaveStyle("backgroundColor:#f5f5f5");
        expect(getByTestId("container")).toHaveStyle("padding: 20px");

    });

});


