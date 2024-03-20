import { readFileSync } from 'fs';
import path from 'path';

export function getWallet() {
	return JSON.parse(
		readFileSync(path.join(__dirname, "../../wallet.json")).toString()
	);
}

export function getWalletAddress() {
    return "m6W6wreOSejTb2WRHoALM6M7mw3H8D2KmFVBYC1l0O0"
}