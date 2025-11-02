import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';
import { useCallback } from 'react';

interface ServerPaginationProps {
    links: { url: string | null; label: string; active: boolean }[];
    className?: string;
}

export function ServerPagination({ links, className }: ServerPaginationProps) {
    const { url } = usePage();
    const queryString = url.includes('?') ? url.split('?')[1] : '';
    const currentParams = Object.fromEntries(
        new URLSearchParams(queryString).entries(),
    );

    const previousLink = links.find((link) => link.label.includes('Previous'));
    const nextLink = links.find((link) => link.label.includes('Next'));

    const pageLinks = links.filter(
        (link) =>
            !link.label.includes('Previous') &&
            !link.label.includes('Next') &&
            !isNaN(Number(link.label)),
    );

    const firstPageLink = pageLinks.length > 0 ? pageLinks[0] : null;
    const lastPageLink =
        pageLinks.length > 0 ? pageLinks[pageLinks.length - 1] : null;
    const currentPageLink = pageLinks.find((link) => link.active) || null;

    const handlePageClick = useCallback(
        (url: string | null) => {
            if (url) {
                router.visit(constructUrl(url, currentParams), {
                    preserveState: true,
                });
            }
        },
        [currentParams],
    );

    return (
        <Pagination className={cn(className)}>
            <PaginationContent>
                <PaginationItem>
                    {previousLink?.url ? (
                        <PaginationPrevious
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageClick(previousLink.url);
                            }}
                            size="default"
                        />
                    ) : (
                        <PaginationPrevious
                            size="default"
                            className="pointer-events-none opacity-50"
                            aria-disabled="true"
                        />
                    )}
                </PaginationItem>

                {pageLinks.length > 0 &&
                    renderPageLinks(
                        pageLinks,
                        firstPageLink,
                        lastPageLink,
                        currentPageLink,
                        currentParams,
                        handlePageClick,
                    )}

                <PaginationItem>
                    {nextLink?.url ? (
                        <PaginationNext
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageClick(nextLink.url);
                            }}
                            size="default"
                        />
                    ) : (
                        <PaginationNext
                            size="default"
                            className="pointer-events-none opacity-50"
                            aria-disabled="true"
                        />
                    )}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

function renderPageLinks(
    pageLinks: { url: string | null; label: string; active: boolean }[],
    firstPageLink: {
        url: string | null;
        label: string;
        active: boolean;
    } | null,
    lastPageLink: { url: string | null; label: string; active: boolean } | null,
    currentPageLink: {
        url: string | null;
        label: string;
        active: boolean;
    } | null,
    currentParams: Record<string, string>,
    handlePageClick: (url: string | null) => void,
) {
    const totalPages = pageLinks.length;

    if (totalPages <= 7) {
        return pageLinks.map((link, i) => (
            <PaginationItem key={`page-${i}`}>
                <PaginationLink
                    isActive={link.active}
                    onClick={(e) => {
                        e.preventDefault();
                        handlePageClick(link.url);
                    }}
                    size="icon"
                >
                    {link.label}
                </PaginationLink>
            </PaginationItem>
        ));
    }

    // For larger number of pages, show dynamic pagination
    const currentPage = currentPageLink ? parseInt(currentPageLink.label) : 1;
    const firstPage = firstPageLink ? parseInt(firstPageLink.label) : 1;
    const lastPage = lastPageLink ? parseInt(lastPageLink.label) : totalPages;

    const items = [];

    // Always show first page
    if (firstPageLink) {
        items.push(
            <PaginationItem key="first">
                <PaginationLink
                    isActive={firstPageLink.active}
                    onClick={(e) => {
                        e.preventDefault();
                        handlePageClick(firstPageLink.url);
                    }}
                    size="icon"
                >
                    {firstPageLink.label}
                </PaginationLink>
            </PaginationItem>,
        );
    }

    // Show ellipsis after first page if needed
    if (currentPage > firstPage + 3) {
        items.push(
            <PaginationItem key="ellipsis-start">
                <PaginationEllipsis />
            </PaginationItem>,
        );
    }

    let startPage = Math.max(firstPage + 1, currentPage - 1);
    let endPage = Math.min(lastPage - 1, currentPage + 1);

    if (currentPage - firstPage <= 3) {
        startPage = firstPage + 1;
        endPage = Math.min(firstPage + 3, lastPage - 1);
    }

    if (lastPage - currentPage <= 3) {
        startPage = Math.max(lastPage - 3, firstPage + 1);
        endPage = lastPage - 1;
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageLink = pageLinks.find((link) => parseInt(link.label) === i);
        if (pageLink) {
            items.push(
                <PaginationItem key={`page-${i}`}>
                    <PaginationLink
                        isActive={pageLink.active}
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageClick(pageLink.url);
                        }}
                        size="icon"
                    >
                        {pageLink.label}
                    </PaginationLink>
                </PaginationItem>,
            );
        }
    }

    if (currentPage < lastPage - 3) {
        items.push(
            <PaginationItem key="ellipsis-end">
                <PaginationEllipsis />
            </PaginationItem>,
        );
    }

    if (lastPageLink && lastPage !== firstPage) {
        items.push(
            <PaginationItem key="last">
                <PaginationLink
                    isActive={lastPageLink.active}
                    onClick={(e) => {
                        e.preventDefault();
                        handlePageClick(lastPageLink.url);
                    }}
                    size="icon"
                >
                    {lastPageLink.label}
                </PaginationLink>
            </PaginationItem>,
        );
    }

    return items;
}

function constructUrl(
    url: string,
    currentParams: Record<string, string>,
): string {
    const newUrl = new URL(url, window.location.origin);
    Object.entries(currentParams).forEach(([key, value]) => {
        if (!newUrl.searchParams.has(key)) {
            newUrl.searchParams.set(key, value);
        }
    });
    return newUrl.toString();
}
