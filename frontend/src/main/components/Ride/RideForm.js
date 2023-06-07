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

    const testIdPrefix = "RideForm";

    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            {initialContents && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix+"-id"}
                        id="id"
                        type="text"
                        {...register("id")}
                        value={initialContents.id}
                        disabled
                    />
                </Form.Group>
            )}

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="day">Day of Week</Form.Label>
                <Form.Select
                    data-testid={testIdPrefix+"-day"}
                    id="day"
                    isInvalid={Boolean(errors.day)}
                    {...register("day", {
                        required: "Day is required.",
                    })}
                >
                <option value="">Select a Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {errors.day?.message}
                </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" >
                <Form.Label htmlFor="startTime">Start Time</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix+"-startTime"}
                    id="startTime"
                    type="text"
                    isInvalid={Boolean(errors.startTime)}
                    {...register("startTime", {
                        required: "Start time is required.",
                        pattern: {
                            value: /^(0?[1-9]|1[0-2]):[0-5][0-9](AM|PM)$/,
                            message: "Use format: (eg: 3:30PM)"
                          }
                    })}
                    placeholder="eg: HH:MM AM/PM (eg: 3:30PM)"
                    value={initialContents?.startTime}

                />
                <Form.Control.Feedback type="invalid">
                    {errors.startTime?.message}
                </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" >
                <Form.Label htmlFor="endTime">End Time</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix+"-endTime"}
                    id="endTime"
                    type="text"
                    isInvalid={Boolean(errors.endTime) }
                    {...register("endTime", {
                        required: "End time is required.",
                        pattern: {
                            value: /^(0?[1-9]|1[0-2]):[0-5][0-9](AM|PM)$/,
                            message: "Use format HH:MM AM/PM (eg: 3:30PM)."
                          }
                    })}
                    placeholder="eg: HH:MM AM/PM (eg: 3:30PM)"  
                    value={initialContents?.endTime}     
                />
                <Form.Control.Feedback type="invalid">
                    {errors.endTime?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="pickupLocation">Pickup Location</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix+"-pickupLocation"}
                    id="pickupLocation"
                    type="text"
                    isInvalid={Boolean(errors.pickupLocation)}
                    {...register("pickupLocation", {
                        required: "Pickup location is required.",

                    })}
                    placeholder="eg: Library"
                    value={initialContents?.pickupLocation}

                />
                <Form.Control.Feedback type="invalid">
                    {errors.pickupLocation?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="dropoffLocation">Dropoff Location</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix+"-dropoffLocation"}
                    id="dropoffLocation"
                    type="text"
                    isInvalid={Boolean(errors.dropoffLocation)}
                    {...register("dropoffLocation", {
                        required: "Dropoff location is required.",

                    })}
                    placeholder="eg: Library"
                    value={initialContents?.dropoffLocation}


                />
                <Form.Control.Feedback type="invalid">
                    {errors.dropoffLocation?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                type="submit"
                data-testid={testIdPrefix+"-submit"}
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid={testIdPrefix+"-cancel"}
            >
                Cancel
            </Button>

        </Form>

    )
}

export default RideForm;