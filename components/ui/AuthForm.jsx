"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api/experiences";
import EmailConfirmationModal from "@/components/ui/EmailConfirmationModal";

export default function AuthForm() {
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600&display=swap');

    /* ”€”€ CARD ”€”€ */
    .card {
      position: relative;
      width: 800px;
      min-height: 520px;
      height: auto;

      overflow: hidden;
      border: 1px solid rgba(0,212,255,0.18);
      box-shadow: 0 0 60px rgba(0,212,255,0.06), 0 0 1px rgba(0,212,255,0.2) inset;
      animation: cardIn 0.7s cubic-bezier(0.22,1,0.36,1) both;
    }

    /* corner brackets */
    .br1,.br2,.br3,.br4 {
      position: absolute;
      width: 16px; height: 16px;
      border-color: #00d4ff;
      border-style: solid;
      z-index: 30;
      pointer-events: none;
    }
    .br1 { top:0; left:0; border-width: 2px 0 0 2px; }
    .br2 { top:0; right:0; border-width: 2px 2px 0 0; }
    .br3 { bottom:0; right:0; border-width: 0 2px 2px 0; }
    .br4 { bottom:0; left:0; border-width: 0 0 2px 2px; }

    /* ”€”€ FORMS LAYER (behind overlay) ”€”€ */
    .forms-area {
      position: relative;
      width: 100%;
      display: flex;
      align-items: stretch;
      z-index: 10;
    }

    .form-half {
      width: 50%;
      background: #0a0a0a;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 34px 50px;
      overflow: auto;
    }

    .form-half.login-half {
      justify-content: center;
    }

    .form-title {
      font-family: 'Orbitron', monospace;
      font-size: 20px;
      font-weight: 700;
      color: white;
      letter-spacing: 1px;
      margin-bottom: 4px;
    }
    .form-sub {
      font-size: 12px;
      color: rgba(255,255,255,0.28);
      margin-bottom: 26px;
      letter-spacing: 0.5px;
    }

    .field { margin-bottom: 15px; }
    .field label {
      display: block;
      font-size: 9px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: rgba(0,212,255,0.55);
      margin-bottom: 6px;
      font-weight: 600;
    }
    .field input {
      width: 100%;
      background: rgba(0,212,255,0.03);
      border: 1px solid rgba(0,212,255,0.12);
      color: white;
      padding: 11px 14px;
      font-family: 'Rajdhani', sans-serif;
      font-size: 15px;
      outline: none;
      transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    }
    .field input:focus {
      border-color: rgba(0,212,255,0.45);
      background: rgba(0,212,255,0.06);
      box-shadow: 0 0 0 1px rgba(0,212,255,0.08);
    }
    .field input::placeholder { color: rgba(255,255,255,0.18); }

    .submit-btn {
      width: 100%;
      padding: 12px;
      margin-top: 6px;
      background: transparent;
      border: 1px solid #00d4ff;
      color: #00d4ff;
      font-family: 'Orbitron', monospace;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: color 0.3s;
    }
    .submit-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: #00d4ff;
      transform: translateX(-101%);
      transition: transform 0.35s cubic-bezier(0.65,0,0.35,1);
      z-index: 0;
    }
    .submit-btn:hover::before { transform: translateX(0); }
    .submit-btn:hover { color: #080808; }
    .submit-btn.ok::before { transform: translateX(0); }
    .submit-btn.ok { color: #080808; }
    .submit-btn span { position: relative; z-index: 1; }

    .forgot {
      margin-top: 12px;
      font-size: 12px;
      color: rgba(255,255,255,0.22);
      cursor: pointer;
      letter-spacing: 0.4px;
      transition: color 0.2s;
      text-align: center;
    }
    .forgot:hover { color: #00d4ff; }

    /* ”€”€ SLIDING OVERLAY ”€”€ */
    .overlay {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 50%;
      z-index: 20;

      transition: transform 0.5s cubic-bezier(0.65,0,0.35,1);
      background: linear-gradient(140deg, #041e26 0%, #062c38 55%, #041820 100%);
      border-left: 1px solid rgba(0,212,255,0.14);
      border-top-left-radius: 140px;
      border-bottom-left-radius: 140px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding: 50px 48px;
      overflow: hidden;
    }
    .overlay.slide-left {
      transform: translateX(-100%);
      border-left: none;
      border-right: 1px solid rgba(0,212,255,0.14);
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: 140px;
      border-bottom-right-radius: 140px;
    }

    .overlay::after {
      content: '';
      position: absolute;
      bottom: -80px; right: -80px;
      width: 280px; height: 280px;
      background: radial-gradient(circle, rgba(0,212,255,0.09), transparent 65%);
      pointer-events: none;
    }

    .ov-logo {
      font-family: 'Orbitron', monospace;
      font-size: 19px;
      font-weight: 900;
      color: white;
      letter-spacing: 3px;
      margin-bottom: 44px;
    }
    .ov-logo span { color: #00d4ff; }

    .ov-eyebrow {
      font-size: 10px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: rgba(0,212,255,0.65);
      margin-bottom: 10px;
    }
    .ov-title {
      font-family: 'Orbitron', monospace;
      font-size: 26px;
      font-weight: 900;
      color: #fff;
      line-height: 1.15;
      text-transform: uppercase;
      margin-bottom: 0;
    }
    .ov-title .c { color: #00d4ff; }
    .ov-bar {
      width: 36px; height: 2px;
      background: linear-gradient(90deg, #00d4ff, transparent);
      margin: 16px 0;
    }
    .ov-text {
      font-size: 13px;
      color: rgba(255,255,255,0.38);
      line-height: 1.7;
      font-weight: 300;
      letter-spacing: 0.3px;
      margin-bottom: 36px;
    }
    .ov-btn {
      padding: 11px 32px;
      background: transparent;
      border: 1px solid #00d4ff;
      color: #00d4ff;
      font-family: 'Orbitron', monospace;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: color 0.3s;
    }
    .ov-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: #00d4ff;
      transform: translateX(-101%);
      transition: transform 0.3s cubic-bezier(0.65,0,0.35,1);
      z-index: 0;
    }
    .ov-btn:hover::before { transform: translateX(0); }
    .ov-btn:hover { color: #080808; }
    .ov-btn span { position: relative; z-index: 1; }

    .pw-rules {
      margin-top: 10px;
      padding: 10px 12px;
      border: 1px solid rgba(255,255,255,0.08);
      background: rgba(255,255,255,0.02);
      border-radius: 10px;
      font-family: 'Rajdhani', sans-serif;
    }
    .pw-rule {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
      line-height: 1.35;
      color: rgba(255,255,255,0.55);
      margin: 6px 0;
    }
    .pw-rule .icon {
      width: 16px;
      display: inline-flex;
      justify-content: center;
      font-family: 'Orbitron', monospace;
      font-size: 12px;
      letter-spacing: 0;
    }
    .pw-rule.ok { color: rgba(74,222,128,0.95); }
    .pw-rule.bad { color: rgba(248,113,113,0.95); }
    .pw-hint { font-size: 11px; color: rgba(255,255,255,0.30); margin-top: 8px; }

    @media (max-width: 1024px) {
      .card { width: min(760px, 92vw); }
      .form-half { padding: 30px 38px; }
      .overlay { padding: 44px 40px; }
      .ov-title { font-size: 24px; }
      .ov-text { font-size: 12px; }
    }

    @media (max-width: 860px) {
      .card { width: 94vw; }
      .form-half { padding: 28px 28px; }
      .overlay { padding: 40px 34px; border-top-left-radius: 110px; border-bottom-left-radius: 110px; }
      .overlay.slide-left { border-top-right-radius: 110px; border-bottom-right-radius: 110px; }
      .form-title { font-size: 18px; }
      .field input { font-size: 14px; }
      .submit-btn { font-size: 10px; }
    }

    @media (max-width: 720px) {
      .card { width: 96vw; min-height: 0; }
      .form-half { padding: 24px 20px; }
      .field label { letter-spacing: 2px; }
      .overlay { padding: 30px 22px; border-top-left-radius: 90px; border-bottom-left-radius: 90px; }
      .overlay.slide-left { border-top-right-radius: 90px; border-bottom-right-radius: 90px; }
      .ov-logo { font-size: 16px; margin-bottom: 28px; }
      .ov-title { font-size: 20px; }
      .ov-text { font-size: 11px; margin-bottom: 26px; }
      .pw-rule { font-size: 11px; }
    }
  `;

  const router = useRouter();
  const [mode, setMode] = useState("login");
  const [loginData, setLoginData] = useState({ emailOrUsername: "", password: "" });
  const [regData, setRegData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginOk, setLoginOk] = useState(false);

  const [regOk, setRegOk] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailConfirmOpen, setEmailConfirmOpen] = useState(false);
  const [emailConfirmAddress, setEmailConfirmAddress] = useState("");

  const passwordChecks = useMemo(() => {
    const pw = String(regData.password || "");
    return {
      hasLower: /[a-z]/.test(pw),
      hasUpper: /[A-Z]/.test(pw),
      hasNumber: /\d/.test(pw),
      hasSpecial: /[^A-Za-z0-9]/.test(pw),
    };
  }, [regData.password]);

  const overlayContent = useMemo(() => {
    return mode === "login"
      ? {
          eyebrow: "New here?",
          titleTop: "Start your",
          titleAccent: "Journey",
          text: "Create an account and step into next-gen VR and gaming experiences.",
          btnLabel: "Sign Up",
          action: () => setMode("register"),
        }
      : {
          eyebrow: "Already a player?",
          titleTop: "Good to have",
          titleAccent: "You Back",
          text: "Sign in to your account and continue where you left off.",
          btnLabel: "Sign In",
          action: () => setMode("login"),
        };
  }, [mode]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setError("");
    setIsLoading(true);

    try {
      const result = await authAPI.login(loginData.emailOrUsername, loginData.password);
      if (result?.token) {
        localStorage.setItem("auth_token", result.token);
        window.dispatchEvent(new Event("auth:changed"));
      }

      setLoginOk(true);
      setTimeout(() => setLoginOk(false), 1200);
      router.push("/");
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReg = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setError("");
    setIsLoading(true);

    try {
      await authAPI.register({
        username: regData.username,
        email: regData.email,
        password: regData.password,
      });

      setRegOk(true);
      setTimeout(() => setRegOk(false), 1200);
      setEmailConfirmAddress(regData.email);
      setEmailConfirmOpen(true);
    } catch (err) {
      setError(err?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <EmailConfirmationModal
        isOpen={emailConfirmOpen}
        email={emailConfirmAddress}
        onClose={() => setEmailConfirmOpen(false)}
      />
      <style>{styles}</style>
      <div className="card">
        <div className="br1" />
        <div className="br2" />
        <div className="br3" />
        <div className="br4" />

        <div className="forms-area">
          <div className="form-half login-half">
            <div className="form-title">Sign In</div>
            <div className="form-sub">Welcome back, player</div>
            <form onSubmit={handleLogin}>
              <div className="field">
                <label>Email or Username</label>
                <input
                  type="text"
                  placeholder="player@pixoul.com"
                  value={loginData.emailOrUsername}
                  onChange={(e) =>
                    setLoginData((p) => ({
                      ...p,
                      emailOrUsername: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="field">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="€¢€¢€¢€¢€¢€¢€¢€¢"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData((p) => ({ ...p, password: e.target.value }))
                  }
                />
              </div>
              {error ? (
                <div style={{ color: "#f87171", fontSize: 12, marginTop: 8 }}>
                  {error}
                </div>
              ) : null}
              <button
                type="submit"
                className={`submit-btn${loginOk ? " ok" : ""}`}
                disabled={isLoading}
              >
                <span>{loginOk ? "Welcome Back œ“" : "Enter"}</span>
              </button>
            </form>
            <div
              className="forgot"
              onClick={() => router.push("/forgot-password")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push("/forgot-password");
                }
              }}
            >
              Forgot password?
            </div>
          </div>

          <div className="form-half">
            <div className="form-title">Create Account</div>
            <div className="form-sub">Join the future of play</div>
            <form onSubmit={handleReg}>
              <div className="field">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="GamerTag"
                  value={regData.username}
                  onChange={(e) =>
                    setRegData((p) => ({ ...p, username: e.target.value }))
                  }
                />
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="player@pixoul.com"
                  value={regData.email}
                  onChange={(e) =>
                    setRegData((p) => ({ ...p, email: e.target.value }))
                  }
                />
              </div>
              <div className="field">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="€¢€¢€¢€¢€¢€¢€¢€¢"
                  value={regData.password}
                  onChange={(e) =>
                    setRegData((p) => ({ ...p, password: e.target.value }))
                  }
                />
                <div className="pw-rules" aria-label="Password requirements">
                  <div className={`pw-rule ${passwordChecks.hasUpper ? "ok" : "bad"}`}>
                    <span className="icon">{passwordChecks.hasUpper ? "✓" : "✕"}</span>
                    <span>At least 1 capital letter (A–Z)</span>
                  </div>
                  <div className={`pw-rule ${passwordChecks.hasLower ? "ok" : "bad"}`}>
                    <span className="icon">{passwordChecks.hasLower ? "✓" : "✕"}</span>
                    <span>At least 1 small letter (a–z)</span>
                  </div>
                  <div className={`pw-rule ${passwordChecks.hasNumber ? "ok" : "bad"}`}>
                    <span className="icon">{passwordChecks.hasNumber ? "✓" : "✕"}</span>
                    <span>At least 1 number (0–9)</span>
                  </div>
                  <div className={`pw-rule ${passwordChecks.hasSpecial ? "ok" : "bad"}`}>
                    <span className="icon">{passwordChecks.hasSpecial ? "✓" : "✕"}</span>
                    <span>At least 1 special character (e.g. ! @ # $ %)</span>
                  </div>
                  
                </div>
              </div>
              <button
                type="submit"
                className={`submit-btn${regOk ? " ok" : ""}`}
                disabled={isLoading}
              >
                <span>{regOk ? "Account Created œ“" : "Register"}</span>
              </button>
            </form>
          </div>
        </div>

        <div className={`overlay${mode === "register" ? " slide-left" : ""}`}>
          <div className="ov-logo">
            PIX<span>OUL</span>
          </div>
          <div className="ov-eyebrow">{overlayContent.eyebrow}</div>
          <div className="ov-title">
            {overlayContent.titleTop}
            <br />
            <span className="c">{overlayContent.titleAccent}</span>
          </div>
          <div className="ov-bar" />
          <p className="ov-text">{overlayContent.text}</p>
          <button className="ov-btn" onClick={overlayContent.action} type="button">
            <span>{overlayContent.btnLabel}</span>
          </button>
        </div>
      </div>
    </>
  );
}