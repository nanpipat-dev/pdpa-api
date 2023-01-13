export type CookiesType = {
	name: string
	path: string
	expires: number
	value: string
	domain: string
	description: string
}

export type CompanyRequest = {
	companyName: string
	companyEmail: string
	companyType: string
	companySize: string
	cookies?: CookiesType[]
}
