import SectionHeader from '../../components/molecules/SectionHeader'
import '../../styles/client/comingSoon.css'

interface ComingSoonProps {
  title: string
}

function ComingSoon({ title }: ComingSoonProps) {
  return (
    <section className="comingSoon">
      <div className="contenedor">
        <SectionHeader
          title={title}
          description="Esta página está en construcción."
        />
      </div>
    </section>
  )
}

export default ComingSoon
