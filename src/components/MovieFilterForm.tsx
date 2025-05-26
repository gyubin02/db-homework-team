
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox"; // Added Checkbox
import { Label } from "@/components/ui/label"; // Added Label for Checkbox
import { CalendarIcon } from "@/types/movie";
import { format, isValid } from 'date-fns';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MovieFilterFormProps {
  filters: {
    title: string;
    productionYearStart: string;
    productionYearEnd: string;
    director: string;
    releaseDateStart?: Date;
    releaseDateEnd?: Date;
    // New expanded fields
    productionStatus: string;
    genre: string;
    rating: string;
    screeningType: string;
    movieTitleIndex: string;
    movieTypeInput: string; 
    nationality: string;
    representativeNationality: string;
    movieClassifications: {
      general: boolean;
      art: boolean;
      independent: boolean;
    };
  };
  onFilterChange: (field: string, value: any) => void;
  onSearch: () => void;
  onReset: () => void;
}

const productionYears = ["전체", ...Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString())]; // More years
const movieIndexChars = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z', '전체'];


const MovieFilterForm: React.FC<MovieFilterFormProps> = ({
  filters,
  onFilterChange,
  onSearch,
  onReset,
}) => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);

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
            className="text-sm"
          />
        </div>
        
        <div className="flex flex-col">
            <label htmlFor="productionYearStart" className="block text-sm font-medium text-gray-700 mb-1">제작연도</label>
            <div className="flex items-center gap-2">
            <Select value={filters.productionYearStart} onValueChange={(value) => onFilterChange('productionYearStart', value)}>
                <SelectTrigger id="productionYearStart" className="text-sm">
                <SelectValue placeholder="전체" />
                </SelectTrigger>
                <SelectContent>
                {productionYears.map((year) => (
                    <SelectItem key={`start-${year}`} value={year} className="text-sm">
                    {year}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
            <span>~</span>
            <Select value={filters.productionYearEnd} onValueChange={(value) => onFilterChange('productionYearEnd', value)}>
                <SelectTrigger id="productionYearEnd" className="text-sm">
                <SelectValue placeholder="전체" />
                </SelectTrigger>
                <SelectContent>
                {productionYears.map((year) => (
                    <SelectItem key={`end-${year}`} value={year} className="text-sm">
                    {year}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>
        </div>

        <div>
          <label htmlFor="directorName" className="block text-sm font-medium text-gray-700 mb-1">감독명</label>
          <Input
            id="directorName"
            placeholder="감독명 입력"
            value={filters.director}
            onChange={(e) => onFilterChange('director', e.target.value)}
            className="text-sm"
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
                    "w-full justify-start text-left font-normal text-sm",
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
                    "w-full justify-start text-left font-normal text-sm",
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

      <div className="mt-4 flex justify-between items-center">
        <Button variant="link" onClick={() => setShowMoreFilters(!showMoreFilters)} className="text-sm p-0 h-auto">
          {showMoreFilters ? "간략검색" : "상세검색"}
          {showMoreFilters ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
        </Button>
        <div className="flex space-x-2">
            <Button onClick={onSearch} variant="default" size="sm">조회</Button>
            <Button onClick={onReset} variant="outline" size="sm">초기화</Button>
        </div>
      </div>

      {showMoreFilters && (
        <div className="mt-4 pt-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {/* Left Column */}
            <div>
              <div className="mb-3">
                <label htmlFor="productionStatus" className="block text-sm font-medium text-gray-700 mb-1">제작상태</label>
                <Input id="productionStatus" placeholder="제작상태 입력" value={filters.productionStatus} onChange={(e) => onFilterChange('productionStatus', e.target.value)} className="text-sm"/>
              </div>
              <div className="mb-3">
                <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">장르별</label>
                <Input id="genre" placeholder="장르 입력" value={filters.genre} onChange={(e) => onFilterChange('genre', e.target.value)} className="text-sm"/>
              </div>
              <div className="mb-3">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">등급별</label>
                <Input id="rating" placeholder="등급 입력" value={filters.rating} onChange={(e) => onFilterChange('rating', e.target.value)} className="text-sm"/>
              </div>
              <div>
                <label htmlFor="screeningType" className="block text-sm font-medium text-gray-700 mb-1">상영타입별</label>
                <Input id="screeningType" placeholder="상영타입 입력" value={filters.screeningType} onChange={(e) => onFilterChange('screeningType', e.target.value)} className="text-sm"/>
              </div>
            </div>
            {/* Right Column */}
            <div>
              <div className="mb-3">
                <label htmlFor="movieTypeInput" className="block text-sm font-medium text-gray-700 mb-1">유형</label>
                <Input id="movieTypeInput" placeholder="유형 입력" value={filters.movieTypeInput} onChange={(e) => onFilterChange('movieTypeInput', e.target.value)} className="text-sm"/>
              </div>
              <div className="mb-3">
                <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">국적별</label>
                <Input id="nationality" placeholder="국적 입력" value={filters.nationality} onChange={(e) => onFilterChange('nationality', e.target.value)} className="text-sm"/>
              </div>
              <div className="mb-3">
                <label htmlFor="representativeNationality" className="block text-sm font-medium text-gray-700 mb-1">대표국적별</label>
                <Input id="representativeNationality" placeholder="대표국적 입력" value={filters.representativeNationality} onChange={(e) => onFilterChange('representativeNationality', e.target.value)} className="text-sm"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">영화구분</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="generalMovie" checked={filters.movieClassifications.general} onCheckedChange={(checked) => onFilterChange('movieClassifications.general', checked)} />
                    <Label htmlFor="generalMovie" className="text-sm font-normal">일반영화</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="artMovie" checked={filters.movieClassifications.art} onCheckedChange={(checked) => onFilterChange('movieClassifications.art', checked)} />
                    <Label htmlFor="artMovie" className="text-sm font-normal">예술영화</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="independentMovie" checked={filters.movieClassifications.independent} onCheckedChange={(checked) => onFilterChange('movieClassifications.independent', checked)} />
                    <Label htmlFor="independentMovie" className="text-sm font-normal">독립영화</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">영화명 인덱싱</label>
            <div className="flex flex-wrap gap-1">
              {movieIndexChars.map(char => (
                <Button
                  key={char}
                  variant={filters.movieTitleIndex === char ? "default" : "outline"}
                  size="sm"
                  className={cn("px-2.5 py-1 h-auto text-xs", filters.movieTitleIndex === char ? "bg-primary text-primary-foreground" : "")}
                  onClick={() => onFilterChange('movieTitleIndex', char === "전체" ? "" : char)}
                >
                  {char}
                </Button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button variant="outline" size="sm" onClick={() => setShowMoreFilters(false)}>닫기</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieFilterForm;
