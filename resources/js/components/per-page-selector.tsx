import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { Label } from '@radix-ui/react-label';

interface PerPageSelectorProps {
    perPage?: number;
    onPerPageChange?: (perPage: number) => void;
    className?: string;
    currentParams?: Record<string, string>;
    url?: string;
}

export function PerPageSelector({
    perPage = 10,
    onPerPageChange,
    className,
    currentParams,
    url,
}: PerPageSelectorProps) {
    const handleChange = (value: string) => {
        const newPerPage = parseInt(value);
        onPerPageChange?.(newPerPage);

        if (currentParams && url) {
            const params: Record<string, string> = {
                ...currentParams,
                per_page: value,
            };
            delete (params as any)['page'];
            router.get(url, params, { preserveState: true, replace: true });
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Label className="text-sm font-medium">Baris</Label>
            <Select value={perPage.toString()} onValueChange={handleChange}>
                <SelectTrigger className={cn('w-[70px]', className)}>
                    <span>{perPage}</span>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
