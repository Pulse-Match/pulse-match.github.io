import { useState, type FormEvent } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import confetti from 'canvas-confetti';

type Status = "idle" | "submitting" | "success" | "error";

export function WaitlistForm({ variant = "default" }: { variant?: "default" | "compact" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Please enter your email.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      await addDoc(collection(db, "waitlist"), {
        email,
        createdAt: serverTimestamp(),
        source: variant === "compact" ? "nav-header" : "landing-page",
      });
      setStatus("success");
      setEmail("");

      // Celebrate with confetti!
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#059669', '#10b981', '#ffffff', '#ea580c']
      });
    } catch (error) {
      console.error("Firebase Error:", error);
      setStatus("error");
      const firebaseError = error as { code?: string; message?: string };
      setErrorMessage(
        firebaseError.code === "permission-denied"
          ? "Database permission error. Please check Firestore rules."
          : "Something went wrong: " +
          (firebaseError.message || "Unknown error"),
      );
    }
  };

  if (status === "success") {
    return (
      <div className={`waitlist-success ${variant === "compact" ? "waitlist-success-compact" : ""}`}>
        <span className="waitlist-success-icon">&#10003;</span>
        {variant !== "compact" && (
          <div>
            <h3>You're on the list!</h3>
            <p>We'll notify you when Glid launches in your city.</p>
          </div>
        )}
        {variant === "compact" && <span>Success!</span>}
      </div>
    );
  }

  return (
    <div className={variant === "compact" ? "waitlist-compact-container" : ""}>
      <form onSubmit={handleSubmit} className={`waitlist-form ${variant === "compact" ? "waitlist-form-compact" : ""}`}>
        <input
          type="email"
          placeholder={variant === "compact" ? "Email address" : "Enter your email address"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? (variant === "compact" ? "..." : "Joining...") : (variant === "compact" ? "Join" : "Join Waitlist")}
        </button>
      </form>

      {status === "error" && (
        <p
          style={{
            color: "#FF3B30",
            fontSize: "0.85rem",
            textAlign: "center",
            marginTop: "12px",
          }}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
