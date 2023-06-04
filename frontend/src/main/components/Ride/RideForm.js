import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
function RideForm({ initialContents, submitAction, buttonLabel = "Create" }) {

    
    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialContents || {}, }
    );
    // Stryker enable all
    const navigate = useNavigate();

    //const testIdPrefix = "RideForm";

    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            {initialContents && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        data-testid={"RideForm-id"}
                        id="id"
                        type="text"
                        {...register("id")}
                        value={initialContents.id}
                        disabled
                    />
                </Form.Group>
            )}

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="day">Day</Form.Label>
                <Form.Control
                    data-testid={"RideForm-day"}
                    id="day"
                    type="text"
                    isInvalid={Boolean(errors.day)}
                    {...register("day", {
                        required: "Day is required.",

                    })}
                    placeholder="eg: Monday"
                />
                <Form.Control.Feedback type="invalid">
                    {errors.day?.message}
                </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" >
                <Form.Label htmlFor="startTime">Start Time</Form.Label>
                <Form.Control
                    data-testid={"RideForm-startTime"}
                    id="startTime"
                    type="text"
                    isInvalid={Boolean(errors.startTime)}
                    {...register("startTime", {
                        required: "Start time is required.",

                    })}
                    placeholder="eg: 8:00pm"
                />
                <Form.Control.Feedback type="invalid">
                    {errors.startTime?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="endTime">End Time</Form.Label>
                <Form.Control
                    data-testid={"RideForm-endTime"}
                    id="endTime"
                    type="text"
                    isInvalid={Boolean(errors.endTime)}
                    {...register("endTime", {
                        required: "End time is required.",

                    })}
                    placeholder="eg: 8:00pm"

                />
                <Form.Control.Feedback type="invalid">
                    {errors.endTime?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="pickupLocation">Pickup Location</Form.Label>
                <Form.Control
                    data-testid={"RideForm-pickupLocation"}
                    id="pickupLocation"
                    type="text"
                    isInvalid={Boolean(errors.pickupLocation)}
                    {...register("pickupLocation", {
                        required: "Pickup location is required.",

                    })}
                    placeholder="eg: Library"

                />
                <Form.Control.Feedback type="invalid">
                    {errors.pickupLocation?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="dropoffLocation">Dropoff Location</Form.Label>
                <Form.Control
                    data-testid={"RideForm-dropoffLocation"}
                    id="dropoffLocation"
                    type="text"
                    isInvalid={Boolean(errors.dropoffLocation)}
                    {...register("dropoffLocation", {
                        required: "Dropoff location is required.",

                    })}
                    placeholder="eg: Library"

                />
                <Form.Control.Feedback type="invalid">
                    {errors.dropoffLocation?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                type="submit"
                data-testid={"RideForm-submit"}
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid={"RideForm-cancel"}
            >
                Cancel
            </Button>

        </Form>

    )
}

export default RideForm;