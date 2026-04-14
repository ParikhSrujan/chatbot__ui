import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";
import Logo from "./Logo";

// Smart bot replies - no API needed!
const getBotReply = (msg) => {
  const text = msg.toLowerCase();

  if (text.includes("hi") || text.includes("hello") || text.includes("hey"))
    return "Hey there! 👋 I'm Viox AI. Ask me anything — I'm here to help!";

  if (text.includes("how are you") || text.includes("how r u"))
    return "I'm doing great, thanks for asking! 😊 Ready to help you with anything!";

  if (
    text.includes("trip") ||
    text.includes("travel") ||
    text.includes("goa") ||
    text.includes("vacation")
  )
    return "Great choice! 🌴 For a Goa trip, I'd suggest visiting in November–February for the best weather. Must-visit: Baga Beach, Dudhsagar Falls, and Old Goa churches. Budget ₹5,000–₹10,000 per day for a comfortable stay!";

  if (
    text.includes("food") ||
    text.includes("eat") ||
    text.includes("recipe") ||
    text.includes("cook")
  )
    return "Yum! 🍕 Here are some quick meal ideas:\n• Pasta Aglio e Olio — ready in 20 mins\n• Paneer Butter Masala — classic comfort food\n• Avocado Toast — healthy and fast\nWant a full recipe for any of these?";

  if (
    text.includes("ai") ||
    text.includes("artificial intelligence") ||
    text.includes("machine learning")
  )
    return "AI stands for Artificial Intelligence 🤖 — it's technology that lets computers learn and make decisions like humans. Machine Learning is a subset where computers learn from data. I'm a simple example of an AI chatbot!";

  if (
    text.includes("name") ||
    text.includes("who are you") ||
    text.includes("what are you")
  )
    return "I'm Viox AI 🌟 — a smart chatbot built with React! I can answer questions, help plan trips, suggest food ideas, explain concepts, and much more. What can I help you with?";

  if (text.includes("help") || text.includes("what can you do"))
    return "Here's what I can help with 💡\n• ✈️ Plan trips & travel\n• 🍕 Food & recipe ideas\n• 🤖 Explain tech concepts\n• 💬 General chat & questions\n• 📚 Study & learning tips\nJust ask away!";

  if (text.includes("weather"))
    return "I can't check live weather right now 🌤️ but I'd recommend Weather.com or just Google 'weather in [your city]' for the most accurate forecast!";

  if (text.includes("joke") || text.includes("funny"))
    return "Haha, sure! 😄 Why do programmers prefer dark mode?\n\n...Because light attracts bugs! 🐛";

  if (text.includes("study") || text.includes("learn") || text.includes("tips"))
    return "Great mindset! 📚 Here are top study tips:\n• Use the Pomodoro technique (25 min study, 5 min break)\n• Teach what you learn to someone else\n• Practice over reading — do more problems!\n• Sleep well — memory consolidates during sleep 💤";

  if (
    text.includes("bye") ||
    text.includes("goodbye") ||
    text.includes("see you")
  )
    return "Goodbye! 👋 It was great chatting with you. Come back anytime — I'll be here!";

  if (text.includes("thank") || text.includes("thanks"))
    return "You're very welcome! 😊 Happy to help anytime!";

  if (
    text.includes("react") ||
    text.includes("javascript") ||
    text.includes("coding") ||
    text.includes("programming")
  )
    return "Love the coding interest! 💻 React is a JavaScript library for building UIs. Key concepts to learn:\n• Components & Props\n• useState & useEffect hooks\n• JSX syntax\n• Component lifecycle\nYou're already using React right now to build this app!";

  const fallbacks = [
    "That's interesting! 🤔 Could you tell me more so I can give you a better answer?",
    "Great question! I'm still learning, but I'd love to help. Can you be more specific? 😊",
    "Hmm, let me think about that... 💭 Try asking in a different way and I'll do my best!",
    "I'm not sure about that one yet! 🙈 But keep asking — I know a lot of topics!",
    "Interesting! Try asking me about travel, food, AI, coding, or study tips — I'm great at those! 🌟",
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};

const ChatContainer = () => {
  const [chats, setChats] = useState([
    { id: 1, title: "New Chat", messages: [] },
  ]);
  const [activeChatId, setActiveChatId] = useState(1);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const activeChat = chats.find((c) => c.id === activeChatId);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages, isTyping]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id !== activeChatId) return chat;
        const isFirst = chat.messages.length === 0;
        return {
          ...chat,
          title: isFirst
            ? text.slice(0, 22) + (text.length > 22 ? "..." : "")
            : chat.title,
          messages: [
            ...chat.messages,
            { id: Date.now(), text, sender: "user" },
          ],
        };
      }),
    );

    setIsTyping(true);

    setTimeout(
      () => {
        setIsTyping(false);
        setChats((prev) =>
          prev.map((chat) => {
            if (chat.id !== activeChatId) return chat;
            return {
              ...chat,
              messages: [
                ...chat.messages,
                { id: Date.now(), text: getBotReply(text), sender: "bot" },
              ],
            };
          }),
        );
      },
      1000 + Math.random() * 500,
    );
  };

  const newChat = () => {
    const newId = Date.now();
    setChats((prev) => [
      ...prev,
      { id: newId, title: "New Chat", messages: [] },
    ]);
    setActiveChatId(newId);
    if (isMobile) setShowSidebar(false);
  };

  const deleteChat = (id) => {
    const filtered = chats.filter((c) => c.id !== id);
    setConfirmDeleteId(null);
    if (filtered.length === 0) {
      const freshId = Date.now();
      setChats([{ id: freshId, title: "New Chat", messages: [] }]);
      setActiveChatId(freshId);
    } else {
      setChats(filtered);
      if (id === activeChatId) setActiveChatId(filtered[0].id);
    }
  };

  const SidebarContent = ({ mobile }) => (
    <>
      <div style={styles.logoWrap}>
        <Logo />
      </div>

      <button style={styles.newChatBtn} onClick={newChat}>
        <span>＋</span> New Chat
      </button>

      <p style={styles.historyLabel}>CHAT HISTORY</p>

      <div style={styles.chatList}>
        {chats.map((chat) => (
          <div key={chat.id} style={styles.chatRow}>
            <div
              onClick={() => {
                setActiveChatId(chat.id);
                if (mobile) setShowSidebar(false);
              }}
              style={{
                ...styles.chatItem,
                background:
                  chat.id === activeChatId ? "#6c63ff18" : "transparent",
                borderLeft:
                  chat.id === activeChatId
                    ? "3px solid #6c63ff"
                    : "3px solid transparent",
                color: chat.id === activeChatId ? "#a89fff" : "#666688",
              }}
            >
              {chat.title}
            </div>

            {confirmDeleteId === chat.id ? (
              <div style={{ display: "flex", gap: "4px" }}>
                <button
                  style={{
                    ...styles.deleteBtn,
                    color: "#ff6b6b",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                  onClick={() => deleteChat(chat.id)}
                >
                  Yes
                </button>
                <button
                  style={{ ...styles.deleteBtn, fontSize: "11px" }}
                  onClick={() => setConfirmDeleteId(null)}
                >
                  No
                </button>
              </div>
            ) : (
              <button
                style={styles.deleteBtn}
                onClick={() => setConfirmDeleteId(chat.id)}
              >
                🗑️
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div style={styles.container}>
      {/* Desktop Sidebar */}
      {!isMobile && showSidebar && (
        <div style={styles.sidebar}>
          <SidebarContent mobile={false} />
        </div>
      )}

      {/* Mobile Sidebar */}
      {isMobile && showSidebar && (
        <>
          <div style={styles.overlay} onClick={() => setShowSidebar(false)} />
          <div style={styles.mobileSidebar}>
            <SidebarContent mobile={true} />
          </div>
        </>
      )}

      {/* Main */}
      <div style={styles.main}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button
              style={styles.menuBtn}
              onClick={() => setShowSidebar(!showSidebar)}
            >
              ☰
            </button>
            <Logo />
          </div>
          {!isMobile && (
            <div style={styles.headerRight}>
              <button style={styles.authBtn}>Login</button>
              <button style={styles.signupBtn}>Sign Up</button>
            </div>
          )}
        </div>

        {/* Messages */}
        <div style={styles.messages}>
          {activeChat?.messages.length === 0 && !isTyping ? (
            <div style={styles.emptyContainer}>
              <div style={{ transform: "scale(1.8)", marginBottom: "14px" }}>
                <Logo />
              </div>
              <h2 style={styles.emptyTitle}>How can I help you today?</h2>
              <p style={styles.emptySubtitle}>
                Ask me anything — I'm ready to chat!
              </p>

              <div style={styles.suggestions}>
                {[
                  {
                    icon: "✈️",
                    label: "Plan a Goa trip",
                    msg: "Plan a Goa trip",
                  },
                  {
                    icon: "🍕",
                    label: "Food ideas",
                    msg: "Suggest food ideas",
                  },
                  { icon: "🤖", label: "Explain AI", msg: "Explain AI" },
                  { icon: "😄", label: "Tell a joke", msg: "Tell me a joke" },
                  {
                    icon: "📚",
                    label: "Study tips",
                    msg: "Give me study tips",
                  },
                  {
                    icon: "💻",
                    label: "Learn React",
                    msg: "How do I learn React?",
                  },
                ].map((s) => (
                  <button
                    key={s.label}
                    style={styles.suggestionBtn}
                    onClick={() => sendMessage(s.msg)}
                  >
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {activeChat?.messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  text={msg.text}
                  sender={msg.sender}
                />
              ))}

              {isTyping && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    padding: "6px 0",
                  }}
                >
                  <div style={styles.typingBubble}>
                    <span className="typing">
                      <span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <InputBox onSend={sendMessage} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    background: "#0a0a14",
    overflow: "hidden",
  },
  sidebar: {
    width: "260px",
    minWidth: "260px",
    background: "#0d0d1f",
    borderRight: "1px solid #1a1a30",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  mobileSidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "75%",
    maxWidth: "280px",
    height: "100%",
    background: "#0d0d1f",
    borderRight: "1px solid #1a1a30",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    animation: "slideIn 0.25s ease",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    zIndex: 999,
  },
  logoWrap: {
    padding: "18px 16px 14px",
    borderBottom: "1px solid #1a1a30",
  },
  newChatBtn: {
    margin: "14px 12px 6px",
    padding: "11px 16px",
    background: "linear-gradient(135deg, #6c63ff, #8b5cf6)",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 4px 18px rgba(108,99,255,0.4)",
  },
  historyLabel: {
    padding: "14px 16px 6px",
    fontSize: "10px",
    letterSpacing: "2px",
    color: "#333355",
    fontWeight: "700",
    margin: 0,
  },
  chatList: {
    flex: 1,
    overflowY: "auto",
    padding: "4px 8px",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  chatRow: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  chatItem: {
    flex: 1,
    padding: "9px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    transition: "all 0.2s ease",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  deleteBtn: {
    background: "transparent",
    border: "none",
    color: "#444466",
    cursor: "pointer",
    padding: "4px",
    flexShrink: 0,
  },
  sidebarFooter: {
    padding: "12px 16px",
    borderTop: "1px solid #1a1a30",
    fontSize: "11px",
    color: "#333355",
    textAlign: "center",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    padding: "12px 18px",
    background: "#0d0d1f",
    borderBottom: "1px solid #1a1a30",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexShrink: 0,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  headerRight: {
    display: "flex",
    gap: "10px",
  },
  menuBtn: {
    background: "transparent",
    border: "none",
    color: "#666688",
    fontSize: "20px",
    cursor: "pointer",
  },
  authBtn: {
    border: "1px solid #6c63ff44",
    color: "#8b85ff",
    padding: "7px 16px",
    borderRadius: "8px",
    background: "transparent",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
  },
  signupBtn: {
    background: "linear-gradient(135deg, #6c63ff, #8b5cf6)",
    color: "white",
    padding: "7px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    boxShadow: "0 3px 12px rgba(108,99,255,0.4)",
  },
  messages: {
    flex: 1,
    padding: "24px 20px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  emptyContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "14px",
  },
  emptyTitle: {
    color: "white",
    fontSize: "22px",
    fontWeight: "700",
    margin: 0,
  },
  emptySubtitle: {
    color: "#444466",
    fontSize: "14px",
    margin: 0,
  },
  suggestions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: "540px",
    marginTop: "8px",
  },
  suggestionBtn: {
    padding: "10px 16px",
    background: "#11112a",
    border: "1px solid #1e1e38",
    borderRadius: "10px",
    color: "#8888aa",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  typingBubble: {
    background: "#151530",
    padding: "12px 18px",
    borderRadius: "16px",
    border: "1px solid #2a2a45",
  },
};

export default ChatContainer;
