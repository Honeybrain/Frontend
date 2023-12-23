import { RoleEnum, UserDto } from "@protos/user";

export function HaveRoles(user: UserDto | null, roles: RoleEnum[]): boolean {
    if (user?.roles.includes(RoleEnum.ADMIN)) return true;
    return roles.some((role) => user?.roles.includes(role));
}
