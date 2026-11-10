import { images } from '../../assets/image'
import Image from '../../components/atoms/Image'
import SectionHeader from '../../components/molecules/SectionHeader'
import '../../styles/client/aboutPage.css'

const values = [
  {
    title: 'Calidad',
    description:
      'Seleccionamos nuestros ingredientes y cuidamos cada preparación para ofrecer productos ricos y hechos con dedicación.',
  },
  {
    title: 'Creatividad',
    description:
      'Exploramos sabores, colores y decoraciones para que cada creación tenga una identidad propia.',
  },
  {
    title: 'Cercanía',
    description:
      'Nos inspira acompañar las celebraciones y los momentos cotidianos de quienes nos eligen.',
  },
]

function AboutPage() {
  return (
    <div className="aboutPage">
      <section className="aboutPage__hero">
        <div className="contenedor">
          <SectionHeader
            tag="SOBRE NOSOTROS"
            title="Una historia hecha con dulzura"
            description="En Mil Sabores creemos que la pastelería reúne a las personas y convierte cualquier momento en una ocasión especial."
          />
        </div>
      </section>

      <section className="aboutPage__story">
        <div className="contenedor">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-6">
              <Image
                className="aboutPage__image"
                src={images.productos.historia_blog}
                alt="Preparaciones de la pastelería Mil Sabores"
                rounded
              />
            </div>
            <div className="col-12 col-lg-6">
              <SectionHeader
                level={2}
                tag="NUESTRA HISTORIA"
                title="De una idea a una mesa llena de sabores"
              />
              <div className="aboutPage__copy">
                <p>
                  Mil Sabores nació de una pasión sencilla: preparar cosas
                  ricas para compartir. Lo que comenzó como una pequeña idea
                  fue creciendo con cada receta, cada pedido y cada persona que
                  nos abrió un espacio en su celebración.
                </p>
                <p>
                  Hoy seguimos trabajando con el mismo cariño, combinando
                  recetas, ingredientes y creatividad para que cada producto
                  tenga algo especial. Nuestra historia se construye día a día
                  junto a quienes disfrutan nuestros sabores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="aboutPage__purpose">
        <div className="contenedor">
          <SectionHeader
            level={2}
            tag="LO QUE NOS MUEVE"
            title="Pastelería para compartir"
            description="Queremos acompañar momentos especiales con productos preparados con dedicación, buen sabor y atención a los detalles."
          />

          <div className="row row-cols-1 row-cols-md-3 g-4 aboutPage__values">
            {values.map((value) => (
              <div className="col" key={value.title}>
                <article className="aboutPage__value">
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="aboutPage__team">
        <div className="contenedor">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-6 aboutPage__teamCopy">
              <SectionHeader
                level={2}
                tag="NUESTRO EQUIPO"
                title="Personas detrás de cada creación"
              />
              <p>
                Cada integrante aporta su experiencia, creatividad y cuidado en
                las distintas etapas de nuestro trabajo. Nos gusta colaborar,
                aprender y poner atención en los pequeños detalles que hacen
                especial cada preparación.
              </p>
            </div>
            <div className="col-12 col-lg-6">
              <Image
                className="aboutPage__image aboutPage__teamImage"
                src={images.productos.equipo}
                alt="Equipo de Mil Sabores trabajando en sus preparaciones"
                rounded
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
