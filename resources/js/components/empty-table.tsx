import { LucideIcon } from 'lucide-react';
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from './ui/empty';
import { Icon } from './ui/icon';
import { TableCell, TableRow } from './ui/table';

interface ComponentProps {
    colspan: number;
    icon?: LucideIcon;
    title: string;
    description?: string;
}

export default function EmptyTable({
    colspan,
    icon,
    title,
    description,
}: ComponentProps) {
    return (
        <TableRow>
            <TableCell colSpan={colspan} className="p-0 text-center">
                <Empty className="to background h-full rounded-none bg-gradient-to-b from-muted/50 from-30%">
                    <EmptyHeader>
                        {icon && (
                            <EmptyMedia variant={'icon'}>
                                <Icon iconNode={icon} />
                            </EmptyMedia>
                        )}
                        <EmptyTitle>{title}</EmptyTitle>
                        <EmptyDescription>{description}</EmptyDescription>
                    </EmptyHeader>
                </Empty>
            </TableCell>
        </TableRow>
    );
}
