export interface Pacient {
    firstName?: string;
    lastName?: string;
    email?: string;
    cellphone?: string;
    age?: number;
    plans_purchased?: PacientPlan[];
}

export interface PacientPlan {
    name?: string;
    description?: string;
    price?: number;
}

export interface PacientPaymentRequest {
    firstName?: string;
    lastName?: string;
    email?: string;
    cellphone?: string;
    age?: number;
    planId? : string;
    userId?: string;
    meetDate?: string;
    meetTime?: string;
}