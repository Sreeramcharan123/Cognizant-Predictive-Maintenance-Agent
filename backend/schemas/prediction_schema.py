from pydantic import BaseModel, Field


class MachineInput(BaseModel):

    machine_id: str = Field(
        default="DEMO-001",
        description="Unique machine identifier"
    )

    air_temperature: float = Field(
        ...,
        description="Air temperature in Kelvin"
    )

    process_temperature: float = Field(
        ...,
        description="Process temperature in Kelvin"
    )

    rotational_speed: float = Field(
        ...,
        description="Rotational speed in RPM"
    )

    torque: float = Field(
        ...,
        description="Torque in Nm"
    )

    tool_wear: float = Field(
        ...,
        description="Tool wear in minutes"
    )

    machine_type: str = Field(
        ...,
        description="Machine type: L, M or H"
    )