import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Privacy } from "./pages/Privacy";
import { Brand } from "./pages/Brand";
import { SocialPosts } from "./pages/SocialPosts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/brand" element={<Brand />} />
      <Route path="/social" element={<SocialPosts />} />
    </Routes>
  );
}

export default App;
