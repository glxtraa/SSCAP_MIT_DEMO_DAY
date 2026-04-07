# HydroBASINS Data Integration Guide

This document explains how HydroBASINS and mapping are configured and utilized within the Blue Lifeline project.

## Overview

We use **HydroBASINS** (specifically level 6, L6) to map out hydrological basins and visually represent water risk. This is combined with the Aqueduct Water Risk Framework to determine risk levels for schools in different regions. 

## Where is the Data?

- Basin data is stored in **GeoJSON** format at `src/lib/basins.geojson.json`.
- Mapping components and logic are primarily located in `src/components/MonitoringMap.tsx`.

## How the Map Works

1. **Libraries**: We use `leaflet` and `react-leaflet` to render maps. Since Next.js uses SSR, these components are loaded dynamically with `ssr: false` to avoid server-side dependency issues with the `window` object.
2. **Tiles**: We use Carto Dark basemaps (`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`) for a premium system aesthetic.
3. **GeoJSON Rendering**: The `src/lib/basins.geojson.json` file is rendered as a vector overlay.

## Understanding the Basin Properties

Each feature in the GeoJSON has `properties` that dictate its behavior on the map. The most important ones are:
- `NAME`: The human-readable name of the basin.
- `HYBAS_ID`: The unique HydroBASINS ID.
- `AQUEDUCT_V4`: The water risk score associated with the basin based on the World Resources Institute's Aqueduct Water Risk Atlas.

### Risk Visualization

The map extracts the `AQUEDUCT_V4` risk score (values 0-4) and colors the basin layer accordingly:
- **Level 4** (`#ef4444`): Extremely High Risk
- **Level 3** (`#f97316`): High Risk
- **Level 2** (`#eab308`): Medium-High Risk
- **Level 1** (`#84cc16`): Low-Medium Risk
- **Level 0** (`#00B0FF`): Standard / No Risk

## Adding or Updating Basin Data

If you need to update spatial data or add new basins:
1. Ensure your shapefiles or GeoJSON includes `NAME`, `HYBAS_ID`, and `AQUEDUCT_V4` columns.
2. If working with `.shp` files, convert them to `.geojson`.
3. Replace or append the data in `src/lib/basins.geojson.json`.
4. Validate that the new map features load correctly on the front-end by checking the Monitoring Map.
