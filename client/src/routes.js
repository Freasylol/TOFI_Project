import Admin from "./pages/Admin";
import Aim from "./pages/Aim";
import Credit from "./pages/Credit";
import Deposit from "./pages/Deposit";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Transaction from "./pages/Transaction";
import { ADMIN_ROUTE, AIM_ROUTE, CREDIT_ROUTE, DEPOSIT_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, TRANSACTION_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin,
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile 
    }, 
    {
        path: AIM_ROUTE,
        Component: Aim
    },
    {
        path: CREDIT_ROUTE,
        Component: Credit
    },
    {
        path: DEPOSIT_ROUTE,
        Component: Deposit
    },
    {
        path: TRANSACTION_ROUTE,
        Component: Transaction
    }
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    }
]