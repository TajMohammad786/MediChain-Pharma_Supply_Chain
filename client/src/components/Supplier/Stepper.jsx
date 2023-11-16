import React from 'react';
import { Fragment } from 'react';

const CustomStepper = (props) => {
  const { activeStep, getSteps, getStepContent } = props;

  return (
    <>
      <div className="flex items-center justify-center space-x-8">
        {getSteps().map((label, index) => (
          <Fragment key={label}>
            <div className="flex flex-col items-center">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-white ${
                  index < activeStep
                    ? 'bg-indigo-600' // completed step
                    : index === activeStep
                    ? 'bg-indigo-500' // active step
                    : 'bg-gray-300' // inactive step
                }`}
              >
                {index + 1}
              </div>
              <p className="mt-2 text-sm font-medium text-gray-600">{label}</p>
            </div>
            {index < getSteps().length - 1 && (
              <div className={`flex-1 h-0.5 ${index < activeStep ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
            )}
          </Fragment>
        ))}
      </div>
      <div className="flex flex-col items-center mt-6">
        <div className="mt-2 text-lg font-medium text-gray-700">{getStepContent(activeStep)}</div>
      </div>
    </>
  );
};

export default CustomStepper;
