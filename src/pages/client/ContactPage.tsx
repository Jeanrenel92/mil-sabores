import SectionHeader from '../../components/molecules/SectionHeader'
import ContactForm from '../../components/organisms/ContactForm'
import ContactInfo from '../../components/organisms/ContactInfo'
import type { ContactInfoEntry } from '../../components/organisms/ContactInfo'
import '../../styles/client/contactPage.css'

const contactItems: ContactInfoEntry[] = [
  {
    label: 'Dirección',
    value: 'Maipú 1020, San Bernardo, Región Metropolitana, Chile',
  },
  { label: 'Teléfono', value: '+56 9 1234 5678' },
  { label: 'Correo electrónico', value: 'contacto@1000sabores.cl' },
  { label: 'Horario de atención', value: 'Lunes a sábado: 09:00 - 19:00 hrs.' },
]

const mapSrc =
  'https://www.google.com/maps?q=Maip%C3%BA%201020%2C%20San%20Bernardo%2C%20Chile&output=embed'

function ContactPage() {
  return (
    <div className="contactPage">
      <div className="contenedor">
        <SectionHeader
          tag="CONTÁCTANOS"
          title="Estamos aquí para ayudarte"
          description="Escríbenos para consultas, pedidos especiales o cualquier duda sobre nuestros productos."
        />

        <div className="contactPage__grid">
          <ContactInfo items={contactItems} mapSrc={mapSrc} />
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default ContactPage
