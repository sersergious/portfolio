// components/content/ContentFilter.tsx
'use client'

import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { motion, AnimatePresence } from 'framer-motion'

interface ContentFilterProps {
    searchPlaceholder?: string
    categories?: string[]
    tags?: string[]
    sortOptions?: { value: string; label: string }[]
    onSearchChange?: (search: string) => void
    onCategoryChange?: (category: string | null) => void
    onTagsChange?: (tags: string[]) => void
    onSortChange?: (sort: string) => void
}

export function ContentFilter({
                                  searchPlaceholder = "Search...",
                                  categories = [],
                                  tags = [],
                                  sortOptions = [],
                                  onSearchChange,
                                  onCategoryChange,
                                  onTagsChange,
                                  onSortChange
                              }: ContentFilterProps) {
    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [showFilters, setShowFilters] = useState(false)

    const handleSearchChange = (value: string) => {
        setSearch(value)
        onSearchChange?.(value)
    }

    const handleCategorySelect = (category: string | null) => {
        setSelectedCategory(category)
        onCategoryChange?.(category)
    }

    const handleTagToggle = (tag: string) => {
        const newTags = selectedTags.includes(tag)
            ? selectedTags.filter(t => t !== tag)
            : [...selectedTags, tag]
        setSelectedTags(newTags)
        onTagsChange?.(newTags)
    }

    const clearFilters = () => {
        setSearch('')
        setSelectedCategory(null)
        setSelectedTags([])
        onSearchChange?.('')
        onCategoryChange?.(null)
        onTagsChange?.([])
    }

    const hasActiveFilters = search || selectedCategory || selectedTags.length > 0

    return (
        <div className="space-y-4">
            {/* Search and Filter Toggle */}
            <div className="flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder={searchPlaceholder}
                        value={search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {sortOptions.length > 0 && (
                    <Select onValueChange={onSortChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by..." />
                        </SelectTrigger>
                        <SelectContent>
                            {sortOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowFilters(!showFilters)}
                    className={showFilters ? "bg-accent" : ""}
                >
                    <Filter className="h-4 w-4" />
                </Button>
            </div>

            {/* Expandable Filters */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="space-y-4 pt-4 border-t">
                            {/* Categories */}
                            {categories.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium mb-2">Categories</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            variant={selectedCategory === null ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handleCategorySelect(null)}
                                        >
                                            All
                                        </Button>
                                        {categories.map(category => (
                                            <Button
                                                key={category}
                                                variant={selectedCategory === category ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => handleCategorySelect(category)}
                                            >
                                                {category}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tags */}
                            {tags.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium mb-2">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map(tag => (
                                            <Badge
                                                key={tag}
                                                variant={selectedTags.includes(tag) ? "default" : "outline"}
                                                className="cursor-pointer transition-colors"
                                                onClick={() => handleTagToggle(tag)}
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Active filters:</span>
                    <div className="flex flex-wrap gap-2">
                        {selectedCategory && (
                            <Badge variant="secondary">
                                Category: {selectedCategory}
                                <X
                                    className="w-3 h-3 ml-1 cursor-pointer"
                                    onClick={() => handleCategorySelect(null)}
                                />
                            </Badge>
                        )}
                        {selectedTags.map(tag => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                                <X
                                    className="w-3 h-3 ml-1 cursor-pointer"
                                    onClick={() => handleTagToggle(tag)}
                                />
                            </Badge>
                        ))}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-xs"
                    >
                        Clear all
                    </Button>
                </div>
            )}
        </div>
    )
}