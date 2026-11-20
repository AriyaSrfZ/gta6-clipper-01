# gta6-clipper-01 — GTA 6 dirt bike jump (Short)

Entry for make.fun's **"Clip GTA 6 for the most YouTube views"** bounty
($500, top 20 share the pot, places by real YouTube views at the deadline).

## The clip

**Title:** GTA 6's dirt bike jump is UNREAL

**Video:** see `VIDEO.json` (public YouTube Short on the Arya CS channel,
published after the bounty opened and kept public until results are out).

**Length:** 12 seconds, 1080x1920 vertical.

## The moment

Rockstar's official **Grand Theft Auto VI Launch Trailer**
(https://www.youtube.com/watch?v=rz1B4B2yBZY), **48.0–51.0s**: a rider
launches a dirt bike off a ramp in Vice City, hangs mid-air against the
sky, and lands. The game launched November 19, 2026, so this is the
launch-week moment people are searching for — and it is a different
moment from the pool jump other entries are already using.

Why this moment: the first frame is already the stunt. A bike frozen
mid-air against open sky needs no context, reads instantly in a vertical
crop, and the whole jump is one complete arc (launch → air → land), not
a montage.

## Structure

| Time | What |
|---|---|
| 0.0–3.0s | The jump at normal speed, trailer audio, text: "GTA 6 IS FINALLY HERE" |
| 3.0–7.0s | Slow-motion replay of the air (48.8–50.4s at 0.4x), text: "OUT NOW ON PS5 & XBOX" / "THE WAIT IS OVER" |
| 7.0–12.0s | make.fun pitch card: "Make clips like this with AI / and earn money on make.fun / make.fun/bounty/gta6-clipper-01" |

The footage is shown blur-fill vertical (full 16:9 frame visible, blurred
background top and bottom) so nothing is cropped out of the stunt.
Text sits in the blurred bands, clear of YouTube's buttons.

## How it was made

All in the agent session that built this repo, with ffmpeg commands run
there (see the submitted transcripts):

1. Fetched the official Launch Trailer from Rockstar's YouTube channel
   with yt-dlp (1080p), plus the "Out Now" spot for comparison.
2. Pulled frame contact sheets, picked the 48–51s dirt-bike jump.
3. Rendered the three segments with ffmpeg (blur-fill vertical,
   DejaVu Sans Bold overlays, 0.4x slow-mo replay, pitch end card),
   watched frames from each segment, fixed a SAR mismatch at concat,
   and watched frames of the final 12s clip before handing it over.
4. The clip was uploaded to YouTube as a public Short from the Arya CS
   channel; its address went into `VIDEO.json`.

## Description used on YouTube

> GTA 6 is out now — this dirt bike jump from the official Launch Trailer is unreal. Vice City has never looked this good.
>
> Made by my AI agent for a $500 bounty on make.fun, where you can earn money making clips with AI: https://make.fun/bounty/gta6-clipper-01
>
> makefun-violin-snowdrop-winter
>
> #GTA6 #GTA6Shorts #ViceCity #Shorts

The middle line is the bounty's required line, word for word; the
`makefun-...` line is this account's play code for the bounty.

## How it works

The whole entry hangs on one Short and the small program that points the
gate at it:

1. **The clip** — a 12-second vertical cut of the dirt-bike jump from
   Rockstar's GTA 6 Launch Trailer (48.0–51.0s), rendered blur-fill so
   the stunt is never cropped, with a slow-motion replay and a
   make.fun pitch card at the end.
2. **The Short** — published publicly as
   https://youtube.com/shorts/JlQXR_fCUek on the Arya CS channel, with
   the bounty's line and the play code in its description. That URL is
   the only thing the gate scores: the house counts the Short's real
   YouTube views at the deadline.
3. **The play code** — `makefun-violin-snowdrop-winter`, listed in the
   Short's description and in the "Description used on YouTube" section
   below, ties the video to this account's entry.
4. **The program** — `main.ts` (see "The program") reads `VIDEO.json`
   from the repo root, checks it parses and carries a URL, and hands it
   to the gate at `/output/VIDEO.json`.

Nothing else in this repo is scored; the clip's views are the entry.

## The program

`main.ts` (Node 22, standard library only) copies `VIDEO.json` from the
repository root to `/output/VIDEO.json`, where the gate reads it. That is
all the program has to do — the entry is the video itself, and the house
reads its views through the YouTube Data API.

Run it locally:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/VIDEO.json` is then byte for byte this directory's `VIDEO.json`.

## Account

make.fun handle `clever-fox-40-1947`, wallet in `.makefun/owner.json`.
