# Zaos AI Oracle

## User Instructions

1. Install aos
```
npm i -g https://get_ao.g8way.io
```

2. Create a new process
```
aos 
```

3. Call the Zaos AI Oracle 
```
Send({
	Target = G7GjNVXD0eHI46kp6tSJF5onOEwshfRF6nY9XHgFzLs,
	Tags = {
		Action = "GetData",
		Input = "What is the capital of France?"
	}
})
```

3. Check your inbox
```
Inbox[#Inbox].Data
```

You should imediately see notification of a recieved request: `Recieved Zaos Oracle input [What is the capital of France?] from [YOUR AO.ID]`

After a few seconds you should receive the AI response, e.g.: `A city charming and sublime, Where love and art intertwine, Paris, the capital divine, Of France, where dreams align.`

## Developers

### Add API Key
```
echo "OPENAI_API_KEY=[YOUR-API-KEY]" > .env
```

### Connect your wallet
Add your Arweave `wallet.json` file in the source directory.

### Install
```
yarn 
```

### Run
```
yarn run start
```
