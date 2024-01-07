import { DealTypeOption, HomeTypeOption } from "../filters/filtersTypes";

interface ContactDetails {
    name: string;
    phoneNumber: string;
    EmailAddress: string;
}

export interface Post {
    location: string;
    dealType: DealTypeOption;
    price: number;
    bedrooms: number;
    bathrooms: number;
    homeType: HomeTypeOption;
    area: number;
    contactDetails?: ContactDetails;
    comments?: string[];
}