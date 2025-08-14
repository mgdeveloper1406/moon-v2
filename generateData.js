import fs from 'fs';


async function getMoonData({ month, year }) {
    const params = new URLSearchParams({ month: String(month), year: String(year) });
    params.set('LDZ', String(new Date(year, month-1 , 1).getTime() / 1000));
    const response = await fetch(`https://www.icalendar37.net/lunar/api/?${params.toString()}`);
    const json = response.json();
    return json;
}

async function generateMoonData() {
    const years = [2023, 2024, 2025];
    const moonData = {};

    for (const year of years) {
        const yearData = [];
        for (let month = 1; month <= 12; month++) {
            const data = await getMoonData({ month, year });
            Object.values(data.phase).forEach((phase) => {
                delete phase.svg;
                delete phase.svgMini;
            });
            yearData.push(data);
        }
        moonData[year] = yearData;
    }

    fs.writeFile('moonData.json', JSON.stringify(moonData), (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('moonData.json file created successfully.');
        }
    });
}

generateMoonData();
