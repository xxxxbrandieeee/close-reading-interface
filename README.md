<p align="center">
  <img src="AI_CR_cover/AI_CR_cover_2.jpg" width="800" alt="Study interface">
</p>

# AI and Close Reading - Interface

This repository contains the interface code for the experiment in the paper *["AI and Close Reading"](https://doi.org/placeholder)* (CHI 2026). The interface was used to study how AI assistance affects participants' interpretive performance and the pleasure they derive from close reading poems.

For trying out the study activity and viewing a summary of the paper, please visit our [project website](https://placeholder).

- Main study data, behavioral data, and analysis code are available at [placeholder](https://placeholder).
- The data dictionary is available at [placeholder](https://placeholder).

If you have any questions, please contact Jiayin Zhi at jzhi@uchicago.edu.

---

## Repository Structure
```
/
├── close-reading/     # Frontend (React + TypeScript)
└── backend/           # Backend (Node.js + Express)
```

## Frontend (`close-reading/`)

### Study Procedure

The interface walks participants through the following pages in order:

| Page | Description |
|------|-------------|
| Page 1 | Online consent |
| Page 2 | Enterting user ID |
| Page 3 | Instructions |
| Page 8 | Demographic questions |
| Page 4 | Initial reading of the poem |
| Page 5 | Main interpretation tasks |
| Page 6 | Subjective experience ratings |

Pages 4–6 repeat for each poem in randomized order (three poems by default). After all poems are completed:

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

### Customization

- **Reading materials and AI interpretations**: Edit `src/pageInfo.ts`
- **Page order or inclusion**: Edit the `pageInfo` array in `src/pageInfo.ts`. The array defines one loop through the per-poem pages; the study repeats this loop once per poem. Comment out any entry to skip that page:

```js
[
    { page4_1 },
    { page5_1 }
    // { page6_1 },  // comment out to skip the post-task subjective experience ratings
]
```

- **AI panel behavior**: Adjust `showAiAnswers` (whether the AI panel appears) and `aiAnswerCount` (number of interpretations shown) in `src/config/projectConfig.ts` to create new configurations beyond the three base ones.
