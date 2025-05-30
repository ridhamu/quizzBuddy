import { Spinner } from 'flowbite-react';

export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-12">
      <h2 className="text-center font-semibold font-main text-3xl animate-pulse text-black">
        Just a Sec...
      </h2>

      <Spinner className="size-20 text-white fill-cgreen" />
    </div>
  );
}
