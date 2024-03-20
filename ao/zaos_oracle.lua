local zoas_oracle_wallet = "m6W6wreOSejTb2WRHoALM6M7mw3H8D2KmFVBYC1l0O0"

Handlers.add(
	"get",
	Handlers.utils.hasMatchingTag("Action", "GetData"),
	function(msg)
		local from = msg.From
		local input = msg.Tags.Input
		ao.send({
				Target = zoas_oracle_wallet,
				Tags = {
						Action = "GetData",
						Service = "ZoasOracle",
						Input = input,
						From = from
				}
		})
		Handlers.utils.reply("Recieved Zaos Oracle input [" .. input .. "]" .. " from [" .. from .. "]")(msg)
	end
)

Send({
	Target = ao.id,
	Tags = {
		Action = "GetData",
		Input = "What is the capital of Spain?"
	}
})