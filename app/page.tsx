"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { AuthLeftPanel } from "./components/AuthLeftPanel";
import { GoogleIcon } from "./components/GoogleIcon";
import { EyeIcon } from "./components/EyeIcon";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Home() {
  const router = useRouter();

  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  function handleContinue(e: FormEvent) {
    e.preventDefault();

    if (!email.trim()) {
      setError("Ingrese su correo electrónico.");
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      setError("Ingrese un correo electrónico válido.");
      return;
    }

    setError("");
    setStep("password");
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    if (!password) {
      setError("Ingrese su contraseña.");
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email, contrasena: password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.mensaje || "Error al iniciar sesión.");
        return;
      }
      setLoggedIn(true);
      if (data?.redirectTo) {
        router.push(data.redirectTo);
      }
    } catch {
      setError("Error al iniciar sesión.");
    } finally {
      setSubmitting(false);
    }
  }

  const handleReturnButton = async()=>{
    
  }

  return (
    <div className={styles.page}>
      <AuthLeftPanel />

      <section className={styles.rightPanel}>
        <div className={styles.topBar}>
          <button
            className={styles.backLink}
            type="button"
            onClick={() => router.back()}
            aria-label="Regresar"
          >
<<<<<<< HEAD
            <span className={styles.backIcon}>←</span> Volver
=======
            ←
>>>>>>> c2c6060db41b07f9658213d701fd08764b962f3b
          </button>
          <button className={styles.langPill} type="button">
            🌐 Español
          </button>
        </div>

        <div className={styles.formWrap}>
          <h2>¡Le damos la bienvenida!</h2>
          <p className={styles.subtitle}>Inicie sesión en su cuenta</p>

          {loggedIn ? (
            <div className={styles.successBox}>
              Sesión iniciada con <strong>{email}</strong>.
            </div>
          ) : (
            <form
              onSubmit={step === "email" ? handleContinue : handleLogin}
              noValidate
            >
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="email">
                  Correo electrónico <span className={styles.required}>*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className={styles.textInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  autoFocus={step === "email"}
                />

              </div>

              {step === "password" && (
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="password">
                    Contraseña <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.passwordWrap}>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className={styles.textInput}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      autoFocus
                    />
                    <button
                      type="button"
                      className={styles.eyeButton}
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={
                        showPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                    >
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                </div>
              )}

              <div className={styles.inlineLinkRow}>
                <button type="button" className={styles.inlineLink}>
                  Configurar o restablecer la contraseña
                </button>
              </div>

              {error && <p className={styles.errorText}>{error}</p>}

              <button
                type="submit"
                className={styles.primaryButton}
                disabled={submitting}
              >
                {submitting ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>
            </form>
          )}

          <div className={styles.divider}>
            <span>O continúe con</span>
          </div>

          <button type="button" className={styles.googleButton}>
            <GoogleIcon />
            Google
          </button>
        </div>

        <div className={styles.bottomBar}>
          ¿No tiene cuenta?{" "}
          <Link href="/registro" className={styles.signupLink}>
            Inscríbase
          </Link>
        </div>
      </section>
    </div>
  );
}