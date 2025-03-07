import { BrowserRouter as Router, Route, Routes } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthLayout from "./components/AuthLayout";
import Conversation from "./pages/Conversation";
import SidebarLayout from "./components/SidebarLayout";
import Friends from "./pages/Friends";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<SidebarLayout />}>
          <Route
            path="/"
            element={<div className="p-4">Please, select a conversation</div>}
          />
          <Route
            path="/conversations/:conversationId"
            element={<Conversation />}
          />
          <Route path="/friends" element={<Friends />} />
        </Route>
      </Routes>
    </Router>
  );
}
