import { Role } from '@/lib/types/roles';
import { PermissionName } from '@/lib/types/roles';

// returns all roles that has permissions same as role or under
export const getUserRolesUnder = (role: Role, roles: Role[]): Role[] => {
  console.log('role', role);
  if (!role?.permissions || role?.permissions?.length === 0) {
    return [];
  }
  // Extract the IDs of permissions for the given role
  const rolePermissionIds = new Set(role.permissions.map((permission) => permission.id));
  // console.log('rolePermissionIds', rolePermissionIds);

  return roles.filter((otherRole) => {
    // Extract the IDs of permissions for the current role to compare
    const otherRolePermissionIds = new Set(otherRole.permissions.map((permission) => permission.id));
    // console.log('otherRolePermissionIds', otherRolePermissionIds);
    // Check if all permissions of the otherRole are a subset of the given role's permissions
    return Array.from(otherRolePermissionIds).every((permissionId) => rolePermissionIds.has(permissionId));
  });
};

// export const getUserRolesUnder = (roles: Role[], role: Role) => {
//    console.log('role', role);
//    console.log('roles', roles);
//    const rolesUnder = roles.filter((r) => {
//       // it is above if not every r permission is in role
//       const isAbove = r.permissions.every((p) => role.permissions.includes(p));
//       console.log('isAbove', isAbove);
//       return !isAbove; // if !isAbove then it is under
//    });

//    return rolesUnder;
// };

export const hasPermission = (role: Role, permission: PermissionName | PermissionName[]) => {
  if (Array.isArray(permission)) {
    return role.permissions.some((p) => permission.includes(p.name));
  }
  return role.permissions.some((p) => p.name === permission);
};
