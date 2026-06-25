import { loadStripe } from "@stripe/stripe-js";

const options = {
    developerTools:{
        assistant:{
            enabled:false
        }
    }
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY, options);

export default stripePromise;