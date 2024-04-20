import { useState } from 'react';

function SearchDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = () => {
    // Обработка поискового запроса
    console.log('Вы ищете:', searchTerm);
  };

  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 cursor-pointer"
        viewBox="0 0 24 24"
        onClick={toggleDropdown}
      >
        {/* Иконка поиска */}
      </svg>
      {isOpen && (
        <div className="absolute top-full left-0 bg-white border border-gray-300 p-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Поиск..."
            className="border border-gray-300 p-1 mr-2"
          />
          <button onClick={handleSearch} className="bg-blue-500 text-white px-2 py-1 rounded">Искать</button>
        </div>
      )}
    </div>
  );
}

export default SearchDropdown;
