"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Search, Filter, SortAsc, SortDesc } from "lucide-react";
import { useQueryState } from "nuqs";

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
      router.push(`/posts/?${params.toString()}`);
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
      router.push("/posts/");
    });
  };

  const hasActiveFilters =
    search ||
    sortField !== "date" ||
    sortOrder !== "desc" ||
    preview !== undefined ||
    dateFrom ||
    dateTo ||
    limit !== "10";

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="h-8 sm:h-7 px-2 sm:px-3 text-xs sm:text-sm"
          >
            <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden sm:inline">{showFilters ? "Hide" : "Show"}</span>
            <span className="sm:hidden">{showFilters ? "Hide Filters" : "Filters"}</span>
          </Button>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 sm:h-7 px-2 sm:px-3 text-xs sm:text-sm"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Clear</span>
              <span className="sm:hidden">Clear All</span>
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
              placeholder="Search posts..."
              value={search || ""}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateURL();
                }
              }}
              className="pl-10 pr-16 sm:pr-20 h-10 sm:h-10 bg-gray-200 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-sm sm:text-base"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 hidden sm:block">
              <kbd className="px-2 py-1 text-xs font-mono bg-muted border border-muted-foreground/20 rounded text-muted-foreground">
                ⌘ K
              </kbd>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">
              Active filters:
            </span>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {search && search !== "" && (
                <div className="flex flex-row">
                  <div className="bg-gray-200 rounded-l-md pl-2 pr-1 py-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      Search:
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      &quot;{search}&quot;
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-center cursor-pointer bg-gray-200 rounded-r-md px-2 py-1 hover:bg-gray-300 transition-colors"
                    onClick={() => setSearch("")}
                  >
                    <X className="h-3 w-3 cursor-pointer text-red-500" />
                  </div>
                </div>
              )}
              {sortField !== "date" && sortField !== "" && sortField !== undefined && sortField !== null && (
                <div className="flex flex-row">
                  <div className="bg-gray-200 rounded-l-md pl-2 pr-1 py-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      Sort:
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      &quot;{sortField}&quot;
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-center cursor-pointer bg-gray-200 rounded-r-md px-2 py-1 hover:bg-gray-300 transition-colors"
                    onClick={() => setSortField("date")}
                  >
                    <X className="h-3 w-3 cursor-pointer text-red-500" />
                  </div>
                </div>
              )}
              
              {preview !== null && preview !== "" && preview !== undefined && (
                <div className="flex flex-row">
                  <div className="bg-gray-200 rounded-l-md pl-2 pr-1 py-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      Preview:
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      &quot;{preview ? "Yes" : "No"}&quot;
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-center cursor-pointer bg-gray-200 rounded-r-md px-2 py-1 hover:bg-gray-300 transition-colors"
                    onClick={() => setPreview(null)}
                  >
                    <X className="h-3 w-3 cursor-pointer text-red-500" />
                  </div>
                </div>
              )}
              {dateFrom && dateFrom !== "" && dateFrom !== undefined && dateFrom !== null && (
                <div className="flex flex-row">
                  <div className="bg-gray-200 rounded-l-md pl-2 pr-1 py-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      From:
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      &quot;{dateFrom}&quot;
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-center cursor-pointer bg-gray-200 rounded-r-md px-2 py-1 hover:bg-gray-300 transition-colors"
                    onClick={() => setDateFrom("")}
                  >
                    <X className="h-3 w-3 cursor-pointer text-red-500" />
                  </div>
                </div>
              )}
              {dateTo && dateTo !== "" && dateTo !== undefined && dateTo !== null && (
                <div className="flex flex-row">
                  <div className="bg-gray-200 rounded-l-md pl-2 pr-1 py-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      To:
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      &quot;{dateTo}&quot;
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-center cursor-pointer bg-gray-200 rounded-r-md px-2 py-1 hover:bg-gray-300 transition-colors"
                    onClick={() => setDateTo("")}
                  >
                    <X className="h-3 w-3 cursor-pointer text-red-500" />
                  </div>
                </div>
              )}
              {limit !== "10" && limit !== "" && limit !== undefined && limit !== null && (
                <div className="flex flex-row">
                  <div className="bg-gray-200 rounded-l-md pl-2 pr-1 py-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      Limit:
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      &quot;{limit}&quot;
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-center cursor-pointer bg-gray-200 rounded-r-md px-2 py-1 hover:bg-gray-300 transition-colors"
                    onClick={() => setLimit("10")}
                  >
                    <X className="h-3 w-3 cursor-pointer text-red-500" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Advanced Filters */}
        {showFilters && (
          <div className="space-y-4 pt-3 border-t">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Sort Field */}
              <div className="space-y-1">
                <Label htmlFor="sortField" className="text-xs sm:text-sm">
                  Sort By
                </Label>
                <Select
                  value={sortField || ""}
                  onValueChange={(value: "date" | "title") => setSortField(value)}
                >
                  <SelectTrigger className="h-9 sm:h-8 text-xs sm:text-sm">
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
                <Label htmlFor="sortOrder" className="text-xs sm:text-sm">
                  Sort Order
                </Label>
                <Select
                  value={sortOrder || ""}
                  onValueChange={(value: "asc" | "desc") => setSortOrder(value)}
                >
                  <SelectTrigger className="h-9 sm:h-8 text-xs sm:text-sm">
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Preview Status */}
              <div className="space-y-1">
                <Label htmlFor="preview" className="text-xs sm:text-sm">
                  Preview Status
                </Label>
                <Select
                  value={preview === null ? "all" : preview.toString()}
                  onValueChange={(value) => {
                    if (value === "all") setPreview(null);
                    else setPreview(value === "true" ? "true" : "false");
                  }}
                >
                  <SelectTrigger className="h-9 sm:h-8 text-xs sm:text-sm">
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
                <Label htmlFor="limit" className="text-xs sm:text-sm">
                  Posts Per Page
                </Label>
                <Select value={limit || ""} onValueChange={setLimit}>
                  <SelectTrigger className="h-9 sm:h-8 text-xs sm:text-sm">
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date Range */}
              <div className="space-y-1">
                <Label htmlFor="dateFrom" className="text-xs sm:text-sm">
                  From Date
                </Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={dateFrom || ""}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="h-9 sm:h-8 text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="dateTo" className="text-xs sm:text-sm">
                  To Date
                </Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={dateTo || ""}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="h-9 sm:h-8 text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Apply Filters Button */}
            <Button
              onClick={updateURL}
              disabled={isPending}
              className="w-full h-9 sm:h-8 text-xs sm:text-sm"
            >
              Apply Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
