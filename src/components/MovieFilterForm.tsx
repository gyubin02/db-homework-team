
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@/types/movie"; // Using renamed CalendarIcon from movie.ts
import { format, isValid } from 'date-fns';
import { cn } from '@/lib/utils';

interface MovieFilterFormProps {
  filters: {
    title: string;
    year: string;
    director: string;
    releaseDateStart?: Date;
    releaseDateEnd?: Date;
  };
  onFilterChange: (field: string, value: string | Date | undefined) => void;
  onSearch: () => void;
  onReset: () => void;
}

const productionYears = ["전체", "2025", "2024", "2023", "2022", "2021"];

const MovieFilterForm: React.FC<MovieFilterFormProps> = ({
  filters,
  onFilterChange,
  onSearch,
  onReset,
}) => {
  return (
    <div className="p-4 border rounded-md bg-gray-50 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div>
          <label htmlFor="movieTitle" className="block text-sm font-medium text-gray-700 mb-1">영화명</label>
          <Input
            id="movieTitle"
            placeholder="영화명 입력"
            value={filters.title}
            onChange={(e) => onFilterChange('title', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="productionYear" className="block text-sm font-medium text-gray-700 mb-1">제작연도</label>
          <Select value={filters.year} onValueChange={(value) => onFilterChange('year', value)}>
            <SelectTrigger id="productionYear">
              <SelectValue placeholder="전체" />
            </SelectTrigger>
            <SelectContent>
              {productionYears.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="directorName" className="block text-sm font-medium text-gray-700 mb-1">감독명</label>
          <Input
            id="directorName"
            placeholder="감독명 입력"
            value={filters.director}
            onChange={(e) => onFilterChange('director', e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-1">개봉일자</label>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !filters.releaseDateStart && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.releaseDateStart && isValid(filters.releaseDateStart) ? format(filters.releaseDateStart, "yyyy-MM-dd") : <span>시작일</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.releaseDateStart}
                  onSelect={(date) => onFilterChange('releaseDateStart', date)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            <span>~</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !filters.releaseDateEnd && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.releaseDateEnd && isValid(filters.releaseDateEnd) ? format(filters.releaseDateEnd, "yyyy-MM-dd") : <span>종료일</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.releaseDateEnd}
                  onSelect={(date) => onFilterChange('releaseDateEnd', date)}
                  initialFocus
                  disabled={(date) => filters.releaseDateStart ? date < filters.releaseDateStart : false}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <Button onClick={onSearch} variant="default">조회</Button>
        <Button onClick={onReset} variant="outline">초기화</Button>
      </div>
    </div>
  );
};

export default MovieFilterForm;
