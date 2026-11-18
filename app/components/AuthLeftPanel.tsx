import styles from "./AuthLeftPanel.module.css";

export function AuthLeftPanel() {
  return (
    <section className={styles.leftPanel}>
      <div className={styles.shapes} aria-hidden="true">
        <svg
          className={styles.wave}
          viewBox="0 0 200 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40 0 C 120 60, 0 120, 70 180 C 140 240, 20 280, 90 340 C 150 390, 30 430, 60 480 C 85 520, 40 550, 50 600"
            stroke="url(#waveGradient)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="600">
              <stop offset="0%" stopColor="#3b6fe0" />
              <stop offset="55%" stopColor="#2fd0e8" />
              <stop offset="100%" stopColor="#ec1e79" />
            </linearGradient>
          </defs>
        </svg>
        <div className={styles.pinkBlob} />
        <div className={styles.blueDot} />
        <div className={styles.cyanSquare} />
        <div className={styles.orangeBurst} />
      </div>

      <div className={styles.leftContent}>
        <h1>Desarrolle sus habilidades con Cisco</h1>
        <p>
          Siga trayectorias profesionales reales a través de cursos
          impartidos por expertos y cursos en línea gratuitos respaldados por
          la experiencia de Cisco.
        </p>
      </div>
    </section>
  );
}
