import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

// Time formatting function
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

// Props type definitions
interface CountDownButtonProps {
  defaultText?: string;         // Text displayed after the countdown ends
  countingTextPrefix?: string;  // Prefix displayed during the countdown
  countdownTime?: number;       // Total countdown duration (seconds)
  onAction?: () => void;        // Action to execute when the countdown ends
  className?: string;
  style?: React.CSSProperties;
  trigger?: any;
  loading?: boolean;
}

const CountDownButton: React.FC<CountDownButtonProps> = ({
  defaultText = 'Next',
  countingTextPrefix = '',
  countdownTime = 1,
  onAction = () => { },
  className = 'next_btn',
  style,
  trigger,
  loading
}) => {
  const [remaining, setRemaining] = useState<number>(countdownTime);
  const [isCounting, setIsCounting] = useState<boolean>(true);

  useEffect(() => {
    if (trigger !== undefined) {
      setRemaining(countdownTime);
      setIsCounting(true);
    }
  }, [trigger, countdownTime]);

  useEffect(() => {
    if (!isCounting || remaining <= 0) return;

    const timer = setInterval(() => {
      setRemaining(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isCounting, remaining]);

  // Countdown end logic
  useEffect(() => {
    if (remaining <= 0 && isCounting) {
      setIsCounting(false);
    }
  }, [remaining, isCounting]);

  const handleClick = () => {
    if (!isCounting) {
      onAction();
    }
  };

  return (
    <Button
      type="primary"
      onClick={handleClick}
      disabled={isCounting}
      className={className}
      style={style}
      loading={loading}
    >
      {isCounting ? `${countingTextPrefix}${formatTime(remaining)}` :
        <svg style={{
          width: '20px'
        }} t="1772174831222" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2725" width="256" height="256"><path d="M533.33333333 568.24999998l0-112.49999996L130.18958332 455.75A46.85625001 46.85625001 0 0 0 83.33333334 502.60624999l0 18.78750002A46.85625001 46.85625001 0 0 0 130.18958332 568.25L533.33333333 568.24999998z" fill="#ffffff" p-id="2726"></path><path d="M604.77083334 749.15l314.71875-194.0625a46.85625001 46.85625001 0 0 0 0.50624999-79.48125001l-314.71875001-199.29375A46.85625001 46.85625001 0 0 0 533.33333333 315.91249999L533.33333333 709.26875a46.85625001 46.85625001 0 0 0 71.43750001 39.93749999z" fill="#ffffff" p-id="2727"></path></svg>}
    </Button>
  );
};

export default CountDownButton;