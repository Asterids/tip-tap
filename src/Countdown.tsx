import { useEffect, useState } from "react";

type CountdownProps = {
  initialTimer: number;
  timeoutId: ReturnType<typeof setTimeout>;
  finishTest: () => void;
};

export default function Countdown({
  initialTimer,
  timeoutId,
  finishTest,
}: CountdownProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialTimer);

  useEffect(() => {
    if (!secondsRemaining) return;

    timeoutId = setTimeout(() => {
      if (secondsRemaining - 1 === 0) {
        finishTest();
      }

      setSecondsRemaining(secondsRemaining - 1);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [secondsRemaining]);

  return (
    <div className="countdown">
      <div className="countdown-box">
        <p>{secondsRemaining}</p>
      </div>
    </div>
  );
}
