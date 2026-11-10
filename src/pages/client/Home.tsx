import Title from "../../components/atoms/Title";

function Home() {
  return (
    <div>
      <section>
        <Title level={1} align="center">
          Este es el titulo principal en h1
        </Title>

        <Title level={2}>este es un h2</Title>

        <Title level={3} align="left">
          Este es la seccion donde aparecen nuestros productos destacados
        </Title>
      </section>
    </div>
  );
}

export default Home;
