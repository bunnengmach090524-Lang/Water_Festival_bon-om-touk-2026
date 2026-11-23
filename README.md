# 🌕 Bon Om Touk 2026 · បុណ្យអុំទូក · Fête de l'Eau · 柬埔寨水节

**Live:** https://bon-om-touk-2026.vercel.app

[ខ្មែរ](#-ខ្មែរ) · [English](#-english) · [Français](#-français) · [中文](#-中文)

---

## 🇰🇭 ខ្មែរ

គេហទំព័រ **បុណ្យអុំទូក បណ្តែតប្រទីប សំពះព្រះខែ និងអកអំបុក ២០២៦** (២៣-២៥ វិច្ឆិកា) ដែលណែនាំអំពីប្រពៃណីទាំងបួន កាលវិភាគ និងកន្លែងដើរលេងនៅកម្ពុជា (ភ្នំពេញ សៀមរាប កំពត និងខេត្តផ្សេងៗ)។

### មុខងារ
- ៤ ភាសា៖ ខ្មែរ · English · Français · 中文
- ទម្រង់ងងឹត និងភ្លឺ (Dark / Light)
- ឆាកគំនូរ SVG មានចលនា (ទូកអុំ ប្រទីប សំពះព្រះខែ អកអំបុក កាំជ្រួច)
- ទិដ្ឋភាព 3D ប្រទីបអណ្តែត (three.js)
- ការ៉ាប្រពៃណី 3D flip, ការ៉ាកន្លែងដើរលេងមានតម្រង និងស្វែងរក
- វិចិត្រសាលរូប/វីដេអូ (Cloudinary) ជាមួយ Lightbox
- ប៊ូតុងតន្ត្រី (ទុកសម្រាប់ដាក់ចម្រៀងក្រោយ)
- ទំព័រ Dashboard ស្ថិតិអ្នកចូលមើល (GoatCounter) គ្មាន Login
- សមស្របគ្រប់ឧបករណ៍ គ្មាន Backend

### របៀបដំណើរការ
```bash
npm install
cp .env.example .env     # រួចបំពេញតម្លៃ
npm run dev              # http://localhost:5173
npm run build            # លទ្ធផលក្នុង dist/
```

### អថេរបរិស្ថាន (`.env`)
| ឈ្មោះ | ពិពណ៌នា |
|---|---|
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloud name របស់ Cloudinary (ឈ្មោះសុទ្ធ) |
| `VITE_GOATCOUNTER_CODE` | code របស់ GoatCounter (ឧ. `bunneng`) |

⚠️ **កុំដាក់ API Secret** (`CLOUDINARY_URL`) ក្នុង Vercel ឬ GitHub។ គេហទំព័រនេះប្រើតែ Cloud name។

### Deploy លើ Vercel
១. Push កូដទៅ GitHub ២. Vercel → Add New → Project → Import ៣. បន្ថែម Environment Variables ខាងលើ ៤. Deploy

### បន្ថែមរូបភាព
Upload ទៅ Cloudinary ក្នុងថត `bon-om-touk/` រួចដាក់ Public ID ក្នុង `src/data/media.js` និង `src/data/destinations.js`។ មើលបញ្ជីក្នុង `IMAGE_CHECKLIST.md`។

### តាមដានអ្នកចុចតំណ
ចែកតំណដូច `?ref=facebook`, `?ref=telegram`, `?ref=tiktok` ហើយមើលស្ថិតិក្នុងទំព័រ `/#/dashboard`។

### ចំណាំ
- កាលវិភាគ និងកម្មវិធីអាចផ្លាស់ប្តូរ សូមផ្ទៀងផ្ទាត់ជាមួយប្រកាសផ្លូវការ។
- រូបភាព វីដេអូ និងតន្ត្រី ជាកម្មសិទ្ធិរបស់ម្ចាស់ដើម។ សូមប្រើតែអ្វីដែលមានសិទ្ធិ។

---

## 🇬🇧 English

A website for **Bon Om Touk 2026** (Cambodia's Water Festival, 23–25 November): the four traditions (Ok Ambok, boat racing, illuminated floating boats, moon salutation), the schedule, and places to visit across Cambodia (Phnom Penh, Siem Reap, Kampot and more).

### Features
- 4 languages: Khmer · English · Français · 中文
- Dark / Light theme
- Animated original SVG backdrop scenes
- Lightweight 3D floating-lantern hero (three.js)
- 3D flip tradition cards, filterable and searchable destination cards
- Gallery with Lightbox, images/videos served by Cloudinary
- Music button (ready for a track to be added later)
- Public, login-free visitor dashboard (GoatCounter)
- Fully responsive, static, no backend

### Getting started
```bash
npm install
cp .env.example .env     # then fill in the values
npm run dev              # http://localhost:5173
npm run build            # output in dist/
```

### Environment variables
| Name | Description |
|---|---|
| `VITE_CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name (plain name only) |
| `VITE_GOATCOUNTER_CODE` | Your GoatCounter code (e.g. `bunneng`) |

⚠️ **Never add your API secret** (`CLOUDINARY_URL`) to Vercel or GitHub. This site only needs the cloud name.

### Deploy on Vercel
1. Push to GitHub 2. Vercel → Add New → Project → Import 3. Add the environment variables above 4. Deploy

### Adding media
Upload to Cloudinary under `bon-om-touk/`, then set the public IDs in `src/data/media.js` and `src/data/destinations.js`. See `IMAGE_CHECKLIST.md`.

### Tracking campaign links
Share links like `?ref=facebook`, `?ref=telegram`, `?ref=tiktok` and view stats on `/#/dashboard`.

### Notes
- Schedules and events may change; confirm with official announcements.
- Photos, videos and music belong to their owners. Use only what you have rights to.

---

## 🇫🇷 Français

Un site web consacré à la **Fête de l'Eau 2026 (Bon Om Touk)**, du 23 au 25 novembre au Cambodge : les quatre traditions (ok ambok, courses de pirogues, bateaux lumineux flottants, salutation à la lune), le programme et des lieux à visiter (Phnom Penh, Siem Reap, Kampot, etc.).

### Fonctionnalités
- 4 langues : khmer · English · Français · 中文
- Thème sombre / clair
- Décors SVG originaux animés
- Scène 3D légère de lanternes flottantes (three.js)
- Cartes de traditions à retournement 3D, lieux filtrables avec recherche
- Galerie avec Lightbox, médias hébergés sur Cloudinary
- Bouton musique (prêt pour l'ajout d'un morceau)
- Tableau de bord public des visites, sans connexion (GoatCounter)
- Entièrement responsive, statique, sans backend

### Démarrage
```bash
npm install
cp .env.example .env     # puis renseignez les valeurs
npm run dev              # http://localhost:5173
npm run build            # résultat dans dist/
```

### Variables d'environnement
| Nom | Description |
|---|---|
| `VITE_CLOUDINARY_CLOUD_NAME` | Nom de votre cloud Cloudinary (nom seul) |
| `VITE_GOATCOUNTER_CODE` | Code GoatCounter (ex. `bunneng`) |

⚠️ **N'ajoutez jamais votre clé secrète API** (`CLOUDINARY_URL`) sur Vercel ou GitHub. Le site n'a besoin que du nom du cloud.

### Déploiement sur Vercel
1. Poussez le code sur GitHub 2. Vercel → Add New → Project → Import 3. Ajoutez les variables ci-dessus 4. Deploy

### Ajouter des médias
Téléversez dans Cloudinary sous `bon-om-touk/`, puis renseignez les identifiants publics dans `src/data/media.js` et `src/data/destinations.js`. Voir `IMAGE_CHECKLIST.md`.

### Suivi des liens de campagne
Partagez des liens avec `?ref=facebook`, `?ref=telegram`, `?ref=tiktok` et consultez les statistiques sur `/#/dashboard`.

### Remarques
- Les horaires et événements peuvent changer ; vérifiez les annonces officielles.
- Les photos, vidéos et musiques appartiennent à leurs propriétaires. N'utilisez que ce dont vous avez les droits.

---

## 🇨🇳 中文

这是一个介绍 **2026 年柬埔寨水节（Bon Om Touk，11 月 23–25 日）** 的网站：四大传统（阿贡安波克、龙舟赛、水灯、拜月）、节日日程，以及柬埔寨各地的旅游地点（金边、暹粒、贡布等）。

### 功能
- 四种语言：高棉语 · English · Français · 中文
- 深色 / 浅色主题
- 原创 SVG 动画背景场景
- 轻量 3D 漂浮水灯首页场景（three.js）
- 3D 翻转传统卡片，可筛选和搜索的地点卡片
- 图库与灯箱，图片/视频由 Cloudinary 提供
- 音乐按钮（歌曲稍后添加）
- 公开、无需登录的访问统计面板（GoatCounter）
- 完全响应式，纯静态，无后端

### 快速开始
```bash
npm install
cp .env.example .env     # 然后填写数值
npm run dev              # http://localhost:5173
npm run build            # 输出到 dist/
```

### 环境变量
| 名称 | 说明 |
|---|---|
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary 云名称（仅名称） |
| `VITE_GOATCOUNTER_CODE` | GoatCounter 代码（例如 `bunneng`） |

⚠️ **切勿把 API Secret**（`CLOUDINARY_URL`）**放到 Vercel 或 GitHub**。本站只需要云名称。

### 部署到 Vercel
1. 推送代码到 GitHub 2. Vercel → Add New → Project → Import 3. 添加上述环境变量 4. Deploy

### 添加媒体
上传到 Cloudinary 的 `bon-om-touk/` 文件夹，然后在 `src/data/media.js` 和 `src/data/destinations.js` 中填写 Public ID。详见 `IMAGE_CHECKLIST.md`。

### 追踪推广链接
分享带有 `?ref=facebook`、`?ref=telegram`、`?ref=tiktok` 的链接，并在 `/#/dashboard` 查看统计。

### 说明
- 日程和活动可能变动，请以官方公告为准。
- 图片、视频和音乐归原作者所有，请仅使用有权使用的内容。

---

© 2026 · Built with Vue 3, Vite, Tailwind CSS v4, vue-i18n, three.js
