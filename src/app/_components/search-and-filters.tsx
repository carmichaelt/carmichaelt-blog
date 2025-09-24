"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Search, Filter, SortAsc, SortDesc } from "lucide-react";
import { useQueryState } from 'nuqs'



export function SearchAndFilters() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const [search, setSearch] = useQueryState("search");
  const [sortField, setSortField] = useQueryState("sortField");
  const [sortOrder, setSortOrder] = useQueryState("sortOrder");
  const [preview, setPreview] = useQueryState("preview");
  const [dateFrom, setDateFrom] = useQueryState("dateFrom");
  const [dateTo, setDateTo] = useQueryState("dateTo");
  const [limit, setLimit] = useQueryState("limit");
  const [showFilters, setShowFilters] = useState(false);

  const updateURL = () => {
    const params = new URLSearchParams();
    
    if (search) params.set("search", search);
    if (sortField !== "date") params.set("sortField", sortField || "");
    if (sortOrder !== "desc") params.set("sortOrder", sortOrder || "");
    if (preview !== null) params.set("preview", preview.toString());
    if (dateFrom) params.set("dateFrom", dateFrom || "");
    if (dateTo) params.set("dateTo", dateTo || "");
    if (limit !== "10") params.set("limit", limit || "");

    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  };

  const clearFilters = () => {
    setSearch("");
    setSortField("date");
    setSortOrder("desc");
    setPreview(null);
    setDateFrom("");
    setDateTo("");
    setLimit("10");
    
    startTransition(() => {
      router.push("/");
    });
  };

  const hasActiveFilters = search || sortField !== "date" || sortOrder !== "desc" || 
                          preview !== undefined || dateFrom || dateTo || limit !== "10";

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Search className="h-4 w-4" />
          Search & Filters
        </h3>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="h-7 px-2 text-xs"
          >
            <Filter className="h-3 w-3 mr-1" />
            {showFilters ? "Hide" : "Show"}
          </Button>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 px-2 text-xs">
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="space-y-3">
        {/* Search Input - Styled like the image */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              type="text"
              placeholder="Search..."
              value={search || ""}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateURL();
                }
              }}
              className="pl-10 pr-20 h-10 bg-muted/50 border-muted-foreground/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <kbd className="px-2 py-1 text-xs font-mono bg-muted border border-muted-foreground/20 rounded text-muted-foreground">
                ⌘ K
              </kbd>
            </div>
          </div>
          <Button onClick={updateURL} disabled={isPending} className="w-full h-8 text-xs">
            <Search className="h-3 w-3 mr-1" />
            Search
          </Button>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="space-y-2">
            <span className="text-xs font-medium text-muted-foreground">Active filters:</span>
            <div className="flex flex-wrap gap-1">
              {search && (
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  Search: &quot;{search}&quot;
                  <X className="h-2 w-2 ml-1 cursor-pointer" onClick={() => setSearch("")} />
                </Badge>
              )}
              {sortField !== "date" && (
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  Sort: {sortField}
                  <X className="h-2 w-2 ml-1 cursor-pointer" onClick={() => setSortField("date")} />
                </Badge>
              )}
              {sortOrder !== "desc" && (
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  Order: {sortOrder}
                  <X className="h-2 w-2 ml-1 cursor-pointer" onClick={() => setSortOrder("desc")} />
                </Badge>
              )}
              {preview !== null && (
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  Preview: {preview ? "Yes" : "No"}
                  <X className="h-2 w-2 ml-1 cursor-pointer" onClick={() => setPreview(null)} />
                </Badge>
              )}
              {dateFrom && (
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  From: {dateFrom}
                  <X className="h-2 w-2 ml-1 cursor-pointer" onClick={() => setDateFrom("")} />
                </Badge>
              )}
              {dateTo && (
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  To: {dateTo}
                  <X className="h-2 w-2 ml-1 cursor-pointer" onClick={() => setDateTo("")} />
                </Badge>
              )}
              {limit !== "10" && (
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  Limit: {limit}
                  <X className="h-2 w-2 ml-1 cursor-pointer" onClick={() => setLimit("10")} />
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Advanced Filters */}
        {showFilters && (
          <div className="space-y-3 pt-3 border-t">
            {/* Sort Field */}
            <div className="space-y-1">
              <Label htmlFor="sortField" className="text-xs">Sort By</Label>
              <Select value={sortField || ""} onValueChange={(value: "date" | "title") => setSortField(value)}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort Order */}
            <div className="space-y-1">
              <Label htmlFor="sortOrder" className="text-xs">Sort Order</Label>
              <Select value={sortOrder || ""} onValueChange={(value: "asc" | "desc") => setSortOrder(value)}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">
                    <div className="flex items-center gap-2">
                      <SortDesc className="h-3 w-3" />
                      Descending
                    </div>
                  </SelectItem>
                  <SelectItem value="asc">
                    <div className="flex items-center gap-2">
                      <SortAsc className="h-3 w-3" />
                      Ascending
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Preview Status */}
            <div className="space-y-1">
              <Label htmlFor="preview" className="text-xs">Preview Status</Label>
              <Select 
                value={preview === null ? "all" : preview.toString()} 
                onValueChange={(value) => {
                  if (value === "all") setPreview(null);
                  else setPreview(value === "true" ? "true" : "false");
                }}
              >
                <SelectTrigger className="h-8 text-xs">
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
            <div className="space-y-1">
              <Label htmlFor="limit" className="text-xs">Posts Per Page</Label>
              <Select value={limit || ""} onValueChange={setLimit}>
                <SelectTrigger className="h-8 text-xs">
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
            <div className="space-y-1">
              <Label htmlFor="dateFrom" className="text-xs">From Date</Label>
              <Input
                id="dateFrom"
                type="date"
                value={dateFrom || ""}
                onChange={(e) => setDateFrom(e.target.value)}
                className="h-8 text-xs"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="dateTo" className="text-xs">To Date</Label>
              <Input
                id="dateTo"
                type="date"
                value={dateTo || ""}
                onChange={(e) => setDateTo(e.target.value)}
                className="h-8 text-xs"
              />
            </div>

            {/* Apply Filters Button */}
            <Button onClick={updateURL} disabled={isPending} className="w-full h-8 text-xs">
              Apply Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
