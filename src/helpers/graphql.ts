export function aoTransactions(wallet: string, cursor?: string) {
	const filter = cursor ? `after:"${cursor}",` : "";

	return `query{
		transactions(
			recipients:["${wallet}"],
			tags:[
				{
					name: "Data-Protocol", 
					values:["ao"]
				},
				{
					name: "Variant", 
					values:["ao.TN.1"]
				},
				{
					name: "Service", 
					values: ["ZoasOracle"]
				},
			],
			first:100, 
			${filter}
			sort:HEIGHT_ASC
		) {
			pageInfo {
				hasNextPage
			}
			edges {
				cursor
				node {
					id
					block {
						timestamp
					}
					tags {
						name
						value
					}
					bundledIn{
						id
					}
				}
			}
		}
	}`
}
