import { useEffect, useState } from "react";

type CountdownProps = {
  initialTimer: number;
  intervalId: ReturnType<typeof setInterval>;
  finishTest: () => void;
};

export default function Countdown({
  initialTimer,
  intervalId,
  finishTest,
}: CountdownProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialTimer);

  useEffect(() => {
    if (!secondsRemaining) return;

    intervalId = setInterval(() => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        finishTest();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsRemaining]);

  return (
    <div className="countdown">
      <p>{secondsRemaining}</p>
    </div>
  );
}
