import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RiderForm from "main/components/Rider/RiderForm";
import { riderFixtures } from "fixtures/riderFixtures";
import { QueryClient, QueryClientProvider } from "react-query";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("RiderForm tests", () => {
  const queryClient = new QueryClient();

  const expectedHeaders = ["Day", "Start Time", "End Time", "Pickup Location", "Dropoff Location"];
  const testId = "RiderForm";

  test("renders correctly with no initialContents", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <RiderForm />
        </Router>
      </QueryClientProvider>
    );

    expect(await screen.findByText(/Create/)).toBeInTheDocument();

    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });
  });

  

  test("renders correctly when passing in initialContents", async () => {
    render(
        <QueryClientProvider client={queryClient}>
            <Router>
                <RiderForm initialContents={riderFixtures.oneRide} />
            </Router>
        </QueryClientProvider>
    );

    expect(await screen.findByText(/Create/)).toBeInTheDocument();

    expectedHeaders.forEach((headerText) => {
        const header = screen.getByText(headerText);
        expect(header).toBeInTheDocument();
    });

    expect(await screen.findByTestId(`${testId}-startTime`)).toBeInTheDocument();
    expect(screen.getByText(`Start Time`)).toBeInTheDocument();
});

  test("that navigate(-1) is called when Cancel is clicked", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <RiderForm />
        </Router>
      </QueryClientProvider>
    );
    expect(await screen.findByTestId(`${testId}-cancel`)).toBeInTheDocument();
    const cancelButton = screen.getByTestId(`${testId}-cancel`);

    fireEvent.click(cancelButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
  });
});

