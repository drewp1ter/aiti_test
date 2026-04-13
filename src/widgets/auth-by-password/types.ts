import { type User } from "@/entities/user/types"

export namespace DTO {
	export namespace Request {
		export interface Login {
			username: string
			password: string
			expiresInMins?: number
		}
	}

	export namespace Response {
		export type Login = User
	}
}
