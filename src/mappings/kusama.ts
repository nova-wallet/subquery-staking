import {SubstrateEvent} from "@subql/types";
import {handleNewEra} from "./common";
import {RelaychainRewardCalculator} from "./rewards/Relaychain";
import {ValidatorEraInfoDataSource} from "./era/ValidatorEraInfoDataSource";
import {Codec} from "@polkadot/types/types";
import {INumber} from "@polkadot/types-codec/types/interfaces";
import {handleRelaychainStakingReward, handleRelaychainStakingSlash} from "./rewards/history/relaychain";

const KUSAMA_GENESIS = "0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe"
const STAKING_TYPE = "relaychain"

export async function handleKusamaNewEra(_: SubstrateEvent): Promise<void> {
    let validatorEraInfoDataSource = new ValidatorEraInfoDataSource();

    await handleNewEra(
        validatorEraInfoDataSource,
        await RelaychainRewardCalculator(validatorEraInfoDataSource),
        KUSAMA_GENESIS,
        STAKING_TYPE
    )
}

export async function handleKusamaStakingReward(
    event: SubstrateEvent<[accountId: Codec, reward: INumber]>,
): Promise<void> {
    await handleRelaychainStakingReward(event, KUSAMA_GENESIS, STAKING_TYPE)
}

export async function handleKusamaStakingSlash(
    event: SubstrateEvent<[account: Codec, slash: INumber]>,
): Promise<void> {
    await handleRelaychainStakingSlash(event, KUSAMA_GENESIS, STAKING_TYPE)
}