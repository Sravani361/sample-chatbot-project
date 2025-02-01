import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup,createUserWithEmailAndPassword,sendEmailVerification,onAuthStateChanged,GoogleAuthProvider} from "firebase/auth";
import { auth, provider } from "../../firebase"; 

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [GoogleUser, setGoogleUser] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setEmail(user.email);
        setName(user.displayName);
        setGoogleUser(true);

        if (!user.emailVerified) {
          sendEmailVerification(user).then(() => {
            alert("Verification mail sent. Please check your inbox.");
          });
        } else {
          setIsVerified(true);
          navigate("/setup");
        }
      })
      .catch((error) => {
        console.error("Google Login Error: ", error.message);
      });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const Credentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = Credentials.user;
      await sendEmailVerification(user);
      alert("Verification mail sent! Please check your inbox.");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleVerification = () => {
    const user = auth.currentUser;
    if (user && user.emailVerified) {
      navigate("/setup");
    } else {
      alert("Please verify your email.");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        setName(user.displayName);
        setIsVerified(user.emailVerified);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      {!GoogleUser && (
        <form onSubmit={handleRegistration} className="mb-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 mb-2 w-full"
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 mb-2 w-full"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mb-2 w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 w-full"
          >
            Register
          </button>
        </form>
      )}

      <button
        type="button"
        onClick={handleLogin}
        className="bg-red-500 text-white p-2 w-full mb-2"
      >
        Continue with Google
      </button>

      {isVerified ? (
        <p className="text-green-500 text-center">✅ Email Verified! You can proceed.</p>
      ) : (
        <p className="text-red-500 text-center">❌ Verify your email to continue.</p>
      )}

      <button
        type="button"
        onClick={handleVerification}
        className="bg-green-500 text-white p-2 w-full mt-2"
        disabled={!isVerified}
      >
        Proceed to Setup
      </button>
    </div>
  );
};

export default Registration;
