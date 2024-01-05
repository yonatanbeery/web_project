export const roomsOptions = [1, 2, 3, 4, 5] as const;
export type RoomsOption = typeof roomsOptions[number]
export const homeTypeOptions = [ 'house', 'townhome', 'multi-family', 'condos/co-ops', 'lots/land', 'apartment', 'manufactured'] as const
export type HomeTypeOption = typeof homeTypeOptions[number];;
export const dealTypeOptions = ['rent', 'sale'] as const;
export type DealTypeOption = typeof dealTypeOptions[number];

export interface Price {
    minPrice?: number;
    maxPrice?: number;
}

export interface FiltersOptions {
    city?: string;
    dealType?: DealTypeOption;
    price?: Price;
    bedrooms?: RoomsOption;
    bathrooms?: RoomsOption;
    homeType?: HomeTypeOption;
}
