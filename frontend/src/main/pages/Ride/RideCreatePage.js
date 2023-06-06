import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import RideForm from "main/components/Ride/RideForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";


export default function RideCreatePage() {


  const objectToAxiosParams = (ride) => ({
    url: "/api/rides/post",
    method: "POST",
    params: {
      day: ride.day,
      startTime: ride.startTime,
      endTime: ride.endTime,
      pickupLocation:ride.pickupLocation,
      dropoffLocation: ride.dropoffLocation

    }
  });

  const onSuccess = (ride) => {
    toast(`New Ride Created - id: ${ride.id}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
     { onSuccess }, 
     // Stryker disable next-line all : hard to set up test for caching
     ["/api/rides/all"]
     );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data)
  };


  if (isSuccess) {
    return <Navigate to="/rides/" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New Ride</h1>
        <RideForm submitAction={onSubmit} />
      </div>
    </BasicLayout>
  )
}