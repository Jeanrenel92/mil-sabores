import { Link } from 'react-router-dom'
import SectionHeader from '../../components/molecules/SectionHeader'
import { ADMIN_BASE_PATH } from '../../data/adminConfig'
import { productCategories } from '../../data/products'
import { getProducts } from '../../services/productService'
import '../../styles/admin/adminDashboardPage.css'

const currencyFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

function AdminDashboardPage() {
  const products = getProducts()
  const categoryCounts = productCategories.map((category) => ({
    name: category,
    count: products.filter((product) => product.categoria === category).length,
  }))
  const averagePrice = products.length
    ? Math.round(
        products.reduce((total, product) => total + product.precio, 0) /
          products.length,
      )
    : 0
  const maxCategoryCount = Math.max(1, products.length)

  return (
    <div className="adminOverview">
      <SectionHeader
        tag="PANEL DE CONTROL"
        title="Resumen"
        description="Una vista general del catálogo y accesos rápidos para administrar tu tienda."
        className="adminOverview__header"
      />

      <section className="adminOverview__metrics" aria-label="Indicadores del catálogo">
        <article className="adminOverview__metric">
          <span className="adminOverview__metricLabel">Productos publicados</span>
          <strong className="adminOverview__metricValue">{products.length}</strong>
          <span className="adminOverview__metricNote">En el catálogo</span>
        </article>
        <article className="adminOverview__metric">
          <span className="adminOverview__metricLabel">Categorías activas</span>
          <strong className="adminOverview__metricValue">
            {categoryCounts.filter((category) => category.count > 0).length}
          </strong>
          <span className="adminOverview__metricNote">
            De {productCategories.length} categorías disponibles
          </span>
        </article>
        <article className="adminOverview__metric">
          <span className="adminOverview__metricLabel">Precio promedio</span>
          <strong className="adminOverview__metricValue adminOverview__metricValue--price">
            {currencyFormatter.format(averagePrice)}
          </strong>
          <span className="adminOverview__metricNote">Por producto</span>
        </article>
      </section>

      <div className="adminOverview__content">
        <section className="adminOverview__card adminOverview__categories">
          <div className="adminOverview__cardHeading">
            <div>
              <h2>Productos por categoría</h2>
              <p>Distribución de los productos del catálogo.</p>
            </div>
            <span className="adminOverview__cardBadge">
              {products.length} productos
            </span>
          </div>

          <ul className="adminOverview__categoryList">
            {categoryCounts.map(({ name, count }) => (
              <li className="adminOverview__category" key={name}>
                <div className="adminOverview__categoryHeading">
                  <span>{name}</span>
                  <strong>{count}</strong>
                </div>
                <progress
                  className="adminOverview__progress"
                  value={count}
                  max={maxCategoryCount}
                  aria-label={`${name}: ${count} productos`}
                />
              </li>
            ))}
          </ul>
        </section>

        <section className="adminOverview__card adminOverview__shortcuts">
          <div className="adminOverview__cardHeading">
            <div>
              <h2>Accesos rápidos</h2>
              <p>Continúa con una tarea.</p>
            </div>
          </div>
          <Link
            className="adminOverview__shortcut"
            to={`${ADMIN_BASE_PATH}/catalogo`}
          >
            <span className="adminOverview__shortcutIcon" aria-hidden="true">
              +
            </span>
            <span>
              <strong>Administrar catálogo</strong>
              <small>Agrega, edita y busca productos</small>
            </span>
            <span className="adminOverview__shortcutArrow" aria-hidden="true">
              →
            </span>
          </Link>
          <Link className="adminOverview__shortcut" to="/">
            <span className="adminOverview__shortcutIcon" aria-hidden="true">
              ↗
            </span>
            <span>
              <strong>Ver tienda</strong>
              <small>Abre la experiencia pública</small>
            </span>
            <span className="adminOverview__shortcutArrow" aria-hidden="true">
              →
            </span>
          </Link>
          <div className="adminOverview__note">
            <strong>Consejo</strong>
            <p>
              Revisa las imágenes y descripciones para mantener el catálogo
              claro y actualizado para tus clientes.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AdminDashboardPage
