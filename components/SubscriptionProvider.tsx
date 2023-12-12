"use client";
import { subscriptionRef } from "@/lib/converters/Subscription";
import { useSubscriptionStore } from "@/store/store";
import { onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { Children, useEffect, useState } from "react";
const SubscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const setSubscription = useSubscriptionStore(
    (state) => state.setSubscription
  );

  useEffect(() => {
    if (!session) return;
    return onSnapshot(
      subscriptionRef(session?.user.id),
      (snapshot) => {
        if (snapshot.empty) {
          console.log("User has no subscription.");
          // set no subscription
          setSubscription(null);
        } else {
          console.log("User has subscription.");
          // setSubscription

          let subscriptionData = snapshot.docs[0].data();
          subscriptionData.role = "pro";
          setSubscription(subscriptionData);
          // setSubscription(snapshot.docs[0].data());
        }
      },
      (error) => {
        console.log("Error getting documents:", error);
      }
    );
  }, [session, setSubscription]);
  return <>{children}</>;
};

export default SubscriptionProvider;
