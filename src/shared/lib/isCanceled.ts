import { CanceledError } from 'axios'

export function isCancelled(error: unknown): boolean {
	return error instanceof CanceledError
}
