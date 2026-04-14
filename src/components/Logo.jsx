const Logo = () => {
  return (
    <div style={styles.container}>
      
      <svg
        width="32"
        height="32"
        viewBox="0 0 100 100"
        style={styles.svg}
      >
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6c63ff" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>

        {/* Outer circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="url(#grad)"
          strokeWidth="4"
          fill="none"
        />

        {/* Inner AI nodes */}
        <circle cx="50" cy="30" r="4" fill="#8b5cf6" />
        <circle cx="30" cy="60" r="4" fill="#6c63ff" />
        <circle cx="70" cy="60" r="4" fill="#6c63ff" />

        {/* Connecting lines */}
        <line x1="50" y1="30" x2="30" y2="60" stroke="#8b5cf6" strokeWidth="2" />
        <line x1="50" y1="30" x2="70" y2="60" stroke="#6c63ff" strokeWidth="2" />
        <line x1="30" y1="60" x2="70" y2="60" stroke="#6c63ff" strokeWidth="2" />
      </svg>

      <span style={styles.text}>Viox AI</span>

    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  svg: {
    filter: "drop-shadow(0 0 6px rgba(139,92,246,0.6))",
  },

  text: {
    fontWeight: "600",
    fontSize: "16px",
    background: "linear-gradient(90deg, #6c63ff, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
};

export default Logo;