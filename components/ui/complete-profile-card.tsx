import { Large, Small } from "../shared/typography";
import { Progress } from "./progress";

export default function CompleteProfileCard({
  progress = 20,
}: {
  progress?: number;
}) {
  return (
    <div className="min-w-[400px] max-w-full rounded bg-neutral-50 px-6 py-3 text-neutral-800">
      <Large className="mb-0">Complete your profile</Large>
      <Small>Fill in your profile to unlock the full experience.</Small>
      <div className="mt-3 flex items-center gap-2">
        <Small>{progress}%</Small>
        <Progress value={progress} className="h-[5px] w-full" />
      </div>
    </div>
  );
}
