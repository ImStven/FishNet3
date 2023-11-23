import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { jwtDecode } from "jwt-decode";

export const adminGuard: CanActivateFn = (route, state) => {
    const token = localStorage.getItem("token")!;
    const router = inject(Router);
    const { role } = jwtDecode(token) as any;

    if (role === 'ADMIN') {
        return true;
    } else {
        router.navigate(['/welcome']);
        return false;
    }
}