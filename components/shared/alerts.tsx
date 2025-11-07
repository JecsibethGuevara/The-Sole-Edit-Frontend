import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  MessageSquareWarning,
} from "lucide-react";
type AlertProps = {
  type: string;
  text: string;
  title: string;
};

export const alerts = ({ type, text, title }: AlertProps) => {
  return (
    <>
      {type == "success" && (
        <Alert className="bg-green-300">
          <CheckCircle2Icon />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{text}</AlertDescription>
        </Alert>
      )}
      {type == "warning" && (
        <Alert className="bg-yellow-200">
          <MessageSquareWarning />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{text}</AlertDescription>
        </Alert>
      )}
      {type == "danger" && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Unable to process your payment.</AlertTitle>
          <AlertDescription>
            <p>Please verify your billing information and try again.</p>
            <ul className="list-inside list-disc text-sm">
              <li>Check your card details</li>
              <li>Ensure sufficient funds</li>
              <li>Verify billing address</li>
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
