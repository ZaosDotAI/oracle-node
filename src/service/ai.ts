import { message, createDataItemSigner } from "@permaweb/aoconnect";
import axios, { AxiosError, AxiosResponse } from "axios";
import { getWallet, getWalletAddress } from "../helpers/wallet";


export const processInput = async (item: any) => {
	const processId = item.processId
	const service = item.service
	const action = item.action
	const input = item.input

	const wallet = getWallet()

	try {
		let response: AxiosResponse
		if (service === "ZoasOracle" && action === "GetData") {
			
			response = await axios.post(
				'https://api.openai.com/v1/chat/completions',
				{
					model: "gpt-3.5-turbo",
					messages: [
						{
							"role": "system",
							"content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."
						},
						{
							role: "user",
							content: input
						}
					]
				},
				{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
					}
				}
			);

			const { data, status } = response

			const messageData = {
				process: processId || 'G7GjNVXD0eHI46kp6tSJF5onOEwshfRF6nY9XHgFzLs',
				signer: createDataItemSigner(wallet),
				tags: [{ name: "Action", value: "ZaosAiCall" }, { name: "Model", value: "gpt-3.5-turbo" }, { name: "Status", value: `${status}` }],
				data: data.choices && data.choices.length > 0 ? JSON.stringify(data.choices[0].message.content) : String(data)			
			}

			return messageData
		} 
	}
	catch (error) {
		if (axios.isAxiosError(error)) {
			const res: AxiosError = error;
			const messageData = {
					process: processId || 'G7GjNVXD0eHI46kp6tSJF5onOEwshfRF6nY9XHgFzLs',
					signer: createDataItemSigner(wallet),
					tags: [{ name: "Action", value: "ZaosAiCall" }, { name: "Status", value: `${res.status}` }, {
							name: "Content-Type", value: 'application/json'
					}],
					data: JSON.stringify(res.message)
			};
			return messageData
		}
		throw error
	}	
};