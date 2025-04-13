export interface Player {
    tag: string;
    name: string;
    trophies: number;
    highestTrophies: number;
    expLevel: number;
    expPoints: number;
    isQualifiedFromChampionshipChallenge: boolean;
    club?: {
        tag: string;
        name: string;
    };
    brawlers: Brawler[];
    soloVictories: number;
    duoVictories: number;
    "3vs3Victories": number;
    bestRoboRumbleTime?: number;
    bestTimeAsBigBrawler?: number;
    nameColor: string;
    icon: {
        id: number;
    };
}

export interface Brawler {
    id: number;
    name: string;
    power: number;
    trophies: number;
    highestTrophies: number;
    starPowers: Ability[];
    gadgets: Ability[];
}

export interface Ability {
    id: number;
    name: string;
}