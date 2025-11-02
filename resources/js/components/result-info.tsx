interface ResultInfoProps {
    from: number;
    to: number;
    total: number;
    entityName?: string;
}

export function ResultInfo({
    from,
    to,
    total,
    entityName = 'results',
}: ResultInfoProps) {
    return (
        <div className="text-sm text-muted-foreground">
            {total > 0
                ? `Menampilkan ${from}-${to} dari ${total} ${entityName}`
                : `Tidak ada ${entityName} ditemukan`}
        </div>
    );
}
