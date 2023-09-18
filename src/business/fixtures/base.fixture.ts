export const BASE_URL: string = 'https://www.saucedemo.com/';
export const PASSWORD: string = 'secret_sauce';

export enum UserTypes {
    Standard = 'standard_user',
    Locked = 'locked_out_user',
    Problem = 'problem_user',
    Performance = 'performance_glitch_user'
};

export interface Credentials {
    username: string,
    password: string
};

// Practical part
// LITERALL EXAMPLE
export const EXPECTED_HEADER: "Swag Labs" = "Swag Labs";
