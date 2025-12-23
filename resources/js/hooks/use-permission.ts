import { usePage } from '@inertiajs/react';

type RoleOrRoles = string | string[];
type PermOrPerms = string | string[];

export function usePermission() {
    const { props } = usePage<{
        auth: {
            user: {
                role_names: string[];
                permission_names: string[];
            };
        };
    }>();

    const roles = props.auth?.user?.role_names ?? [];
    const permissions = props.auth?.user?.permission_names ?? [];

    const isIT = roles.includes('IT');

    const hasRole = (role: RoleOrRoles) => {
        if (isIT) return true;

        const checkRoles = Array.isArray(role) ? role : [role];
        return checkRoles.some((r) => roles.includes(r));
    };

    const hasPermission = (permission: PermOrPerms) => {
        if (isIT) return true;

        const checkPerms = Array.isArray(permission)
            ? permission
            : [permission];
        return checkPerms.some((p) => permissions.includes(p));
    };

    return { hasRole, hasPermission };
}
