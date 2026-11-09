import type { SelectOption } from '../atoms/Select'
import FilterSelect from '../molecules/FilterSelect'
import SearchBar from '../molecules/SearchBar'
import '../../styles/organisms/productFilters.css'

interface ProductFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  categories: SelectOption[]
  searchPlaceholder?: string
}

function ProductFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  searchPlaceholder = 'Buscar producto...',
}: ProductFiltersProps) {
  return (
    <div className="productFilters">
      <SearchBar
        id="product-search"
        className="productFilters__search"
        value={search}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
      />
      <FilterSelect
        id="product-category"
        className="productFilters__category"
        value={category}
        onChange={onCategoryChange}
        options={categories}
      />
    </div>
  )
}

export default ProductFilters
