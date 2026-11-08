import Logo from '../atoms/Logo'
import '../../styles/components/organisms/footer.css'

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  lines?: string[]
  links?: FooterLink[]
}

interface FooterProps {
  logoSrc: string
  logoText: string
  copyright: string
  contactLines?: string[]
  columns?: FooterColumn[]
  logoHref?: string
}

function Footer({
  logoSrc,
  logoText,
  copyright,
  contactLines = [],
  columns = [],
  logoHref = '/',
}: FooterProps) {
  return (
    <footer className="footer">
      <div className="contenedor footer__content">
        <div className="footer__column footer__brand">
          <Logo src={logoSrc} text={logoText} href={logoHref} />
          {contactLines.map((line) => (
            <p key={line} className="footer__text">
              {line}
            </p>
          ))}
        </div>

        {columns.map((column) => (
          <div key={column.title} className="footer__column">
            <h3 className="footer__title">{column.title}</h3>

            {column.lines?.map((line) => (
              <p key={line} className="footer__text">
                {line}
              </p>
            ))}

            {column.links && (
              <ul className="footer__links">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer__link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">{copyright}</p>
      </div>
    </footer>
  )
}

export default Footer
