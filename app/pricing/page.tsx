import React from "react";
import PricingCards from "@/components/PricingCards";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
const PricingPage = async () => {
  // const session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <div className="isolate overflow-hidden bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            Pricing{" "}
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5x1">
            The right price for you,{" "}
            <br className="hidden sm:inline lg:hidden" />
            whoever you are
          </p>
        </div>
        <div className="relative mt-6">
          <p
            className="mx-auto max-w-2xl text-lg leading-8
text-white/60"
          >
            Were 99% sure we have a plan to match 100% of your needs
          </p>
          <div
            className="absolute inset-x-0 top-[calc(100%-13 rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm: top-[calc(100%-30 rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc (50% +3 rem)] aspect-[1155/678] w-[36.125 rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to- [#9089fc] opacity-30 sm: left-[calc(50%+36 rem)] sm: w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon (74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0. 1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="flow-root bg-white pb-24 sm:pb-32">
        <div className="-mt-80">
          <PricingCards redirect={true} />
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
