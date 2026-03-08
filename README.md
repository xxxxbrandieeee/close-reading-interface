<p align="left">
  <img src="AI_CR_cover/AI_CR_cover_3.jpg" width="600" alt="Study interface">
</p>

# Interface

This repository contains the interface code for the experiment in the paper *[What Does AI Do for Cultural Interpretation? A Randomized Experiment on Close Reading Poems with Exposure to AI Interpretation](https://doi.org/10.1145/3772318.3791727)*. The interface was used to study how AI assistance affects participants' interpretive performance and the pleasure they derive from close reading poems. The interface is designed to be reusable for human-centered experiments studying AI's impact on literary interpretation and other reading and writing tasks. Users can select from three base configurations (no AI assistance, single AI interpretation, and multiple AI interpretations), which can be used individually or randomly assigned. The number of reading materials, the pages included in each loop, and the AI panel behavior can be configured.

For trying out the study activity and a summary of the paper, please visit our [project website](https://closereading-ai.app).

- Main study data, behavioral data, and analysis code are available at [data and analysis](https://placeholder).
- The data dictionary is available at [data dictionary](https://placeholder).

If you have any questions, please contact Jiayin Zhi at jzhi@uchicago.edu.

---

## Repository Structure
```
/
├── close-reading/     # Frontend (React + TypeScript)
└── backend/           # Backend (Node.js + Express)
```

---

## Frontend (`close-reading/`)

### Study Procedure (Pre-set)

The following is the pre-set procedure used in our study.

| Page | Description |
|------|-------------|
| Page 1 | Online consent |
| Page 2 | Entering user ID |
| Page 3 | Instructions |
| Page 8 | Demographic questions |
| Page 4 | Initial reading of the poem |
| Page 5 | Main interpretation tasks |
| Page 6 | Subjective experience ratings |

Pages 4–6 repeat for each poem in randomized order (three poems by default). Note that Page 8 (demographic questions) appears before the poem loop in our study, but can be moved to any position in the page order. After all poems are completed:

| Page | Description |
|------|-------------|
| Page 7 | Debrief and feedback |
| Page 9 | Ending message for completion |
| Page 10 | Ending message for not providing consent |

### Configurations

The interface has three base configurations, differing only in the AI panel on Page 5 (the interpretation tasks page):

| Variant | AI Panel | AI Interpretations Shown |
|---------|----------|--------------------------|
| `project2-type1` | Visible | 1 (AI-Single) |
| `project2-type2` | Hidden | 0 (Control) |
| `project2-type3` | Visible | 3 (AI-Multiple) |

To use a specific configuration, edit `src/config/projectConfig.ts`:
```ts
export let CURRENT_PROJECT_VARIANT: ProjectVariant = 'project2-type1';
```

Setting the variant to `project2-random` randomly assigns one of the three configurations per participant at session start. The assignment is stored in `sessionStorage` and remains consistent within the same browser tab; a new assignment is made when the tab is closed and reopened:
```ts
export let CURRENT_PROJECT_VARIANT: ProjectVariant = 'project2-random';
```

To enable sending participant responses to the backend, set `IS_COLLECT_DATA` to `true` in `src/config/projectConfig.ts`. Set it to `false` to test the frontend without collecting any data:
```ts
export const IS_COLLECT_DATA = false;
```

### Customization

The interface supports customization: selecting one of the three pre-built AI configurations or defining a new one, adjusting the number of poems, controlling which pages are included in each loop, and replacing the reading materials and AI interpretations.

- **Reading materials and AI interpretations**: Edit `src/pageInfo.ts`.
- **Page order or inclusion**: Edit the `pageInfo` array in `src/pageInfo.ts`. The array defines one loop through the per-poem pages; the study repeats this loop once per poem. Comment out any entry to skip that page:
```js
[
    { page4_1 },
    { page5_1 },
    // { page6_1 },  // comment out to skip subjective experience ratings
]
```

- **Number of poems**: Each inner array in `src/pageInfo.ts` corresponds to one poem. Remove an inner array to reduce the number of poems. The order is randomized across participants by default.

- **AI panel behavior**: Adjust `showAiAnswers` (whether the AI panel appears) and `aiAnswerCount` (number of interpretations shown) in `src/config/projectConfig.ts` to create new configurations beyond the three base ones.

---

## Backend (`backend/`)

### Endpoint

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/response` | POST | Saves participant response data as a timestamped JSON file |

### Data Storage

Participant responses are saved as timestamped JSON files under `backend/`, in subdirectories named after the configuration variant (e.g., `project2-type1/`, `project2-type2/`, `project2-type3/`). This applies both when running locally and on a server. These files are the raw input for the data processing pipeline — see the [data dictionary](https://placeholder).

---

## Setup and Deployment

### Frontend

**Local machine**
```bash
cd close-reading
npm install
npm run dev
# Visit http://localhost:3013
```

**Server**
```bash
cd close-reading
npm install
npm run build
```

Upload the generated `dist/` folder to your server and configure Nginx to serve it and bind your domain.

### Backend

**Local machine**
```bash
cd backend
npm install
npm run start
# You should see: Server running on port 4001
```

**Server**

The server requires a Node.js environment. Upload `server.js` and `package.json` to your server, then:
```bash
cd backend
npm install
npm run pm2
```

This starts the server with PM2 for process management, auto-restart, and log rotation. Logs are written to `logs/out.log` and `logs/err.log`. Note that some files in the `backend/` directory are generated during local development and can be ignored when uploading to the server.

---

## Citation

If you use this interface, please kindly cite:
```bibtex
@inproceedings{zhi2026what,
  author = {Zhi, Jiayin and Long, Hoyt and So, Richard Jean and Lee, Mina},
  title = {What Does AI Do for Cultural Interpretation? A Randomized Experiment on Close Reading Poems with Exposure to AI Interpretation},
  booktitle = {Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems},
  series = {CHI '26},
  year = {2026},
  location = {Barcelona, Spain},
  publisher = {ACM},
  address = {New York, NY, USA},
  pages = {1--18},
  doi = {10.1145/3772318.3791727}
}
```
