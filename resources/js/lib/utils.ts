import { router, usePage } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | null) {
    if (!dateString) return 'N/A';
    return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }).format(new Date(dateString));
}

export function formatDateTime(dateString: string | null) {
    if (!dateString) return 'N/A';
    return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }).format(new Date(dateString));
}

export function formatTime(dateString: string | null) {
    if (!dateString) return 'N/A';
    return new Intl.DateTimeFormat('id-ID', {
        hour: 'numeric',
        minute: 'numeric',
    }).format(new Date(dateString));
}

export function getCurrentParams(): Record<string, string> {
    const { url } = usePage();
    const queryString = url.includes('?') ? url.split('?')[1] : '';
    return Object.fromEntries(new URLSearchParams(queryString).entries());
}

export function formatNumber(number: number): string {
    return new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(
        number,
    );
}

export function handleFilter(
    url: string,
    params: Record<string, string>,
    key: string,
    value: string,
) {
    const updatedParams = { ...params };

    if (value === 'all' || value === '') {
        delete updatedParams[key];
    } else {
        updatedParams[key] = value;
    }

    router.get(url, updatedParams);
}
