"use client";

import { db } from "@/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { addDoc } from "firebase/firestore";
import LoadingSpinner from "./LoadingSpinner";
import { useSubscriptionStore } from "@/store/store";
import ManageAccountButton from "./ManageAccountButton";
const CheckoutButton = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const subscription = useSubscriptionStore((state) => state.subscription);
  const isLoadingSubscription = subscription === undefined;
  const isSubscribed =
    subscription?.status === "active" && subscription?.role === "pro";
  const createCheckoutSession = async () => {
    if (!session?.user.id) return;
    // push a doc to firestore database
    setLoading(true);

    const docRef = await addDoc(
      collection(db, "customers", session.user.id, "checkout_sessions"),
      {
        price: "price_1OLUI0DrpXEaFFZ9pKC3Dayh",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );
    // ... stripe extention on firebase will create checkout session

    onSnapshot(docRef, async (snap) => {
      const data = snap.data();
      const url = await data?.url;
      const error = data?.error;

      if (error) {
        // show an error to your customer and
        // in spect your cloud functions logs in the firebase console
        console.log(error);
        alert(`An error occured: ${error.message}`);
        setLoading(false);
      }
      if (url) {
        // if we get stripe checkout url
        // redirect

        window.location.assign(url);
        setLoading(false);
        console.log(url);
      }
    });
    // redirect user to that checkout page
  };
  return (
    // if subscribed, show me the user is subscribed
    <div className="flex flex-col space-y-2">
      {isSubscribed && (
        <>
          <hr className="mt-5" />
          <p className="pt-5 text-center text-xs text-indigo-600">
            Your are Subscribed to PRO
          </p>
        </>
      )}
      <div className="mt-8 rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80">
        {isSubscribed ? (
          <ManageAccountButton />
        ) : isLoadingSubscription || loading ? (
          <LoadingSpinner />
        ) : (
          <button onClick={createCheckoutSession}>Sign Up</button>
        )}
      </div>
    </div>
  );
};

export default CheckoutButton;
