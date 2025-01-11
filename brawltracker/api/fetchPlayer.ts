import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios, { AxiosError } from 'axios';
import { Player, Brawler, Ability } from '../src/types/player';

const API_KEY = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImY1ZDNmZmViLTZmYWEtNGM0YS1iM2M3LTg3ZWVkMDlmN2Q4ZiIsImlhdCI6MTczNjM0NzY0MCwic3ViIjoiZGV2ZWxvcGVyLzVmZDYzNzk4LWIwNmEtZDY3Zi01MzJhLWI0ZWZlYzFiOWMwOSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTA0LjI4LjIyOC4xMDgiXSwidHlwZSI6ImNsaWVudCJ9XX0.voaLh7CzI1ZhNZjlDsy4apxWNSnPvEKT6Y-IuV2eWd2rM_57IrNSfgVMwBrXiQn0WWhA8fjSuj8oWJvvCECTuQ';
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
