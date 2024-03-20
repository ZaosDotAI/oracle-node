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
.editor
Send({
	Target = G7GjNVXD0eHI46kp6tSJF5onOEwshfRF6nY9XHgFzLs,
	Tags = {
		Action = "GetData",
		Input = "What is the capital of France?"
	}
})
.done
```

3. Check your inbox
```
Inbox[#Inbox].Data
```

You should imediately see notification of a recieved request: `Recieved Zaos Oracle input [What is the capital of France?] from [YOUR AO.ID]`

After a few seconds you should receive the AI response, e.g.: `A city charming and sublime, Where love and art intertwine, Paris, the capital divine, Of France, where dreams align.`

## AO Developers

1. Create a new process
```
aos oracle
```

2. Load the oracle contract
```
.load zaos_oracle.lua
```

3. Check your inbox
```
Inbox[#Inbox].Data
```

You should imediately see notification of a recieved request: `Recieved Zaos Oracle input [What is the capital of France?] from [YOUR AO.ID]`

After a few seconds you should receive the AI response, e.g.: `A city charming and sublime, Where love and art intertwine, Paris, the capital divine, Of France, where dreams align.`


## Node Operators

1. Add API Key
```
echo "OPENAI_API_KEY=[YOUR-API-KEY]" > .env
```

2. Connect your wallet
Add your Arweave `wallet.json` file in the source directory.

3. Install
```
yarn 
```

4. Run
```
yarn run start
```
