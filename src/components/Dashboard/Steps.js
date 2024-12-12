import { Button, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";

const Steps = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      label: "The Program Of the Day",
      description: `For each ad campaign that you create, you can control how much
    you're willing to spend on clicks and conversions, which networks
    `,
    },
    {
      label: "The Program Of the Day",
      description: `For each ad campaign that you create, you can control how much
    you're willing to spend on clicks and conversions, which networks
    `,
    },
    {
      label: "The Program Of Tomorrow",
      description: `For each ad campaign that you create, you can control how much
    you're willing to spend on clicks and conversions, which networks
    `,
    },
    {
      label: "Another Program for Tomorrow",
      description: `For each ad campaign that you create, you can control how much
    you're willing to spend on clicks and conversions, which networks
    `,
    },
    {
      label: "Another Program for Tomorrow",
      description: `For each ad campaign that you create, you can control how much
    you're willing to spend on clicks and conversions, which networks
    `,
    },
    {
      label: "Another Program for Tomorrow",
      description: `For each ad campaign that you create, you can control how much
    you're willing to spend on clicks and conversions, which networks
    `,
    },
  ];

  return (
    <div className="px-4 max-h-[420px]">
      <div className="max-h-full overflow-auto hide-scroll flex justify-start">
        <Stepper
          sx={{ borderColor: "#fff" }}
          activeStep={activeStep}
          orientation="vertical"
        >
          {steps.map(({ label, description }) => (
            <Step key={label}>
              <StepLabel>
                <p>{label}</p>
              </StepLabel>
              <StepContent>
                <p>{description}</p>
                <div>
                  <Button
                    onClick={() =>
                      setActiveStep((prev) =>
                        prev < steps.length ? prev + 1 : 0
                      )
                    }
                  >
                    Next
                  </Button>
                  <Button
                    onClick={() =>
                      setActiveStep((prev) =>
                        prev > 0 ? prev - 1 : steps.length
                      )
                    }
                  >
                    Back
                  </Button>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
};

export default Steps;
