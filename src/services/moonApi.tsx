

// export async function getMoonData({ month, year } : { month: number, year: number }) {
//     const params = new URLSearchParams({ month: String(month), year: String(year) });

//     params.set('LDZ', String(new Date(year, month-1 , 1).getTime() / 1000));

//     const response = await fetch(`https://www.icalendar37.net/lunar/api/?${params.toString()}`);

//     const json = response.json();

//     return json;
// }

import moonData from "@/services/moonData.json"
import type { MoonData } from "@/utils/types.utils";

export async function getMoonData({ month, year } : { month: number, year: number }) {
    return (moonData[String(year) as '2023' | '2024' | '2025'] as MoonData[])[month - 1];
}
