
import React, { useState, useEffect, useCallback } from 'react';
import { Movie, sampleMovies } from '@/types/movie';
import MovieFilterForm from '@/components/MovieFilterForm';
import MovieDataTable from '@/components/MovieDataTable';
import PaginationControls from '@/components/PaginationControls';
import { parse, isWithinInterval, isValid } from 'date-fns';

const ITEMS_PER_PAGE = 10;

const initialFilters = {
  title: '',
  year: '전체',
  director: '',
  releaseDateStart: undefined as Date | undefined,
  releaseDateEnd: undefined as Date | undefined,
};

const MovieSearchPage = () => {
  const [allMovies] = useState<Movie[]>(sampleMovies);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(sampleMovies);
  const [currentMovies, setCurrentMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(initialFilters);

  const applyFilters = useCallback(() => {
    let moviesToFilter = [...allMovies];

    if (filters.title) {
      moviesToFilter = moviesToFilter.filter(movie =>
        movie.titleKorean.toLowerCase().includes(filters.title.toLowerCase()) ||
        movie.titleEnglish.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.year !== '전체') {
      moviesToFilter = moviesToFilter.filter(movie => movie.productionYear === parseInt(filters.year));
    }

    if (filters.director) {
      moviesToFilter = moviesToFilter.filter(movie =>
        movie.director.toLowerCase().includes(filters.director.toLowerCase())
      );
    }
    
    if (filters.releaseDateStart && filters.releaseDateEnd && isValid(filters.releaseDateStart) && isValid(filters.releaseDateEnd)) {
        moviesToFilter = moviesToFilter.filter(movie => {
            try {
                const movieReleaseDate = parse(movie.releaseDate, "yyyy-MM-dd", new Date());
                if (!isValid(movieReleaseDate)) return false; // Skip invalid movie dates
                return isWithinInterval(movieReleaseDate, { start: filters.releaseDateStart!, end: filters.releaseDateEnd! });
            } catch (e) {
                console.error("Error parsing movie release date:", movie.releaseDate, e);
                return false;
            }
        });
    } else if (filters.releaseDateStart && isValid(filters.releaseDateStart)) {
        moviesToFilter = moviesToFilter.filter(movie => {
            try {
                const movieReleaseDate = parse(movie.releaseDate, "yyyy-MM-dd", new Date());
                if (!isValid(movieReleaseDate)) return false;
                return movieReleaseDate >= filters.releaseDateStart!;
            } catch (e) {
                console.error("Error parsing movie release date:", movie.releaseDate, e);
                return false;
            }
        });
    } else if (filters.releaseDateEnd && isValid(filters.releaseDateEnd)) {
        moviesToFilter = moviesToFilter.filter(movie => {
             try {
                const movieReleaseDate = parse(movie.releaseDate, "yyyy-MM-dd", new Date());
                if (!isValid(movieReleaseDate)) return false;
                return movieReleaseDate <= filters.releaseDateEnd!;
            } catch (e) {
                console.error("Error parsing movie release date:", movie.releaseDate, e);
                return false;
            }
        });
    }


    setFilteredMovies(moviesToFilter);
    setCurrentPage(1); 
  }, [allMovies, filters]);

  useEffect(() => {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    setCurrentMovies(filteredMovies.slice(offset, offset + ITEMS_PER_PAGE));
  }, [currentPage, filteredMovies]);

  const handleFilterChange = (field: string, value: string | Date | undefined) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    applyFilters();
  };

  const handleReset = () => {
    setFilters(initialFilters);
    setFilteredMovies(allMovies);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 sr-only">영화 검색</h1>
      <MovieFilterForm
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />
      <MovieDataTable movies={currentMovies} totalCount={filteredMovies.length} />
      {totalPages > 0 && (
         <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
      )}
    </div>
  );
};

export default MovieSearchPage;
