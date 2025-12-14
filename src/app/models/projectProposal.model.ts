import { User } from "./user.model"

export interface ProjectProposal {
    proposalId?: number,
    proposalTitle?: string,
    proposalDescription?: string,
    status?: string
    user?: User;
}
