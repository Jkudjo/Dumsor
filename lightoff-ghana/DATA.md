# Data Structure Notes

## Area object

| Field | Type | Purpose |
|---|---|---|
| name | string | Main searchable place name |
| region | string | One of Accra, Tema, Volta, Ashanti, Eastern, Central, Western |
| group | string | A, B, or C |
| aliases | string[] | Nearby landmarks, schools, markets, estates, alternative names |

## Search behavior

Fuse.js searches across:

- `name`
- `region`
- `aliases`

This makes searches forgiving when users type nearby landmarks instead of exact town names.

## How to add full PDF data

1. Extract the PDF into text.
2. Split by group: A, B, C.
3. Split by region.
4. Turn each major town or landmark into an area object.
5. Put related nearby places under `aliases`.
6. Keep each object small enough to search cleanly.

Bad format:

```json
{
  "name": "Madina, PRESEC, UPSA, Social Welfare, TV Africa, Danafco"
}
```

Better format:

```json
{
  "name": "Madina",
  "region": "Accra",
  "group": "A",
  "aliases": ["PRESEC", "UPSA", "Social Welfare", "TV Africa", "Danafco"]
}
```
