import { loadStripe } from "@stripe/stripe-js";

import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { subscriptionSliceActions } from "../../features/subscriptionSlice";
import { selectUser } from "../../features/userSlice";

import db from "../../firebase";

const Plans = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscriptionQuery = collection(
      doc(collection(db, "customers"), user.uid),
      "subscriptions"
    );

    onSnapshot(subscriptionQuery, (querySnapshot) => {
      querySnapshot.forEach(async (subscription) => {
        setSubscription({
          role: subscription.data().role,
          current_period_end: subscription.data().current_period_end.seconds,
          start: subscription.data().current_period_start.seconds,
        });
        dispatch(
          subscriptionSliceActions.changePlan({
            plan: subscription.data().role,
          })
        );
        window.localStorage.setItem("subscription", subscription.data().role);
      });
    });
  }, [user.uid, dispatch]);

  useEffect(() => {
    const q = query(collection(db, "products"), where("active", "==", true));

    onSnapshot(q, (querySnapshot) => {
      const products = {};

      querySnapshot.forEach((doc) => {
        products[doc.id] = doc.data();

        const priceQuery = query(collection(doc.ref, "prices"));

        onSnapshot(priceQuery, (priceSnap) => {
          priceSnap.forEach((price) => {
            products[doc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
      });

      setProducts(products);
    });
  }, []);

  const loadCheckout = async (priceId) => {
    const docRef = await addDoc(
      collection(
        doc(collection(db, "customers"), user.uid),
        "checkout_sessions"
      ),
      {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occurred: ${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51KjmvbIMYA40NHIHtUVhplxwsm3f5GI0ENChOiOGnITsIbl8wDuZjw6CajIlu9GHJcOD5Hu8UJbt13qWwYCmSLG000YWaGgWLV"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div>
      <br />
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name?.includes(subscription?.role);
        return (
          <div
            className="flex justify-between md:p-5 py-3 opacity-50 hover:opacity-100"
            key={productId}
          >
            <div>
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              style={{
                backgroundColor: isCurrentPackage ? "#555" : "#c50914",
                cursor: !isCurrentPackage ? "pointer" : "default",
              }}
              className={`px-5 py-[10px] text-base `}
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Plans;
