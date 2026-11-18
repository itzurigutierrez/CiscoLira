import styles from "./AuthLeftPanel.module.css";

function wobblyCircle(
  cx: number, cy: number, r: number, amp: number, waves: number, steps = 360
) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const rad = r + amp * Math.sin(waves * t);
    const x = (cx + rad * Math.cos(t)).toFixed(1);
    const y = (cy + rad * Math.sin(t)).toFixed(1);
    d += `${i === 0 ? "M" : "L"}${x} ${y} `;
  }
  return d + "Z";
}

const WAVE_PATH = wobblyCircle(50, 300, 205, 20, 10);

export function AuthLeftPanel() {
  return (
    <section className={styles.leftPanel}>
      <div className={styles.shapes} aria-hidden="true">
        <svg
          className={styles.wave}
          viewBox="0 0 320 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={WAVE_PATH}
            stroke="url(#waveGradient)"
            strokeWidth="7"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="waveGradient"
              gradientUnits="userSpaceOnUse"
              x1="0" y1="80" x2="0" y2="520"
            >
              <stop offset="0%" stopColor="#1a5cff" />
              <stop offset="45%" stopColor="#00bceb" />
              <stop offset="75%" stopColor="#ff2d86" />
              <stop offset="100%" stopColor="#ff8a00" />
            </linearGradient>
          </defs>
        </svg>
        <div className={styles.pinkBlob} />
        <div className={styles.blueDot} />
        <div className={styles.cyanSquare} />
        <div className={styles.orangeBurst} />
      </div>

      <div className={styles.leftContent}>
        <p className={styles.brand}>
          Cisco
          <br />
          <strong>
            Networking
            <br />
            Academy
          </strong>
        </p>
        <h1>Desarrolle sus habilidades con Cisco</h1>
        <p className={styles.description}>
          Siga trayectorias profesionales reales a través de cursos impartidos
          por expertos y cursos en línea gratuitos respaldados por la
          experiencia de Cisco.
        </p>
      </div>
    </section>
  );
}