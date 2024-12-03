export const BASE_API_URL = "https://dogapi.dog/api/v2";
export const BREEDS_URL = `${BASE_API_URL}/breeds`;
export const FACTS_URL = `${BASE_API_URL}/facts`;
export const GROUPS_URL = `${BASE_API_URL}/groups`;

export const BASE_DOGS_CEO_URL = "https://dog.ceo/api";
export const RANDOM_DOG_IMAGE_URL = `${BASE_DOGS_CEO_URL}/breeds/image/random`;
export const ALL_IMAGE_BREEDS = `${BASE_DOGS_CEO_URL}/breeds/list/all`
export const getRandomImageByBreedUrl = (breed?: string) => {
  return `${BASE_DOGS_CEO_URL}/breed/${breed}/images/random`;
}

export type Status = 'error' | 'loading' | 'ok';

/**
 * ------ Base types --------
 */

interface BaseDogsAPIData {
  id: string,
  type: 'breed' | 'fact' | 'group',
  relationships?: object,
}

interface BaseDogsAPIResponse {
  links?: {
    self: string,
    current?: string,
    next?: string,
    last?: string,
  }
}

/**
 * ------ Data types --------
 */

export interface BreedsApiData extends BaseDogsAPIData {
  attributes: {
    name: string,
    description: string,
    life: {
      max: number,
      min: number,
    }
    male_weight: {
      max: number,
      min: number,
    },
    female_weight: {
      max: number,
      min: number,
    }
    hypoallergenic: boolean;
  }
}

export interface FactsAPIData extends BaseDogsAPIData {
  attributes: {
    body: string,
  }
}

export interface GroupsAPIData extends BaseDogsAPIData {
  attributes: {
    name: string,
  }
}

/**
 * ------ Response types --------
 */
export interface FetchAllBreedsResponse extends BaseDogsAPIResponse {
  data: BreedsApiData[];
}

export interface FetchBreedResponse {
  data: BreedsApiData;
}

export interface FetchAllFactsResponse extends BaseDogsAPIResponse {
  data: FactsAPIData[];
}

export interface FetchAllGroupsResponse {
  data: GroupsAPIData[];
}

export interface FetchGroupResponse {
  data: GroupsAPIData;
}
