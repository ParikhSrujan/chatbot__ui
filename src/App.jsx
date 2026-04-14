import ChatContainer from "./components/ChatContainer";

function App() {
  console.log(import.meta.env.VITE_GEMINI_KEY);
  return (
    <div>
      <ChatContainer />
    </div>
  );
}

export default App;
