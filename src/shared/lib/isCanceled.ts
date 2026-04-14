export function isCancelled(error: unknown): boolean {
	return error instanceof Error && error.name === 'AbortError'
}
