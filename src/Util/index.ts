import { CountryPrimaryDetailsProps as CountryProps } from '../Types/types'

export const getCountryName = (country: CountryProps): string => (
     country?.name
)

export const getCountryCapital = (country: CountryProps): string => (
     country?.capital || "No Capital"
)

export const getCountryFlag = (country: CountryProps): string => (
     country.flag
)

export const getCountryPopulation = (country: CountryProps): number => (
     country.population
)

export const getCountryRegion = (country: CountryProps): string => (
     country.region
)

export const getParams = (region: string): string => (
     region !== 'all' ? `region/${region}` : `${region}`
)

export const isNotDefined = (data: Object | undefined) => (
     data === undefined
)