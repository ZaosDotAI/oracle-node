import { message, createDataItemSigner } from "@permaweb/aoconnect";
import axios, { AxiosError, AxiosResponse } from "axios";
import { aoTransactions } from "../helpers/graphql";
import { getWallet, getWalletAddress } from "../helpers/wallet";
import { processInput } from "./ai";
import { getCursorAndTimestamp, setCursorAndTimestamp } from "../helpers/data";


export const cronData = async () => {
	try {
		const cursorAndTimestamp = await getCursorAndTimestamp()
		const previousCursor = cursorAndTimestamp ? cursorAndTimestamp.cursor : ""
		const previousTimestamp = cursorAndTimestamp ? cursorAndTimestamp.timestamp : 0
		let nextCursor: string = null
		let nextTimestamp: number = null

		const walletAddress = getWalletAddress()
		
		// Get all transactions
		let res = await axios.post("https://arweave.net/graphql", {
			query: aoTransactions(walletAddress, previousCursor)
		})

		// Get all edges / page info
		let {pageInfo, edges} = res.data.data.transactions
		while (pageInfo.hasNextPage) {
			nextCursor = edges[edges.length - 1]?.cursor
			res = await axios.post("https://arweave.net/graphql", {
				query: aoTransactions(walletAddress, nextCursor)
			})
			pageInfo = res.data.data.transactions.pageInfo
			edges = [...edges, ...res.data.data.transactions.edges]
		}

		// Remove duplicates after timestamp
		const uniqueNodeIds = new Set(edges.map((e: any) => e.node.id))
		const uniqueEdgesAfterTimestamp = edges.filter((e: any) => {
			if (uniqueNodeIds.has(e.node.id) && e.node.block !== null && e.node.block?.timestamp > previousTimestamp) {
				// Unique / new id, keep
				return true 
			} else {
				// Duplicate / historic id, remove
				uniqueNodeIds.delete(e)
				return false
			}
		})

		// Extract transaction data
		const dataItems = await Promise.all(uniqueEdgesAfterTimestamp?.map(async (e: any) => {
			const tags = e.node.tags.reduce((result: any, filter: any) => {
				result[filter.name] = filter.value;
				return result;
		},{});
			return {
				processId: tags["From"],
				service: tags["Service"],
				action: tags["Action"],
				input: tags["Input"],
				from: tags["From"] || "G7GjNVXD0eHI46kp6tSJF5onOEwshfRF6nY9XHgFzLs", // TODO: Change wallet or add initial cursor value resolve bad data issue
			}
		}));

		// Create messages
		const createMessages = async (items: any[]) => {
			let messages: any[] = []
			for (let i = 0; i < items.length; i++) {
				messages.push(await processInput(items[i]))
				}
			return messages
		}

		// Process messages
		const messages: any[] = await createMessages(dataItems)		

		// Send messages
		for (let i = 0; i < messages.length; i++) {
			console.log("Sending message", messages[i])
			await message(messages[i])
				.then(console.log)
  			.catch(console.error);
		}

		// Get last timestamp & set db data
		nextTimestamp = uniqueEdgesAfterTimestamp[uniqueEdgesAfterTimestamp.length - 1]?.node.block.timestamp

		if (nextTimestamp && (nextCursor !== previousCursor || nextCursor == null)) {
			await setCursorAndTimestamp({ 
				cursor: nextCursor,
				timestamp: nextTimestamp
			})
		}

	} catch (error) {
		throw new Error(error);
	}
}
