import Title from "../../components/atoms/Title";

function Home() {
  return (
    <main>
      <section>
        <Title level={1} align="center">
          Mil Sabores
        </Title>

        <Title level={2}>Nuestra historia</Title>

        <Title level={3} align="left">
          Productos destacados
        </Title>
      </section>
    </main>
  );
}

export default Home;
