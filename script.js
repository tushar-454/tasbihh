(() => {
    const prayers = [
        { id: "fajr", label: "Fajr", arabic: "الفجر", icon: "🌅" },
        { id: "dhuhr", label: "Dhuhr", arabic: "الظهر", icon: "☀️" },
        { id: "asr", label: "Asr", arabic: "العصر", icon: "🌤️" },
        { id: "maghrib", label: "Maghrib", arabic: "المغرب", icon: "🌇" },
        { id: "isha", label: "Isha", arabic: "العشاء", icon: "🌙" },
    ];

    const duas = [
        {
            id: "subhanallah",
            arabic: "سُبْحَانَ اللَّهِ",
            transliteration: "SubhanAllah",
            meaning: "Glory be to Allah",
            target: 33,
            prayer: ["fajr", "dhuhr", "asr", "maghrib", "isha"],
        },
        {
            id: "alhamdulillah",
            arabic: "الْحَمْدُ لِلَّهِ",
            transliteration: "Alhamdulillah",
            meaning: "All praise is due to Allah",
            target: 33,
            prayer: ["fajr", "dhuhr", "asr", "maghrib", "isha"],
        },
        {
            id: "allahuakbar",
            arabic: "اللَّهُ أَكْبَرُ",
            transliteration: "Allahu Akbar",
            meaning: "Allah is the Greatest",
            target: 34,
            prayer: ["fajr", "dhuhr", "asr", "maghrib", "isha"],
        },
        {
            id: "lailahaillallah",
            arabic: "لَا إِلَهَ إِلَّا اللَّهُ",
            transliteration: "La ilaha illallah",
            meaning: "There is no god but Allah",
            target: 100,
            prayer: ["fajr", "maghrib", "isha"],
        },
        {
            id: "astaghfirullah",
            arabic: "أَسْتَغْفِرُ اللَّهَ",
            transliteration: "Astaghfirullah",
            meaning: "I seek forgiveness from Allah",
            target: 33,
            prayer: ["fajr", "dhuhr", "asr", "maghrib", "isha"],
        },
        {
            id: "lahawla",
            arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
            transliteration: "La hawla wa la quwwata illa billah",
            meaning: "There is no power nor strength except with Allah",
            target: 33,
            prayer: ["fajr", "isha"],
        },
        {
            id: "ayatulkursi",
            arabic: "آية الكرسي",
            transliteration: "Ayatul Kursi",
            meaning: "The Throne Verse (recite once)",
            target: 1,
            prayer: ["fajr", "dhuhr", "asr", "maghrib", "isha"],
        },
        {
            id: "sayyidulistighfar",
            arabic: "سيد الاستغفار",
            transliteration: "Sayyidul Istighfar",
            meaning: "Master supplication for forgiveness",
            target: 3,
            prayer: ["fajr", "maghrib"],
        },
        {
            id: "durood",
            arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ",
            transliteration: "Allahumma salli ala Muhammad",
            meaning: "Send blessings upon Muhammad ﷺ",
            target: 10,
            prayer: ["fajr", "dhuhr", "asr", "maghrib", "isha"],
        },
        {
            id: "subhanallahi_wabihamdihi",
            arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
            transliteration: "SubhanAllahi wa bihamdihi",
            meaning: "Glory and praise be to Allah",
            target: 100,
            prayer: ["fajr", "isha"],
        },
        {
            id: "allahumma_inni_asalukal_afiyah",
            arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ",
            transliteration: "Allah Humma Inni As'alukal Afiyah",
            meaning: "O Allah, I ask You for well-being",
            target: 10,
            prayer: ["fajr", "dhuhr", "asr", "maghrib", "isha"],
        },
    ];

    const APP_STORAGE_KEY = "tasbih-progress-v2";
    const SETTINGS_STORAGE_KEY = "tasbih-settings";
    const PRAYER_ORDER = ["fajr", "dhuhr", "asr", "maghrib", "isha"];
    const fajrTimeStart = "05:00";
    const fajrTimeEnd = "07:00";
    const dhuhrTimeStart = "12:00";
    const dhuhrTimeEnd = "15:00";
    const asrTimeStart = "16:30";
    const asrTimeEnd = "17:30";
    const maghribTimeStart = "18:00";
    const maghribTimeEnd = "19:00";
    const ishaTimeStart = "20:00";
    const ishaTimeEnd = "22:00";
    const MIN_COMPLETED_DUAS_PER_PRAYER_FOR_STREAK = 3;

    const prayerBgClass = {
        fajr: "prayer-bg-fajr",
        dhuhr: "prayer-bg-dhuhr",
        asr: "prayer-bg-asr",
        maghrib: "prayer-bg-maghrib",
        isha: "prayer-bg-isha",
    };

    const glowHues = {
        fajr: "210, 60%, 50%",
        dhuhr: "45, 70%, 55%",
        asr: "35, 65%, 50%",
        maghrib: "15, 70%, 50%",
        isha: "240, 50%, 50%",
    };

    const svgNS = "http://www.w3.org/2000/svg";

    const app = document.getElementById("app");
    const duaButton = document.getElementById("duaButton");
    const duaArabic = document.getElementById("duaArabic");
    const duaMeta = document.getElementById("duaMeta");
    const duaChevron = document.getElementById("duaChevron");
    const selectedDuaStatus = document.getElementById("selectedDuaStatus");
    const duaMenu = document.getElementById("duaMenu");
    const streakValue = document.getElementById("streakValue");
    const classicRing = document.getElementById("classicRing");
    const modernRing = document.getElementById("modernRing");
    const centerCircle = document.getElementById("centerCircle");
    const countValue = document.getElementById("countValue");
    const completionGlow = document.getElementById("completionGlow");
    const duaMeaning = document.getElementById("duaMeaning");
    const prayerSelector = document.getElementById("prayerSelector");

    const settingsShell = document.getElementById("settingsShell");
    const settingsToggle = document.getElementById("settingsToggle");
    const settingsPanel = document.getElementById("settingsPanel");
    const vibrationCheck = document.getElementById("vibrationCheck");
    const intensityWrap = document.getElementById("intensityWrap");
    const intensityRange = document.getElementById("intensityRange");
    const intensityValue = document.getElementById("intensityValue");
    const modeToggle = document.getElementById("modeToggle");
    const customTargetWrap = document.getElementById("customTargetWrap");
    const customTargetRange = document.getElementById("customTargetRange");
    const customTargetValue = document.getElementById("customTargetValue");
    const styleToggle = document.getElementById("styleToggle");
    const fullscreenToggle = document.getElementById("fullscreenToggle");
    const resetAllButton = document.getElementById("resetAllButton");
    const resetDialogOverlay = document.getElementById("resetDialogOverlay");
    const resetCancelButton = document.getElementById("resetCancelButton");
    const resetDeleteButton = document.getElementById("resetDeleteButton");

    const toDateKey = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    };

    const timeStringToMinutes = (value) => {
        const [hoursRaw, minutesRaw] = String(value).split(":");
        const hours = Number.parseInt(hoursRaw, 10);
        const minutes = Number.parseInt(minutesRaw, 10);
        if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return 0;
        return Math.max(0, Math.min(1439, hours * 60 + minutes));
    };

    const PRAYER_TIME_WINDOWS = {
        fajr: {
            start: timeStringToMinutes(fajrTimeStart),
            end: timeStringToMinutes(fajrTimeEnd),
        },
        dhuhr: {
            start: timeStringToMinutes(dhuhrTimeStart),
            end: timeStringToMinutes(dhuhrTimeEnd),
        },
        asr: {
            start: timeStringToMinutes(asrTimeStart),
            end: timeStringToMinutes(asrTimeEnd),
        },
        maghrib: {
            start: timeStringToMinutes(maghribTimeStart),
            end: timeStringToMinutes(maghribTimeEnd),
        },
        isha: {
            start: timeStringToMinutes(ishaTimeStart),
            end: timeStringToMinutes(ishaTimeEnd),
        },
    };

    const ISHA_START_MINUTES = PRAYER_TIME_WINDOWS.isha.start;

    const dayDiff = (fromKey, toKey) => {
        const from = new Date(`${fromKey}T00:00:00`);
        const to = new Date(`${toKey}T00:00:00`);
        return Math.floor((to.getTime() - from.getTime()) / 86400000);
    };

    const isConsecutiveDay = (previousKey, nextKey) =>
        dayDiff(previousKey, nextKey) === 1;

    const minutesNow = (date) => date.getHours() * 60 + date.getMinutes();

    const isPrayerOpenNow = (prayerId, date) => {
        const mins = minutesNow(date);
        const window = PRAYER_TIME_WINDOWS[prayerId];
        if (!window) return false;
        return mins >= window.start && mins < window.end;
    };

    const getPrayerForTime = (date) => {
        for (const prayerId of PRAYER_ORDER) {
            if (isPrayerOpenNow(prayerId, date)) return prayerId;
        }
        return null;
    };

    const getLockedPrayersByTime = (date) => {
        const mins = minutesNow(date);
        return {
            fajr: mins >= PRAYER_TIME_WINDOWS.fajr.end,
            dhuhr: mins >= PRAYER_TIME_WINDOWS.dhuhr.end,
            asr: mins >= PRAYER_TIME_WINDOWS.asr.end,
            maghrib: mins >= PRAYER_TIME_WINDOWS.maghrib.end,
            isha: mins >= PRAYER_TIME_WINDOWS.isha.end,
        };
    };

    const firstDuaForPrayer = (prayer) =>
        duas.find((d) => d.prayer.includes(prayer)) || null;

    const createEmptyPrayerProgress = (prayer) => ({
        selectedDuaId: (firstDuaForPrayer(prayer) || {}).id || null,
        duaCounts: {},
        completedDuaIds: [],
        hasCompletedAny: false,
    });

    const createEmptyDailyState = (date, selectedPrayer) => {
        const activePrayer = getPrayerForTime(date);
        const initialPrayer = selectedPrayer || activePrayer || "fajr";
        return {
            dateKey: toDateKey(date),
            selectedPrayer: initialPrayer,
            prayers: {
                fajr: createEmptyPrayerProgress("fajr"),
                dhuhr: createEmptyPrayerProgress("dhuhr"),
                asr: createEmptyPrayerProgress("asr"),
                maghrib: createEmptyPrayerProgress("maghrib"),
                isha: createEmptyPrayerProgress("isha"),
            },
            customMode: { count: 0, target: 100 },
            streak: 0,
            lastStreakDate: null,
        };
    };

    const createEmptyAllPrayerProgress = () => ({
        fajr: createEmptyPrayerProgress("fajr"),
        dhuhr: createEmptyPrayerProgress("dhuhr"),
        asr: createEmptyPrayerProgress("asr"),
        maghrib: createEmptyPrayerProgress("maghrib"),
        isha: createEmptyPrayerProgress("isha"),
    });

    const migratePrayerProgress = (prayer, progress) => {
        const allowedDuas = duas.filter((d) => d.prayer.includes(prayer));
        const allowedIds = new Set(allowedDuas.map((d) => d.id));
        const targetById = new Map(allowedDuas.map((d) => [d.id, d.target]));

        const selectedDuaId =
            progress &&
            progress.selectedDuaId &&
            allowedIds.has(progress.selectedDuaId)
                ? progress.selectedDuaId
                : (firstDuaForPrayer(prayer) || {}).id || null;

        const rawCounts = (progress && progress.duaCounts) || {};
        const duaCounts = {};
        allowedDuas.forEach((dua) => {
            const raw = Number(rawCounts[dua.id]);
            duaCounts[dua.id] =
                Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 0;
        });

        const completedDuaIds = Array.from(
            new Set(
                ((progress && progress.completedDuaIds) || []).filter((id) => {
                    if (!allowedIds.has(id)) return false;
                    const target =
                        targetById.get(id) || Number.MAX_SAFE_INTEGER;
                    return (duaCounts[id] || 0) >= target;
                }),
            ),
        );

        return {
            selectedDuaId,
            duaCounts,
            completedDuaIds,
            hasCompletedAny: completedDuaIds.length > 0,
        };
    };

    const migratePersistedState = (state) => {
        const safeSelectedPrayer = PRAYER_ORDER.includes(state.selectedPrayer)
            ? state.selectedPrayer
            : "fajr";

        const target = Number(state.customMode && state.customMode.target);
        const count = Number(state.customMode && state.customMode.count);
        const safeTarget = Number.isFinite(target)
            ? Math.max(1, Math.min(1000, Math.floor(target)))
            : 100;
        const safeCount = Number.isFinite(count)
            ? Math.max(0, Math.min(safeTarget, Math.floor(count)))
            : 0;

        return {
            ...state,
            selectedPrayer: safeSelectedPrayer,
            prayers: {
                fajr: migratePrayerProgress("fajr", state.prayers.fajr),
                dhuhr: migratePrayerProgress("dhuhr", state.prayers.dhuhr),
                asr: migratePrayerProgress("asr", state.prayers.asr),
                maghrib: migratePrayerProgress(
                    "maghrib",
                    state.prayers.maghrib,
                ),
                isha: migratePrayerProgress("isha", state.prayers.isha),
            },
            customMode: {
                count: safeCount,
                target: safeTarget,
            },
        };
    };

    const isIshaTimeOrLater = (date) => minutesNow(date) >= ISHA_START_MINUTES;

    const didMeetDailyStreakRequirement = (state) => {
        if (!state.prayers.isha.hasCompletedAny) return false;
        return PRAYER_ORDER.every(
            (p) =>
                state.prayers[p].completedDuaIds.length >=
                MIN_COMPLETED_DUAS_PER_PRAYER_FOR_STREAK,
        );
    };

    const applyIshaStreakIfEligible = (state, now) => {
        if (!isIshaTimeOrLater(now)) return state;
        if (!didMeetDailyStreakRequirement(state)) return state;

        const todayKey = toDateKey(now);
        if (state.lastStreakDate === todayKey) return state;

        const streak =
            state.lastStreakDate &&
            isConsecutiveDay(state.lastStreakDate, todayKey)
                ? state.streak + 1
                : 1;

        return {
            ...state,
            dateKey: todayKey,
            streak,
            lastStreakDate: todayKey,
        };
    };

    const rollForwardState = (state, now) => {
        const todayKey = toDateKey(now);
        const normalizedState =
            state.dateKey === todayKey
                ? state
                : {
                      ...state,
                      dateKey: todayKey,
                      prayers: createEmptyAllPrayerProgress(),
                  };
        return applyIshaStreakIfEligible(normalizedState, now);
    };

    const loadSettings = () => {
        try {
            const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                const parsedIntensity = Number(parsed.vibrationIntensity);
                const safeIntensity = Number.isFinite(parsedIntensity)
                    ? Math.max(
                          0,
                          Math.min(100, Math.floor(parsedIntensity / 5) * 5),
                      )
                    : 40;
                return {
                    vibration: (parsed.vibration ?? true) && safeIntensity > 0,
                    vibrationIntensity: safeIntensity,
                    counterVariant: parsed.counterVariant ?? "classic",
                    appMode: parsed.appMode ?? "prayer",
                };
            }
        } catch (_err) {
            // Ignore malformed data and continue with defaults.
        }

        return {
            vibration: true,
            vibrationIntensity: 40,
            counterVariant: "classic",
            appMode: "prayer",
        };
    };

    const loadAppState = () => {
        const now = new Date();
        const fallback = createEmptyDailyState(now);

        try {
            const raw = localStorage.getItem(APP_STORAGE_KEY);
            if (!raw) return fallback;

            const parsed = JSON.parse(raw);
            if (
                !parsed ||
                !parsed.dateKey ||
                !parsed.prayers ||
                !parsed.selectedPrayer
            ) {
                return fallback;
            }

            const safe = {
                dateKey: parsed.dateKey,
                selectedPrayer: parsed.selectedPrayer,
                prayers: {
                    fajr:
                        parsed.prayers.fajr ||
                        createEmptyPrayerProgress("fajr"),
                    dhuhr:
                        parsed.prayers.dhuhr ||
                        createEmptyPrayerProgress("dhuhr"),
                    asr: parsed.prayers.asr || createEmptyPrayerProgress("asr"),
                    maghrib:
                        parsed.prayers.maghrib ||
                        createEmptyPrayerProgress("maghrib"),
                    isha:
                        parsed.prayers.isha ||
                        createEmptyPrayerProgress("isha"),
                },
                customMode: parsed.customMode || { count: 0, target: 100 },
                streak: parsed.streak ?? 0,
                lastStreakDate: parsed.lastStreakDate ?? null,
            };

            return rollForwardState(migratePersistedState(safe), now);
        } catch (_err) {
            return fallback;
        }
    };

    const state = {
        now: new Date(),
        appState: loadAppState(),
        settings: loadSettings(),
        isFullscreen: !!document.fullscreenElement,
    };

    const getPrayerData = () =>
        state.appState.prayers[state.appState.selectedPrayer];

    const getSelectedDua = () => {
        const prayer = state.appState.selectedPrayer;
        const prayerData = getPrayerData();
        if (prayerData.selectedDuaId) {
            const found = duas.find(
                (d) =>
                    d.id === prayerData.selectedDuaId &&
                    d.prayer.includes(prayer),
            );
            if (found) return found;
        }
        return firstDuaForPrayer(prayer);
    };

    const getPrayerCount = () => {
        const selectedDua = getSelectedDua();
        if (!selectedDua) return 0;
        return getPrayerData().duaCounts[selectedDua.id] || 0;
    };

    const getTarget = () => {
        if (state.settings.appMode === "custom")
            return state.appState.customMode.target;
        const selectedDua = getSelectedDua();
        return selectedDua ? selectedDua.target : 0;
    };

    const getDisplayCount = () =>
        state.settings.appMode === "custom"
            ? state.appState.customMode.count
            : getPrayerCount();

    const getCompletionByDuaId = () => {
        const prayer = state.appState.selectedPrayer;
        const prayerProgress = state.appState.prayers[prayer];
        const result = {};
        duas.filter((d) => d.prayer.includes(prayer)).forEach((d) => {
            const c = prayerProgress.duaCounts[d.id] || 0;
            result[d.id] = c >= d.target;
        });
        return result;
    };

    const persistSettings = () =>
        localStorage.setItem(
            SETTINGS_STORAGE_KEY,
            JSON.stringify(state.settings),
        );
    const persistAppState = () =>
        localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state.appState));

    const closeMenus = () => {
        duaMenu.classList.add("hidden");
        settingsPanel.classList.add("hidden");
        duaChevron.classList.remove("open");
        duaButton.setAttribute("aria-expanded", "false");
        settingsToggle.setAttribute("aria-expanded", "false");
    };

    const closeResetDialog = () => {
        if (!resetDialogOverlay) return;
        resetDialogOverlay.classList.add("hidden");
        document.body.classList.remove("dialog-open");
    };

    const openResetDialog = () => {
        if (!resetDialogOverlay) return;
        closeMenus();
        resetDialogOverlay.classList.remove("hidden");
        document.body.classList.add("dialog-open");
        if (resetDeleteButton) resetDeleteButton.focus();
    };

    const setPrayerBg = () => {
        app.classList.remove(
            "prayer-bg-fajr",
            "prayer-bg-dhuhr",
            "prayer-bg-asr",
            "prayer-bg-maghrib",
            "prayer-bg-isha",
        );
        app.classList.add(prayerBgClass[state.appState.selectedPrayer]);
    };

    const drawClassicRing = (count, target) => {
        classicRing.innerHTML = "";
        if (target <= 0) return;

        const radius = 130;
        const center = 160;
        const dotRadius = target <= 34 ? 5 : target <= 50 ? 4 : 3;

        for (let i = 0; i < target; i += 1) {
            const angle = (i / target) * Math.PI * 2 - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            const isActive = i < count;
            const hue = (i / target) * 360;

            const circle = document.createElementNS(svgNS, "circle");
            circle.setAttribute("cx", String(x));
            circle.setAttribute("cy", String(y));
            circle.setAttribute("r", String(dotRadius));
            circle.setAttribute(
                "fill",
                isActive ? `hsl(${hue}, 80%, 60%)` : "hsl(220, 12%, 18%)",
            );
            classicRing.appendChild(circle);
        }
    };

    const drawModernRing = (count, target) => {
        modernRing.innerHTML = "";

        const center = 160;
        const radius = 118;
        const circumference = 2 * Math.PI * radius;
        const progress = target > 0 ? Math.min(count / target, 1) : 0;

        const track = document.createElementNS(svgNS, "circle");
        track.setAttribute("cx", String(center));
        track.setAttribute("cy", String(center));
        track.setAttribute("r", String(radius));
        track.setAttribute("fill", "none");
        track.setAttribute("stroke", "hsl(220, 12%, 18%)");
        track.setAttribute("stroke-width", "16");
        modernRing.appendChild(track);

        const progressCircle = document.createElementNS(svgNS, "circle");
        progressCircle.setAttribute("cx", String(center));
        progressCircle.setAttribute("cy", String(center));
        progressCircle.setAttribute("r", String(radius));
        progressCircle.setAttribute("fill", "none");
        progressCircle.setAttribute("stroke", "hsl(42, 62%, 52%)");
        progressCircle.setAttribute("stroke-width", "16");
        progressCircle.setAttribute("stroke-linecap", "round");
        progressCircle.setAttribute(
            "transform",
            `rotate(-90 ${center} ${center})`,
        );
        progressCircle.setAttribute("stroke-dasharray", String(circumference));
        progressCircle.setAttribute(
            "stroke-dashoffset",
            String(circumference * (1 - progress)),
        );
        progressCircle.style.filter =
            "drop-shadow(0 0 6px hsl(42 62% 52% / 0.38))";
        modernRing.appendChild(progressCircle);
    };

    const renderCounter = () => {
        const count = getDisplayCount();
        const target = getTarget();
        const prayer = state.appState.selectedPrayer;

        countValue.textContent = String(count);

        if (state.settings.counterVariant === "modern") {
            classicRing.classList.add("hidden");
            modernRing.classList.remove("hidden");
            drawModernRing(count, target);
        } else {
            modernRing.classList.add("hidden");
            classicRing.classList.remove("hidden");
            drawClassicRing(count, target);
        }

        const done = target > 0 && count === target;
        if (done) {
            completionGlow.classList.remove("hidden");
            completionGlow.style.background = `radial-gradient(circle, hsl(${glowHues[prayer]} / 0.22) 0%, transparent 70%)`;
            centerCircle.classList.add("done");
            setTimeout(() => centerCircle.classList.remove("done"), 520);
        } else {
            completionGlow.classList.add("hidden");
        }
    };

    const renderPrayerSelector = () => {
        prayerSelector.innerHTML = "";
        const activePrayer = getPrayerForTime(state.now);
        const lockedPrayers = getLockedPrayersByTime(state.now);
        const isPrayerMode = state.settings.appMode === "prayer";

        prayers.forEach((p) => {
            const btn = document.createElement("button");
            btn.type = "button";

            const isActive = state.appState.selectedPrayer === p.id;
            const isCurrentTimePrayer = activePrayer === p.id;
            const isDisabled =
                isPrayerMode && activePrayer !== null && !isCurrentTimePrayer;

            btn.className = `prayer-btn${isActive ? " active" : ""}${isDisabled ? " disabled" : ""}${lockedPrayers[p.id] ? " locked" : ""}`;
            btn.disabled = isDisabled;
            btn.innerHTML = `<span class="prayer-icon">${p.icon}</span><span class="prayer-label">${p.label}</span>`;
            btn.addEventListener("click", (event) => {
                event.stopPropagation();
                if (isDisabled) return;
                if (state.appState.selectedPrayer === p.id) return;
                state.appState.selectedPrayer = p.id;
                renderAll();
                persistAppState();
            });
            prayerSelector.appendChild(btn);
        });
    };

    const renderDuaMenu = () => {
        const selectedDua = getSelectedDua();
        const filtered = duas.filter((d) =>
            d.prayer.includes(state.appState.selectedPrayer),
        );
        const completionByDuaId = getCompletionByDuaId();

        duaMenu.innerHTML = "";

        filtered.forEach((dua) => {
            const isDone = !!completionByDuaId[dua.id];
            const item = document.createElement("button");
            item.type = "button";
            item.className = `dua-item${selectedDua && selectedDua.id === dua.id ? " active" : ""}`;
            item.innerHTML = `
                <div class="dua-item-top">
                    <div class="arabic">${dua.arabic}</div>
                    <span class="dua-status ${isDone ? "done" : "todo"}">${isDone ? "✓" : "✗"}</span>
                </div>
                <div class="detail">${dua.transliteration} - ${dua.meaning}</div>
                <div class="target">Target: ${dua.target}x</div>
            `;
            item.addEventListener("click", (event) => {
                event.stopPropagation();
                state.appState.prayers[
                    state.appState.selectedPrayer
                ].selectedDuaId = dua.id;
                closeMenus();
                renderAll();
                persistAppState();
            });
            duaMenu.appendChild(item);
        });

        if (selectedDua) {
            duaArabic.textContent = selectedDua.arabic;
            duaMeta.textContent = `${selectedDua.transliteration} · ${getTarget()}x`;
            duaMeaning.textContent = `"${selectedDua.meaning}"`;
            const done = !!completionByDuaId[selectedDua.id];
            selectedDuaStatus.textContent = done ? "✓" : "✗";
            selectedDuaStatus.className = `selected-status ${done ? "done" : "todo"}`;
        } else {
            duaArabic.textContent = "Select a Dua...";
            duaMeta.textContent = "";
            duaMeaning.textContent = "";
            selectedDuaStatus.textContent = "✗";
            selectedDuaStatus.className = "selected-status todo";
        }
    };

    const renderSettings = () => {
        vibrationCheck.checked = !!state.settings.vibration;
        intensityRange.value = String(state.settings.vibrationIntensity);
        intensityValue.textContent = String(state.settings.vibrationIntensity);
        intensityWrap.classList.toggle("hidden", !state.settings.vibration);

        modeToggle.textContent =
            state.settings.appMode === "prayer" ? "Custom Mode" : "Prayer Mode";
        styleToggle.textContent =
            state.settings.counterVariant === "modern" ? "Classic" : "Modern";
        fullscreenToggle.textContent = state.isFullscreen
            ? "Exit Full Screen"
            : "Full Screen";

        customTargetWrap.classList.toggle(
            "hidden",
            state.settings.appMode !== "custom",
        );
        customTargetRange.value = String(state.appState.customMode.target);
        customTargetValue.textContent = String(
            state.appState.customMode.target,
        );
    };

    const renderTopState = () => {
        streakValue.textContent = String(state.appState.streak);
        setPrayerBg();
    };

    const renderAll = () => {
        renderTopState();
        renderPrayerSelector();
        renderDuaMenu();
        renderSettings();
        renderCounter();
    };

    const incrementCount = () => {
        const target = getTarget();
        const count = getDisplayCount();
        if (target === 0 || count >= target) return;

        if (state.settings.appMode === "custom") {
            state.appState.customMode.count = Math.min(
                state.appState.customMode.count + 1,
                state.appState.customMode.target,
            );
        } else {
            const activePrayer = getPrayerForTime(state.now);
            const selectedPrayer = state.appState.selectedPrayer;
            const lockedPrayers = getLockedPrayersByTime(state.now);
            const selectedDua = getSelectedDua();

            if (!selectedDua) return;
            if (activePrayer === null) return;
            if (selectedPrayer !== activePrayer) return;
            if (lockedPrayers[selectedPrayer]) return;

            const prayerProgress = state.appState.prayers[selectedPrayer];
            const currentCount = prayerProgress.duaCounts[selectedDua.id] || 0;
            const nextCount = Math.min(currentCount + 1, target);
            const completed = prayerProgress.completedDuaIds.slice();

            prayerProgress.duaCounts[selectedDua.id] = nextCount;
            if (nextCount >= target && !completed.includes(selectedDua.id)) {
                completed.push(selectedDua.id);
                prayerProgress.completedDuaIds = completed;
            }
            prayerProgress.hasCompletedAny =
                prayerProgress.completedDuaIds.length > 0;

            state.appState = applyIshaStreakIfEligible(
                state.appState,
                new Date(),
            );
        }

        if (
            state.settings.vibration &&
            state.settings.vibrationIntensity > 0 &&
            navigator.vibrate
        ) {
            navigator.vibrate(state.settings.vibrationIntensity);
            if (count + 1 === target) {
                setTimeout(() => {
                    if (
                        state.settings.vibration &&
                        state.settings.vibrationIntensity > 0 &&
                        navigator.vibrate
                    ) {
                        navigator.vibrate([100, 80, 100, 80, 300]);
                    }
                }, 120);
            }
        }

        renderTopState();
        renderCounter();
        renderDuaMenu();
        persistAppState();
    };

    const resetAllData = () => {
        localStorage.removeItem(APP_STORAGE_KEY);
        localStorage.removeItem(SETTINGS_STORAGE_KEY);

        state.settings = {
            vibration: true,
            vibrationIntensity: 40,
            counterVariant: "classic",
            appMode: "prayer",
        };
        state.appState = createEmptyDailyState(new Date());
        state.now = new Date();
        closeMenus();
        renderAll();
    };

    const toggleFullscreen = async () => {
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else {
                await document.documentElement.requestFullscreen();
            }
        } catch (_err) {
            // Ignore unsupported or blocked fullscreen requests.
        }
    };

    const updateClockAndRollState = () => {
        state.now = new Date();
        state.appState = rollForwardState(state.appState, state.now);

        const activePrayer = getPrayerForTime(state.now);
        if (
            state.settings.appMode === "prayer" &&
            activePrayer &&
            state.appState.selectedPrayer !== activePrayer
        ) {
            state.appState.selectedPrayer = activePrayer;
        }

        renderAll();
        persistAppState();
    };

    app.addEventListener("click", incrementCount);

    [duaButton, duaMenu, settingsShell, centerCircle, prayerSelector].forEach(
        (el) => {
            el.addEventListener("click", (event) => event.stopPropagation());
        },
    );

    duaButton.addEventListener("click", () => {
        const isOpen = !duaMenu.classList.contains("hidden");
        closeMenus();
        if (!isOpen) {
            duaMenu.classList.remove("hidden");
            duaChevron.classList.add("open");
            duaButton.setAttribute("aria-expanded", "true");
        }
    });

    settingsToggle.addEventListener("click", () => {
        const isOpen = !settingsPanel.classList.contains("hidden");
        closeMenus();
        if (!isOpen) {
            settingsPanel.classList.remove("hidden");
            settingsToggle.setAttribute("aria-expanded", "true");
        }
    });

    document.addEventListener("click", closeMenus);

    centerCircle.addEventListener("dblclick", (event) => {
        event.stopPropagation();
        if (state.settings.appMode === "custom") {
            state.appState.customMode.count = 0;
        } else {
            const selectedDua = getSelectedDua();
            if (!selectedDua) return;
            const prayerProgress = getPrayerData();
            if (prayerProgress.completedDuaIds.includes(selectedDua.id)) {
                return;
            }
            prayerProgress.duaCounts[selectedDua.id] = 0;
        }
        renderCounter();
        renderDuaMenu();
        persistAppState();
    });

    vibrationCheck.addEventListener("change", () => {
        state.settings.vibration = vibrationCheck.checked;
        if (
            state.settings.vibration &&
            state.settings.vibrationIntensity === 0
        ) {
            state.settings.vibrationIntensity = 40;
        }
        if (!state.settings.vibration) {
            state.settings.vibrationIntensity = 0;
        }
        persistSettings();
        renderSettings();
    });

    intensityRange.addEventListener("input", () => {
        state.settings.vibrationIntensity = Number.parseInt(
            intensityRange.value,
            10,
        );
        state.settings.vibration = state.settings.vibrationIntensity > 0;
        persistSettings();
        renderSettings();
    });

    modeToggle.addEventListener("click", () => {
        state.settings.appMode =
            state.settings.appMode === "prayer" ? "custom" : "prayer";
        persistSettings();
        renderAll();
    });

    customTargetRange.addEventListener("input", () => {
        const safe = Math.max(
            1,
            Math.min(1000, Number.parseInt(customTargetRange.value, 10)),
        );
        state.appState.customMode.target = safe;
        state.appState.customMode.count = Math.min(
            state.appState.customMode.count,
            safe,
        );
        renderAll();
        persistAppState();
    });

    styleToggle.addEventListener("click", () => {
        state.settings.counterVariant =
            state.settings.counterVariant === "modern" ? "classic" : "modern";
        persistSettings();
        renderAll();
    });

    fullscreenToggle.addEventListener("click", toggleFullscreen);

    document.addEventListener("fullscreenchange", () => {
        state.isFullscreen = !!document.fullscreenElement;
        renderSettings();
    });

    resetAllButton.addEventListener("click", () => {
        openResetDialog();
    });

    if (resetCancelButton) {
        resetCancelButton.addEventListener("click", () => {
            closeResetDialog();
        });
    }

    if (resetDeleteButton) {
        resetDeleteButton.addEventListener("click", () => {
            closeResetDialog();
            resetAllData();
        });
    }

    if (resetDialogOverlay) {
        resetDialogOverlay.addEventListener("click", (event) => {
            if (event.target === resetDialogOverlay) {
                closeResetDialog();
            }
        });
    }

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            resetDialogOverlay &&
            !resetDialogOverlay.classList.contains("hidden")
        ) {
            closeResetDialog();
        }
    });

    updateClockAndRollState();

    const heartbeat = setInterval(updateClockAndRollState, 30000);
    window.addEventListener("beforeunload", () => clearInterval(heartbeat));

    const nextMidnight = new Date();
    nextMidnight.setHours(24, 0, 0, 0);
    const msUntilMidnight = Math.max(nextMidnight.getTime() - Date.now(), 0);
    setTimeout(updateClockAndRollState, msUntilMidnight + 20);

    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("./sw.js").catch(() => {
                // Ignore registration errors in unsupported/local file contexts.
            });
        });
    }
})();
