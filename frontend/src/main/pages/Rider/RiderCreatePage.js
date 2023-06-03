import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import RiderForm from "main/components/Rider/RiderForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";
import { useCurrentUser } from "main/utils/currentUser";

export default function RiderCreatePage() {

  const { data: rider } = useCurrentUser();
  


  const objectToAxiosParams = (ride) => ({
    url: "/api/riders/post",
    method: "POST",
    params: {
      riderId: rider.root.user.id,
      day: ride.day,
      startTime: ride.startTime,
      endTime: ride.endTime,
      pickupLocation:ride.pickupLocation,
      dropoffLocation: ride.dropoffLocation
      
    }
  });

  const onSuccess = (ride) => {
    toast(`New Ride Created - id: ${ride.id} riderId: ${rider.root.user.id}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
     { onSuccess }, 
     // Stryker disable next-line all : hard to set up test for caching
     ["/api/riders/all"]
     );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data)
  };
  

  if (isSuccess) {
    return <Navigate to="/riders/" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New Ride</h1>
        <RiderForm submitAction={onSubmit} />
      </div>
    </BasicLayout>
  )
}
