import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
    onSearch: (term: string) => void;
    onCategoryFilter: (category: string) => void;
    categories: string[];
    selectedCategory: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
    onSearch, 
    onCategoryFilter, 
    categories, 
    selectedCategory 
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleCategoryClick = (category: string) => {
        onCategoryFilter(category);
    };

    return (
        <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <h1 className="text-2xl font-bold text-blue-600">
                            Pausas Activas
                        </h1>
                    </div>

                    <div className="hidden md:block flex-1 max-w-lg mx-8">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Buscar actividades..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center space-x-4">
                        <button
                            onClick={() => handleCategoryClick('Todas')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                selectedCategory === 'Todas'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Todas
                        </button>
                        {(categories || []).map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    selectedCategory === category
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Menú de usuario */}
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button
                                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                                onClick={() => navigate('/login')}
                            >
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">S</span>
                                </div>
                                <span className="hidden md:block text-sm font-medium">Salir</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Barra de búsqueda móvil (oculta en esta versión de escritorio) */}
            <div className="md:hidden px-4 py-2 border-t border-gray-200" style={{ display: 'none' }}>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar actividades..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;