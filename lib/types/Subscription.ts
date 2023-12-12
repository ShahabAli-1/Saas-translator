import { DocumentReference, Timestamp, DocumentData } from "firebase/firestore";
import Stripe from "stripe";

export interface Subscription {
  id?: string;
  metadata: {};
  stripeLink: string;
  role: string | null;
  quantity: number;
  items: Stripe.SubscriptionItem[];
  product: DocumentReference<DocumentData>;
  price: DocumentReference<DocumentData>;
  prices: Array<DocumentReference<DocumentData>>;
  payment_method?: string;
  latest_invoice?: string;
  status:
    | "active"
    | "canceled"
    | "incomplete"
    | "incomplete_expired"
    | "past_due"
    | "trialing"
    | "unpaid";

  cancel_at_period_end: Timestamp | null;
  created: Timestamp | null;
  current_period_start: Timestamp | null;
  current_period_end: Timestamp | null;
  ended_at: Timestamp | null;
  cancel_at: Timestamp | null;
  canceled_at: Timestamp | null;
  trial_start: Timestamp | null;
  trial_end: Timestamp | null;
}
