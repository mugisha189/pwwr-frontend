'use client';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import React from 'react';

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorComponent = (props: Props) => {
  const { error, reset } = props;
  console.log('error', error);

  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Oops!</h1>
      {/* <p className="text-lg">{error.message}</p> */}
      <p className="text-lg text-center">
        An error occurred. Please try again or contact the website administrator if the problem persists.
      </p>
      <div className="flex items-center mt-4 gap-3">
        <Button onClick={reset} style={{ color: 'white' }} className="px-4 py-2 rounded-full">
          Try Again
        </Button>
        <p>Or</p>
        <Link to="/" className="text-primary underline">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorComponent;
