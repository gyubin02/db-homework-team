
import React from 'react';
import { Movie } from '@/types/movie';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MovieDataTableProps {
  movies: Movie[];
  totalCount: number;
}

const MovieDataTable: React.FC<MovieDataTableProps> = ({ movies, totalCount }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-gray-700">총 <span className="font-bold">{totalCount}</span> 건</p>
        <div className="w-48">
          <Select defaultValue="latest">
            <SelectTrigger>
              <SelectValue placeholder="정렬" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">최신상영데이터순</SelectItem>
              <SelectItem value="title">영화명순</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="text-xs">영화명</TableHead>
              <TableHead className="text-xs">영화명(영문)</TableHead>
              <TableHead className="text-xs">영화코드</TableHead>
              <TableHead className="text-xs">제작연도</TableHead>
              <TableHead className="text-xs">제작국가</TableHead>
              <TableHead className="text-xs">유형</TableHead>
              <TableHead className="text-xs">장르</TableHead>
              <TableHead className="text-xs">제작상태</TableHead>
              <TableHead className="text-xs">감독</TableHead>
              <TableHead className="text-xs">제작사</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell className="text-xs py-2">{movie.titleKorean}</TableCell>
                  <TableCell className="text-xs py-2">{movie.titleEnglish}</TableCell>
                  <TableCell className="text-xs py-2">{movie.id}</TableCell>
                  <TableCell className="text-xs py-2">{movie.productionYear}</TableCell>
                  <TableCell className="text-xs py-2">{movie.productionCountry}</TableCell>
                  <TableCell className="text-xs py-2">{movie.type}</TableCell>
                  <TableCell className="text-xs py-2">{movie.genre}</TableCell>
                  <TableCell className="text-xs py-2">{movie.productionStatus}</TableCell>
                  <TableCell className="text-xs py-2">{movie.director}</TableCell>
                  <TableCell className="text-xs py-2">{movie.productionCompany}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center text-xs py-4">
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MovieDataTable;
