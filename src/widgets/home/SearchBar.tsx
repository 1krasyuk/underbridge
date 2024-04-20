import { useState } from 'react'
import { cx } from 'class-variance-authority'

interface SearchBarProps {
  onSearch: (query: string) => void
  className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className }) => {
  const [query, setQuery] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setQuery(value)
    // Вызываем функцию поиска при каждом изменении значения в поле ввода
    onSearch(value)
  }

  return (
    <div className={cx('flex items-center mx-auto mb-7', className)}>
      <input
        type="text"
        placeholder="Введите значение для поиска"
        value={query}
        onChange={handleInputChange}
        className="border border-gray-300 w-96 px-3 py-1 "
      />
    </div>
  )
}

export default SearchBar
