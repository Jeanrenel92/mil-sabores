import Title from '../atoms/Title'
import ContactInfoItem from '../molecules/ContactInfoItem'
import '../../styles/organisms/contactInfo.css'

export interface ContactInfoEntry {
  label: string
  value: string
}

interface ContactInfoProps {
  items: ContactInfoEntry[]
  title?: string
  mapTitle?: string
  mapSrc?: string
}

function ContactInfo({
  items,
  title = 'Información de contacto',
  mapTitle = 'Ubicación',
  mapSrc,
}: ContactInfoProps) {
  return (
    <section className="contactInfo">
      <Title level={2}>{title}</Title>

      {items.map((item) => (
        <ContactInfoItem
          key={item.label}
          label={item.label}
          value={item.value}
        />
      ))}

      {mapSrc && (
        <div className="contactInfo__location">
          <Title level={2}>{mapTitle}</Title>
          <div className="contactInfo__map">
            <iframe
              className="contactInfo__iframe"
              src={mapSrc}
              title={mapTitle}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default ContactInfo
