# LightOff Ghana

A mobile-first Ghana load management checker built with Next.js, TypeScript, Tailwind CSS, and Fuse.js.

## What it does

Users search their town, area, estate, junction, school, or landmark and quickly see:

- Matched place
- Region
- Group A, B, or C
- Current affected window
- Next affected window

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3011

## Deploy to Vercel

1. Push this folder to GitHub.
2. Go to Vercel.
3. Import the GitHub repo.
4. Framework preset: Next.js.
5. Build command: `npm run build`.
6. Output directory: leave default.
7. Deploy.

## Data files

### `/data/areas.json`

This stores searchable area data.

```json
[
  {
    "name": "Madina",
    "region": "Accra",
    "group": "A",
    "aliases": ["Madina Market", "Madina Estate", "PRESEC", "UPSA"]
  }
]
```

Add the full cleaned PDF data here.

### `/data/timetable.json`

This stores the group affected per date and time block.

```json
{
  "2026-04-25": {
    "00:00-06:00": "A",
    "06:00-12:00": "A",
    "12:00-18:00": "B",
    "18:00-00:00": "C"
  }
}
```

## Production TODO

- Clean and import the full PDF area list.
- Add real report submission.
- Add admin page for updating schedules.
- Add source/version label for each schedule.
- Add analytics for most searched areas.
- Consider PostgreSQL when data changes frequently.
