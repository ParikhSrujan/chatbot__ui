import { useState } from "react";

const InputBox = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  const isTyping = input.trim().length > 0;

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>

        {/* Input */}
        <input
          type="text"
          placeholder="Message Viox AI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
          style={styles.input}
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!isTyping}
          style={{
            ...styles.sendBtn,
            background: isTyping
              ? "linear-gradient(135deg, #6c63ff, #8b5cf6)"
              : "#1a1a30",
            cursor: isTyping ? "pointer" : "not-allowed",
            opacity: isTyping ? 1 : 0.5,
            boxShadow: isTyping ? "0 4px 15px rgba(108,99,255,0.5)" : "none",
          }}
        >
          ➤
        </button>

      </div>
      <p style={styles.hint}>Press Enter to send · Viox AI may make mistakes</p>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: "12px 16px 10px",
    background: "#0d0d1f",
    borderTop: "1px solid #1a1a30",
  },
  container: {
    display: "flex",
    alignItems: "center",
    background: "#11112a",
    border: "1px solid #2a2a45",
    borderRadius: "12px",
    padding: "6px 8px",
    gap: "8px",
  },
  input: {
    flex: 1,
    padding: "8px 10px",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "white",
    fontSize: "14px",
    fontFamily: "'Syne', sans-serif",
  },
  sendBtn: {
    border: "none",
    color: "white",
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.2s ease",
  },
  hint: {
    textAlign: "center",
    fontSize: "11px",
    color: "#333355",
    margin: "6px 0 0",
  },
};

export default InputBox;
