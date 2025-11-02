import { usePaginationMeta } from '@/hooks/use-pagination-meta';
import { useSearchSync } from '@/hooks/use-search-sync';
import { getCurrentParams } from '@/lib/utils';
import { index } from '@/routes/users';
import { PaginatedData, User } from '@/types';
import { router } from '@inertiajs/react';
import { Edit, Trash, Users } from 'lucide-react';
import EmptyTable from '../empty-table';
import { PerPageSelector } from '../per-page-selector';
import { ResultInfo } from '../result-info';
import { ServerPagination } from '../server-pagination';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';

interface PageProps {
    users: PaginatedData<User>;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

export default function UserTable({ users, onEdit, onDelete }: PageProps) {
    const currentParams = getCurrentParams();
    const { search, setSearch } = useSearchSync(index().url, currentParams);
    const { from, to, total } = usePaginationMeta(users);

    return (
        <div className="flex flex-col">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                <PerPageSelector
                    perPage={parseInt(currentParams.per_page ?? '10')}
                    currentParams={currentParams}
                    url={index().url}
                />
                <Input
                    type="text"
                    placeholder="Cari Users"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-64"
                />
                <Button
                    variant="outline"
                    onClick={() => router.get(index().url, { replace: true })}
                    className="w-full sm:w-auto"
                >
                    Reset
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">#</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.data.length > 0 ? (
                        users.data.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell className="text-center">
                                    {index + 1}
                                </TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="text-center">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onEdit(user)}
                                    >
                                        <Edit />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onDelete(user)}
                                    >
                                        <Trash className="text-destructive" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <EmptyTable
                            icon={Users}
                            colspan={4}
                            title="Tidak ada user yang ditemukan"
                            description="Tidak ada user yang terdaftar atau sesuai dengan kriteria pencarian"
                        />
                    )}
                </TableBody>
            </Table>
            <div className="mt-4 flex flex-row items-center justify-between">
                <ResultInfo
                    from={from}
                    to={to}
                    total={total}
                    entityName="users"
                />
                <ServerPagination links={users.links} className="justify-end" />
            </div>
        </div>
    );
}
