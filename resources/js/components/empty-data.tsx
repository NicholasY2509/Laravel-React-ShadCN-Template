import { LucideIcon } from 'lucide-react';
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from './ui/empty';
import { Icon } from './ui/icon';

interface PageProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
}
export default function EmptyData(props: PageProps) {
    return (
        <Empty className="to background h-full bg-gradient-to-b from-muted/50 from-30%">
            <EmptyHeader>
                {props.icon && (
                    <EmptyMedia variant={'icon'}>
                        <Icon iconNode={props.icon} />
                    </EmptyMedia>
                )}
                <EmptyTitle>{props.title}</EmptyTitle>
                <EmptyDescription>{props.description}</EmptyDescription>
            </EmptyHeader>
        </Empty>
    );
}
