"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import { AuthLeftPanel } from "../components/AuthLeftPanel";
import { GoogleIcon } from "../components/GoogleIcon";

const ESTADOS: Record<string, string[]> = {
  México: ["Chihuahua", "Ciudad de México", "Jalisco", "Nuevo León", "Sonora", "Otro"],
  "Estados Unidos": ["California", "Texas", "Nuevo México", "Arizona", "Otro"],
  Colombia: ["Antioquia", "Bogotá D.C.", "Valle del Cauca", "Otro"],
  España: ["Madrid", "Cataluña", "Andalucía", "Otro"],
};

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const GENEROS = ["Femenino", "Masculino", "No binario", "Prefiero no decirlo"];

const ANIO_ACTUAL = new Date().getFullYear();
const ANIOS = Array.from({ length: ANIO_ACTUAL - 1919 }, (_, i) => ANIO_ACTUAL - i);

export default function Registro() {
  const router = useRouter();

  const [pais, setPais] = useState("");
  const [estado, setEstado] = useState("");
  const [anio, setAnio] = useState("");
  const [mes, setMes] = useState("");
  const [genero, setGenero] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function handlePais(value: string) {
    setPais(value);
    setEstado("");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!pais || !estado || !anio || !mes) {
      setError("Complete todos los campos obligatorios.");
      return;
    }

    setError("");
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 900);
  }

  return (
    <div className={styles.page}>
      <AuthLeftPanel />

      <section className={`${styles.rightPanel} ${styles.signup}`}>
        <div className={styles.topBar}>
          <button
            type="button"
            className={styles.backLink}
            onClick={() => router.back()}
          >
            <span className={styles.backIcon}>←</span> Volver
          </button>
          <button type="button" className={styles.langPill}>
            🌐 Español
          </button>
        </div>

        <div className={styles.formWrap}>
          <h2>Inscríbase</h2>
          <p className={styles.subtitle}>
            Podrá comenzar las clases tan pronto como se registre.
          </p>

          {done ? (
            <div className={styles.successBox}>
              Registro completado. ¡Bienvenido a Cisco Networking Academy!
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <p className={styles.sectionLabel}>Regístrese con</p>
              <button type="button" className={styles.googleButton}>
                <GoogleIcon />
                Google
              </button>

              <hr className={styles.rule} />

              <p className={styles.sectionLabel}>Crear nueva cuenta</p>

              <div className={styles.row2}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="pais">
                    Su país o región de residencia *
                  </label>
                  <select
                    id="pais"
                    className={styles.select}
                    value={pais}
                    onChange={(e) => handlePais(e.target.value)}
                  >
                    <option value="">Seleccionar país</option>
                    {Object.keys(ESTADOS).map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="estado">
                    Estado o provincia *
                  </label>
                  <select
                    id="estado"
                    className={styles.select}
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    disabled={!pais}
                  >
                    <option value="">
                      {pais ? "Seleccione el estado" : "Elija un país primero"}
                    </option>
                    {(ESTADOS[pais] ?? []).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="anio">
                    Año de nacimiento *
                  </label>
                  <select
                    id="anio"
                    className={styles.select}
                    value={anio}
                    onChange={(e) => setAnio(e.target.value)}
                  >
                    <option value="">Seleccionar año</option>
                    {ANIOS.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="mes">
                    Mes de nacimiento *
                  </label>
                  <select
                    id="mes"
                    className={styles.select}
                    value={mes}
                    onChange={(e) => setMes(e.target.value)}
                  >
                    <option value="">Seleccionar mes</option>
                    {MESES.map((m, i) => (
                      <option key={m} value={i + 1}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="genero">
                  Género <span className={styles.optional}>(Opcional)</span>
                </label>
                <select
                  id="genero"
                  className={styles.select}
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                >
                  <option value="">Seleccionar género</option>
                  {GENEROS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className={styles.privacy}>
                <span className={styles.privacyIcon}>ⓘ</span>
                <p>
                  <strong>Aviso de privacidad:</strong> estos datos son
                  estrictamente confidenciales, se agregan con fines de
                  elaboración de informes y nunca se mostrarán públicamente en
                  su perfil.
                </p>
              </div>

              {error && <p className={styles.errorText}>{error}</p>}

              <button
                type="submit"
                className={styles.primaryButton}
                disabled={submitting}
              >
                {submitting ? "Registrando..." : "Continuar"}
              </button>
            </form>
          )}
        </div>

        <div className={styles.bottomBar}>
          ¿Ya tiene una cuenta?{" "}
          <Link href="/" className={styles.signupLink}>
            Iniciar sesión
          </Link>
        </div>
      </section>
    </div>
  );
}