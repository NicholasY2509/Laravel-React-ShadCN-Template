import PageTitle from '@/components/page-title';
import { Button } from '@/components/ui/button';
import UserDeleteConfirmation from '@/components/users/user-delete-confirmation';
import UserForm from '@/components/users/user-form';
import UserTable from '@/components/users/user-table';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/users';
import { BreadcrumbItem, PaginatedData, Role, User } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface PageProps {
    users: PaginatedData<User>;
    roles: Role[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Settings',
        href: '#',
    },
    {
        title: 'Users',
        href: index().url,
    },
];

export default function UserIndex({ users, roles }: PageProps) {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsFormModalOpen(true);
    };

    const handleDelete = (user: User) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleFormClose = () => {
        setIsFormModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col justify-between space-y-2 md:flex-row md:space-y-0">
                    <PageTitle title="Users" />
                    <Button
                        onClick={() => setIsFormModalOpen(true)}
                        className="w-fit"
                    >
                        <Plus />
                        Tambah User
                    </Button>
                </div>
                <UserTable
                    users={users}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            <UserForm
                isModalOpen={isFormModalOpen}
                onOpenChange={handleFormClose}
                user={selectedUser}
                roles={roles}
            />
            <UserDeleteConfirmation
                isModalOpen={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                user={selectedUser}
            />
        </AppLayout>
    );
}
