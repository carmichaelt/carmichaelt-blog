"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Search, Filter, SortAsc, SortDesc } from "lucide-react";

type Props = {
  currentSearch: string;
  currentSortField: "date" | "title";
  currentSortOrder: "asc" | "desc";
  currentAuthor?: string;
  currentPreview?: boolean;
  currentDateFrom?: string;
  currentDateTo?: string;
  currentLimit: number;
};

export function SearchAndFilters({
  currentSearch,
  currentSortField,
  currentSortOrder,
  currentAuthor,
  currentPreview,
  currentDateFrom,
  currentDateTo,
  currentLimit,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const [search, setSearch] = useState(currentSearch);
  const [sortField, setSortField] = useState(currentSortField);
  const [sortOrder, setSortOrder] = useState(currentSortOrder);
  const [author, setAuthor] = useState(currentAuthor || "");
  const [preview, setPreview] = useState(currentPreview);
  const [dateFrom, setDateFrom] = useState(currentDateFrom || "");
  const [dateTo, setDateTo] = useState(currentDateTo || "");
  const [limit, setLimit] = useState(currentLimit.toString());
  const [showFilters, setShowFilters] = useState(false);

  const updateURL = () => {
    const params = new URLSearchParams();
    
    if (search) params.set("search", search);
    if (sortField !== "date") params.set("sortField", sortField);
    if (sortOrder !== "desc") params.set("sortOrder", sortOrder);
    if (author) params.set("author", author);
    if (preview !== undefined) params.set("preview", preview.toString());
    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);
    if (limit !== "10") params.set("limit", limit);

    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  };

  const clearFilters = () => {
    setSearch("");
    setSortField("date");
    setSortOrder("desc");
    setAuthor("");
    setPreview(undefined);
    setDateFrom("");
    setDateTo("");
    setLimit("10");
    
    startTransition(() => {
      router.push("/");
    });
  };

  const hasActiveFilters = search || sortField !== "date" || sortOrder !== "desc" || 
                          author || preview !== undefined || dateFrom || dateTo || limit !== "10";

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filters
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? "Hide" : "Show"} Filters
            </Button>
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Search Input */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="search">Search Posts</Label>
            <Input
              id="search"
              type="text"
              placeholder="Search by title, excerpt, or content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateURL();
                }
              }}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={updateURL} disabled={isPending}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-600">Active filters:</span>
            {search && (
              <Badge variant="secondary">
                Search: "{search}"
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSearch("")} />
              </Badge>
            )}
            {sortField !== "date" && (
              <Badge variant="secondary">
                Sort: {sortField}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSortField("date")} />
              </Badge>
            )}
            {sortOrder !== "desc" && (
              <Badge variant="secondary">
                Order: {sortOrder}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSortOrder("desc")} />
              </Badge>
            )}
            {author && (
              <Badge variant="secondary">
                Author: {author}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setAuthor("")} />
              </Badge>
            )}
            {preview !== undefined && (
              <Badge variant="secondary">
                Preview: {preview ? "Yes" : "No"}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setPreview(undefined)} />
              </Badge>
            )}
            {dateFrom && (
              <Badge variant="secondary">
                From: {dateFrom}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setDateFrom("")} />
              </Badge>
            )}
            {dateTo && (
              <Badge variant="secondary">
                To: {dateTo}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setDateTo("")} />
              </Badge>
            )}
            {limit !== "10" && (
              <Badge variant="secondary">
                Limit: {limit}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setLimit("10")} />
              </Badge>
            )}
          </div>
        )}

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
            {/* Sort Field */}
            <div>
              <Label htmlFor="sortField">Sort By</Label>
              <Select value={sortField} onValueChange={(value: "date" | "title") => setSortField(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort Order */}
            <div>
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Select value={sortOrder} onValueChange={(value: "asc" | "desc") => setSortOrder(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">
                    <div className="flex items-center gap-2">
                      <SortDesc className="h-4 w-4" />
                      Descending
                    </div>
                  </SelectItem>
                  <SelectItem value="asc">
                    <div className="flex items-center gap-2">
                      <SortAsc className="h-4 w-4" />
                      Ascending
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Preview Status */}
            <div>
              <Label htmlFor="preview">Preview Status</Label>
              <Select 
                value={preview === undefined ? "all" : preview.toString()} 
                onValueChange={(value) => {
                  if (value === "all") setPreview(undefined);
                  else setPreview(value === "true");
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Posts</SelectItem>
                  <SelectItem value="false">Published Only</SelectItem>
                  <SelectItem value="true">Preview Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Limit */}
            <div>
              <Label htmlFor="limit">Posts Per Page</Label>
              <Select value={limit} onValueChange={setLimit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div>
              <Label htmlFor="dateFrom">From Date</Label>
              <Input
                id="dateFrom"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="dateTo">To Date</Label>
              <Input
                id="dateTo"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>

            {/* Author */}
            <div>
              <Label htmlFor="author">Author ID</Label>
              <Input
                id="author"
                type="text"
                placeholder="Author ID"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            {/* Apply Filters Button */}
            <div className="flex items-end">
              <Button onClick={updateURL} disabled={isPending} className="w-full">
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
