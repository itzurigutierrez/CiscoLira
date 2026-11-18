"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { AuthLeftPanel } from "../components/AuthLeftPanel";
import { GoogleIcon } from "../components/GoogleIcon";
import {
  COUNTRIES,
  GENDERS,
  MONTHS,
  STATES_BY_COUNTRY,
  getYearRange,
} from "./formData";

export default function Registro() {
  const router = useRouter();

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);

  const years = useMemo(() => getYearRange(2026), []);
  const states = country ? STATES_BY_COUNTRY[country] ?? [] : [];

  function handleCountryChange(value: string) {
    setCountry(value);
    setState("");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!country || !state || !year || !month) {
      setError("Complete los campos obligatorios para continuar.");
      return;
    }

    setError("");
    setSubmitting(true);
    // Solo visual: aquí no hay registro real, es una simulación para
    // portafolio.
    setTimeout(() => {
      setSubmitting(false);
      setRegistered(true);
    }, 900);
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
          >
            ← Volver
          </button>
          <button className={styles.langPill} type="button">
            🌐 Español
          </button>
        </div>

        <div className={styles.formWrap}>
          <h2>Inscríbase</h2>
          <p className={styles.subtitle}>
            Podrá comenzar las clases tan pronto como se registre.
          </p>

          {registered ? (
            <div className={styles.successBox}>
              Cuenta creada correctamente. (Esto es solo una simulación
              visual para portafolio.)
            </div>
          ) : (
            <>
              <p className={styles.sectionLabel}>Regístrese con</p>
              <button type="button" className={styles.googleButton}>
                <GoogleIcon />
                Google
              </button>

              <div className={styles.divider}>
                <span>O</span>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <p className={styles.sectionLabel}>Crear nueva cuenta</p>

                <div className={styles.row}>
                  <div>
                    <label className={styles.fieldLabel} htmlFor="country">
                      Su país o región de residencia{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <select
                      id="country"
                      className={`${styles.selectInput} ${
                        !country ? styles.placeholder : ""
                      }`}
                      value={country}
                      onChange={(e) => handleCountryChange(e.target.value)}
                    >
                      <option value="">Seleccionar país</option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={styles.fieldLabel} htmlFor="state">
                      Estado o provincia{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <select
                      id="state"
                      className={`${styles.selectInput} ${
                        !state ? styles.placeholder : ""
                      }`}
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      disabled={!country}
                    >
                      <option value="">
                        {country
                          ? "Seleccione el estado"
                          : "Elija un país primero"}
                      </option>
                      {states.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                      {country && states.length === 0 && (
                        <option value="No especificado">
                          No especificado
                        </option>
                      )}
                    </select>
                  </div>
                </div>

                <div className={styles.row}>
                  <div>
                    <label className={styles.fieldLabel} htmlFor="year">
                      Año de nacimiento{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <select
                      id="year"
                      className={`${styles.selectInput} ${
                        !year ? styles.placeholder : ""
                      }`}
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <option value="">Seleccionar año</option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={styles.fieldLabel} htmlFor="month">
                      Mes de nacimiento{" "}
                      <span className={styles.required}>*</span>
                    </label>
                    <select
                      id="month"
                      className={`${styles.selectInput} ${
                        !month ? styles.placeholder : ""
                      }`}
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                    >
                      <option value="">Seleccionar mes</option>
                      {MONTHS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="gender">
                    Género <span className={styles.optional}>(Opcional)</span>
                  </label>
                  <select
                    id="gender"
                    className={`${styles.selectInput} ${
                      !gender ? styles.placeholder : ""
                    }`}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Seleccionar género</option>
                    {GENDERS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.privacyBox}>
                  <span>🔒</span>
                  <span>
                    <strong>Aviso de privacidad:</strong> estos datos son
                    estrictamente confidenciales, se agregan con fines de
                    elaboración de informes y nunca se mostrarán públicamente
                    en su perfil.
                  </span>
                </div>

                {error && <p className={styles.errorText}>{error}</p>}

                <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={submitting}
                >
                  {submitting ? "Creando cuenta..." : "Continuar"}
                </button>
              </form>
            </>
          )}
        </div>

        <div className={styles.bottomBar}>
          ¿Ya tiene cuenta?{" "}
          <Link href="/" className={styles.loginLink}>
            Inicie sesión
          </Link>
        </div>
      </section>
    </div>
  );
}
