
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import Home from "./pages/client/Home";

function App() {
  return (
    <>
      <Header
        logoText="Mil Sabores"
        logoHref="/"
        activePath="/"
        links={[
          { label: "Inicio", href: "/" },
          { label: "Productos", href: "/productos" },
          { label: "Nosotros", href: "/nosotros" },
          { label: "Contacto", href: "/contacto" },
        ]}
      />

      <Home />

      <Footer />
    </>
  );
}

export default App;
