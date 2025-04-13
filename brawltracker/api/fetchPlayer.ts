import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios, { AxiosError } from 'axios';
import { Player, Brawler, Ability } from '../src/types/player';

const API_KEY = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImMzYmZhMDU1LTYyNGMtNDc5Yi04YmQ3LTZhMDA0YTE5YTgxZiIsImlhdCI6MTczNjg3MDI4NSwic3ViIjoiZGV2ZWxvcGVyLzVmZDYzNzk4LWIwNmEtZDY3Zi01MzJhLWI0ZWZlYzFiOWMwOSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTA0LjI4LjIyOC4xMDgiLCIxMDQuMjguMjI4LjEwNyIsIjEwNC4yOC4yMjguMTA5IiwiMTA0LjI4LjIyOC4xMDYiLCIxMDQuMjguMjI4LjExMCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.iH-pMp4Xpnf-SP-7-bdxBgZ1qc0qLHHzypoxaflB-lFvSyAVBFqDKxJYatdiEGSYCLetXg28SJGCFHgBqaHYWA';
const BASE_URL = 'https://api.brawlstars.com/v1';

export default async function fetchPlayer(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed. Use GET.' });
    }

    const { playerTag } = req.query;

    if (!playerTag || typeof playerTag !== 'string') {
        return res.status(400).json({ error: 'Player tag is required and should be a string.' });
    }

    const sanitizedTag = `%23${playerTag}`;
    const url = `${BASE_URL}/players/${sanitizedTag}`;

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: API_KEY,
                'Content-Type': 'application/json',
            },
        });

        const rawData: any = response.data;

        const processedData: Player = {
            tag: rawData.tag,
            name: rawData.name,
            trophies: rawData.trophies,
            highestTrophies: rawData.highestTrophies,
            expLevel: rawData.expLevel,
            expPoints: rawData.expPoints,
            isQualifiedFromChampionshipChallenge: rawData.isQualifiedFromChampionshipChallenge,
            soloVictories: rawData.soloVictories,
            duoVictories: rawData.duoVictories,
            "3vs3Victories": rawData["3vs3Victories"],
            bestRoboRumbleTime: rawData.bestRoboRumbleTime,
            bestTimeAsBigBrawler: rawData.bestTimeAsBigBrawler,
            nameColor: rawData.nameColor,
            icon: {id: rawData.icon.id},
            club: rawData.club
                ? {
                      tag: rawData.club.tag,
                      name: rawData.club.name,
                  }
                : undefined,
            brawlers: rawData.brawlers.map((brawler: any): Brawler => ({
                id: brawler.id,
                name: brawler.name,
                power: brawler.power,
                trophies: brawler.trophies,
                highestTrophies: brawler.highestTrophies,
                starPowers: brawler.starPowers.map((sp: any): Ability => ({
                    id: sp.id,
                    name: sp.name,
                })),
                gadgets: brawler.gadgets.map((gadget: any): Ability => ({
                    id: gadget.id,
                    name: gadget.name,
                })),
            })),
        };

        return res.status(200).json(processedData);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.error(
                `Ошибка API: ${axiosError.response?.status} - ${
                    axiosError.response?.data || axiosError.message
                }`
            );
            return res
                .status(axiosError.response?.status || 500)
                .json({ error: axiosError.response?.data || 'Internal Server Error' });
        } else {
            console.error('Неизвестная ошибка:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
