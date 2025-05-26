
import React, { useState, useEffect, useCallback } from 'react';
import { Movie, sampleMovies } from '@/types/movie';
import MovieFilterForm from '@/components/MovieFilterForm';
import MovieDataTable from '@/components/MovieDataTable';
import PaginationControls from '@/components/PaginationControls';
import { parse, isWithinInterval, isValid, startOfYear, endOfYear } from 'date-fns';

const ITEMS_PER_PAGE = 10;

const initialFilters = {
  title: '',
  productionYearStart: '전체',
  productionYearEnd: '전체',
  director: '',
  releaseDateStart: undefined as Date | undefined,
  releaseDateEnd: undefined as Date | undefined,
  // New expanded fields
  productionStatus: '',
  genre: '',
  rating: '', // Not in current Movie type, UI only for now
  screeningType: '', // Not in current Movie type, UI only for now
  movieTitleIndex: '',
  movieTypeInput: '', // "유형" input field (renamed from movieType to avoid conflict with existing movie.type)
  nationality: '', // Not in current Movie type, UI only for now
  representativeNationality: '', // Not in current Movie type, UI only for now
  movieClassifications: {
    general: false,
    art: false,
    independent: false,
  }, // Not in current Movie type, UI only for now
};

const MovieSearchPage = () => {
  const [allMovies] = useState<Movie[]>(sampleMovies);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(sampleMovies);
  const [currentMovies, setCurrentMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(initialFilters);

  const applyFilters = useCallback(() => {
    let moviesToFilter = [...allMovies];

    // Title filter
    if (filters.title) {
      moviesToFilter = moviesToFilter.filter(movie =>
        movie.titleKorean.toLowerCase().includes(filters.title.toLowerCase()) ||
        movie.titleEnglish.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    // Production Year filter
    const startYear = parseInt(filters.productionYearStart);
    const endYear = parseInt(filters.productionYearEnd);

    if (!isNaN(startYear) && filters.productionYearStart !== '전체') {
        moviesToFilter = moviesToFilter.filter(movie => movie.productionYear >= startYear);
    }
    if (!isNaN(endYear) && filters.productionYearEnd !== '전체') {
        moviesToFilter = moviesToFilter.filter(movie => movie.productionYear <= endYear);
    }
    
    // Director filter
    if (filters.director) {
      moviesToFilter = moviesToFilter.filter(movie =>
        movie.director.toLowerCase().includes(filters.director.toLowerCase())
      );
    }
    
    // Release Date filter
    if (filters.releaseDateStart && filters.releaseDateEnd && isValid(filters.releaseDateStart) && isValid(filters.releaseDateEnd)) {
        moviesToFilter = moviesToFilter.filter(movie => {
            try {
                const movieReleaseDate = parse(movie.releaseDate, "yyyy-MM-dd", new Date());
                if (!isValid(movieReleaseDate)) return false;
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

    // Production Status filter
    if (filters.productionStatus) {
      moviesToFilter = moviesToFilter.filter(movie =>
        movie.productionStatus.toLowerCase().includes(filters.productionStatus.toLowerCase())
      );
    }

    // Genre filter
    if (filters.genre) {
      moviesToFilter = moviesToFilter.filter(movie =>
        movie.genre.toLowerCase().includes(filters.genre.toLowerCase())
      );
    }
    
    // Movie Type Input ("유형") filter
    if (filters.movieTypeInput) {
      moviesToFilter = moviesToFilter.filter(movie =>
        movie.type.toLowerCase().includes(filters.movieTypeInput.toLowerCase()) // Assuming 'type' in Movie matches "유형"
      );
    }

    // Movie Title Index filter
    if (filters.movieTitleIndex) {
      moviesToFilter = moviesToFilter.filter(movie =>
        movie.titleKorean.toLowerCase().startsWith(filters.movieTitleIndex.toLowerCase()) ||
        movie.titleEnglish.toLowerCase().startsWith(filters.movieTitleIndex.toLowerCase())
      );
    }
    
    // Placeholder for filters not in Movie type:
    // rating, screeningType, nationality, representativeNationality, movieClassifications
    // console.log("Applying filters for (UI only):", {
    //   rating: filters.rating,
    //   screeningType: filters.screeningType,
    //   nationality: filters.nationality,
    //   representativeNationality: filters.representativeNationality,
    //   movieClassifications: filters.movieClassifications,
    // });

    setFilteredMovies(moviesToFilter);
    setCurrentPage(1); 
  }, [allMovies, filters]);

  useEffect(() => {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    setCurrentMovies(filteredMovies.slice(offset, offset + ITEMS_PER_PAGE));
  }, [currentPage, filteredMovies]);

  const handleFilterChange = (field: string, value: string | Date | undefined | boolean | Record<string, boolean>) => {
    if (field.startsWith('movieClassifications.')) {
      const key = field.split('.')[1] as keyof typeof initialFilters.movieClassifications;
      setFilters(prev => ({
        ...prev,
        movieClassifications: {
          ...prev.movieClassifications,
          [key]: value as boolean,
        },
      }));
    } else {
      setFilters(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSearch = () => {
    applyFilters();
  };

  const handleReset = () => {
    setFilters(initialFilters);
    // Apply filters immediately after reset to show all movies, or let applyFilters be called by search
    // For simplicity, let's re-apply filters which will show all movies with initialFilters
    // This line effectively resets to all movies as initialFilters typically results in no filtering.
    // However, if initialFilters itself implies some filtering, adjust accordingly.
    // To be absolutely sure all movies are shown:
    setFilteredMovies(allMovies); 
    setCurrentPage(1);
    // Re-trigger filter application with empty/default filters if desired, 
    // but handleReset should ideally just reset state and UI reflects this.
    // The current applyFilters will run with initialFilters next time search is clicked.
    // Or, if reset should immediately show all movies:
    // applyFilters(); // This would apply initialFilters again.
    // For now, resetting filteredMovies to allMovies is the clearest.
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
