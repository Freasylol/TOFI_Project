import { $authHost, $host } from "./index";


export const registration = async (first_name, last_name, email, password, passport_id, birth_date) => {
    const response = await $host.post('user', {first_name, last_name, email, password, passport_id, birth_date, roleId: 1});
    return response;
}

export const login = async (email, password) => {
    const response = await $host.post('user/login', {email, password});
    return response;
}

export const check = async () => {
    const response = await $host.post('user/auth', {email, password, roleId: 1})
    return response;
}