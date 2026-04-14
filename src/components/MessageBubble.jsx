const MessageBubble = ({ text, sender }) => {
  const isUser = sender === "user";

  // Render text with line breaks
  const renderText = (text) => {
    return text.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        padding: "5px 0",
        animation: "fadeIn 0.3s ease",
        alignItems: "flex-end",
        gap: "8px",
      }}
    >
      {/* Bot avatar */}
      {!isUser && (
        <div style={styles.botAvatar}>V</div>
      )}

      <div
        style={{
          background: isUser
            ? "linear-gradient(135deg, #6c63ff, #8b5cf6)"
            : "#151530",
          color: "white",
          padding: "12px 16px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          maxWidth: "70%",
          fontSize: "14px",
          lineHeight: "1.6",
          boxShadow: isUser
            ? "0 4px 15px rgba(108,99,255,0.35)"
            : "0 2px 10px rgba(0,0,0,0.3)",
          border: isUser ? "none" : "1px solid #2a2a45",
          wordBreak: "break-word",
        }}
      >
        {renderText(text)}
      </div>

      {/* User avatar */}
      {isUser && (
        <div style={styles.userAvatar}>U</div>
      )}
    </div>
  );
};

const styles = {
  botAvatar: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6c63ff, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "700",
    color: "white",
    flexShrink: 0,
    boxShadow: "0 2px 8px rgba(108,99,255,0.4)",
  },
  userAvatar: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "#2a2a45",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "700",
    color: "#8888aa",
    flexShrink: 0,
  },
};

export default MessageBubble;
