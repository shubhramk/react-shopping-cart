import { useContext, useState, useTransition, useId, type ChangeEvent, type FormEvent, useMemo } from "react";
import { UserContext } from "../../../common/context/context";
import "./Payment.css";
import { Navigate } from "react-router";
import { CartService } from "../../../common/services/cart.service";

type FormState = {
  nameOnCard: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  nameOnCard: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

const Payment = () => {
  const {user} = useContext(UserContext);
 
  const [isPending, startTransition] = useTransition();
  const id = useId();

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const cartItems = () => useMemo(() => {
    const cartItems = CartService.getCart();
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const totalItems = cartItems.length;
    return {total, totalItems};
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): Errors => {
    const err: Errors = {};
    if (!form.nameOnCard.trim()) err.nameOnCard = "Name on card is required";
    if (!/^\d{13,19}$/.test(form.cardNumber.replace(/\s+/g, "")))
      err.cardNumber = "Enter a valid card number (13-19 digits)";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry))
      err.expiry = "Expiry must be MM/YY";
    if (!/^\d{3,4}$/.test(form.cvv)) err.cvv = "CVV must be 3 or 4 digits";
    return err;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    setSubmitting(true);
    // Simulate payment processing
    setTimeout(() => {
      startTransition(() => {
        setSubmitting(false);
        setSuccess(true);
        setForm(initialForm);
      });
    }, 1000);
  };

  if (success) {
    return (
      <div className="payment payment--success" aria-live="polite">
        <h2 className="payment__title">Payment Successful</h2>
        <p className="payment__message">
          Thank you{user?.name ? `, ${user.name}` : ""}. Your payment has been processed.
        </p>
        <button className="btn" onClick={() => setSuccess(false)}>
          Make another payment
        </button>
      </div>
    );
  }

   if (!user?.name) {
     return <Navigate to="/unauthorized" replace />;
   }

  return (
    <main className="payment">
      <div className="payment__container">
        <h2 className="payment__title">
          Payment Section for {user?.name ?? "Guest"}
        </h2>

        {/* Order summary (stub) */}
        <section className="order-summary" aria-labelledby={`summary-heading-${id}`}>
          <h3 id={`summary-heading-${id}`} className="order-summary__title">
            Order Summary
          </h3>
          <ul className="order-summary__list">
            <li>
              Items: <strong>{cartItems()?.totalItems}</strong>
            </li>
            <li>
              Total: <strong>${cartItems()?.total}</strong>
            </li>
          </ul>
        </section>

        <form className="payment-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label className="form-label">
              Name on card
              <input
                className={`form-input ${
                  errors.nameOnCard ? "is-invalid" : ""
                }`}
                name="nameOnCard"
                value={form.nameOnCard}
                onChange={handleChange}
                aria-invalid={!!errors.nameOnCard}
                placeholder="Full name"
                type="text"
              />
            </label>
            {errors.nameOnCard && (
              <div className="form-error" role="alert">
                {errors.nameOnCard}
              </div>
            )}
          </div>

          <div className="form-row">
            <label className="form-label">
              Card number
              <input
                className={`form-input ${
                  errors.cardNumber ? "is-invalid" : ""
                }`}
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                inputMode="numeric"
                placeholder="4242 4242 4242 4242"
                aria-invalid={!!errors.cardNumber}
                type="text"
              />
            </label>
            {errors.cardNumber && (
              <div className="form-error" role="alert">
                {errors.cardNumber}
              </div>
            )}
          </div>

          <div className="form-row form-row--split">
            <label className="form-label">
              Expiry (MM/YY)
              <input
                className={`form-input ${errors.expiry ? "is-invalid" : ""}`}
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                placeholder="08/25"
                aria-invalid={!!errors.expiry}
                type="text"
              />
            </label>
            {errors.expiry && (
              <div className="form-error" role="alert">
                {errors.expiry}
              </div>
            )}

            <label className="form-label">
              CVV
              <input
                className={`form-input ${errors.cvv ? "is-invalid" : ""}`}
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                inputMode="numeric"
                placeholder="123"
                aria-invalid={!!errors.cvv}
                type="text"
              />
            </label>
            {errors.cvv && (
              <div className="form-error" role="alert">
                {errors.cvv}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button className="btn" type="submit" disabled={submitting || isPending}>
              {submitting || isPending ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Payment;
