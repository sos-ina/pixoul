import json
import os
import re
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load env from the repo root so you can keep using your existing .env.local
load_dotenv(os.path.join(BASE_DIR, "..", ".env.local"))

DEFAULT_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")


def load_pricing_knowledge() -> dict:
    path = os.path.join(BASE_DIR, "knowledge", "pricing.json")
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


PRICING_KB = load_pricing_knowledge()


def normalize_text(s: str) -> str:
    return " ".join((s or "").strip().lower().split())


def normalize_key(s: str) -> str:
    t = normalize_text(s).replace("-", " ")
    t = re.sub(r"[^a-z0-9\s]", " ", t)
    t = " ".join(t.split())
    if t.startswith("the "):
        t = t[4:]
    return t


def pick_variant(message: str, variants: list[str]) -> str:
    text = message or ""
    total = sum(ord(c) for c in text)
    idx = total % len(variants) if variants else 0
    return variants[idx] if variants else ""


def is_greeting_message(message: str) -> bool:
    t = normalize_text(message)
    if not t:
        return False

    phrases = [
        "hi",
        "hello",
        "hey",
        "good morning",
        "good afternoon",
        "good evening",
        "how are you",
        "how r u",
        "hru",
        "what's up",
        "whats up",
        "thanks",
        "thank you",
    ]

    return any(t == p or t.startswith(p + " ") or (" " + p + " ") in (" " + t + " ") for p in phrases)


def is_pixoul_related(message: str) -> bool:
    t = normalize_text(message)
    if not t:
        return False

    keywords = [
        "pixoul",
        "al qana",
        "abu dhabi",
        "gaming",
        "game",
        "games",
        "category",
        "categories",
        "offer",
        "offers",
        "available",
        "vr",
        "virtual reality",
        "arcade",
        "console",
        "pc",
        "party",
        "birthday",
        "team building",
        "booking",
        "book",
        "reserve",
        "event",
        "pricing",
        "price",
        "cost",
        "package",
        "membership",
        "hours",
        "timing",
        "open",
        "location",
        "address",
        "phone",
        "contact",
        "community",
        "reviews",
        "leaderboard",
        "challenges",
    ]

    return any(k in t for k in keywords)


def is_categories_question(message: str) -> bool:
    t = normalize_text(message)
    if not t:
        return False

    return (
        ("category" in t or "categories" in t)
        and ("game" in t or "games" in t or "do you have" in t or "offer" in t)
    )


def is_packages_question(message: str) -> bool:
    t = normalize_text(message)
    if not t:
        return False
    return "package" in t or "packages" in t or "bundle" in t or "bundles" in t


def is_vr_games_question(message: str) -> bool:
    t = normalize_text(message)
    if not t:
        return False
    if "vr" not in t and "virtual reality" not in t:
        return False
    return any(
        w in t
        for w in [
            "vr game",
            "vr games",
            "virtual reality game",
            "virtual reality games",
            "what vr",
            "which vr",
            "suggest",
            "recommend",
            "do you have",
            "offer",
            "available",
            "list",
            "one",
        ]
    )


def list_available_package_sections() -> list[tuple[str, str]]:
    categories = (PRICING_KB or {}).get("categories") or {}
    ordered = [
        ("pay_and_play", "Pay & Play Packages"),
        ("birthday_bash_packages", "Birthday Bash Packages"),
        ("social_gaming_room", "Social Gaming Room Packages"),
    ]
    out: list[tuple[str, str]] = []
    for key, label in ordered:
        rows = categories.get(key)
        if isinstance(rows, list) and len(rows) > 0:
            out.append((key, label))
    return out


def list_available_categories() -> list[str]:
    categories = (PRICING_KB or {}).get("categories") or {}
    ordered = [
        ("vr_games", "VR Games"),
        ("arcades", "Arcade Games"),
        ("redemption_games", "Redemption Games"),
        ("console", "Console Game (PS5)"),
        ("esports", "Esports"),
        ("formula_racing", "Formula Racing (F1)"),
        ("pay_and_play", "Pay & Play Packages"),
        ("birthday_bash_packages", "Birthday Bash Packages"),
        ("social_gaming_room", "Social Gaming Room"),
    ]

    labels: list[str] = []
    for key, label in ordered:
        rows = categories.get(key)
        if isinstance(rows, list) and len(rows) > 0:
            labels.append(label)

    return labels


def is_operational_detail_question(message: str) -> bool:
    t = normalize_text(message)
    if not t:
        return False

    triggers = [
        "price",
        "pricing",
        "cost",
        "how much",
        "how many aed",
        "aed",
        "fee",
        "rate",
        "per person",
        "per player",
        "hours",
        "timing",
        "close",
        "schedule",
        "age",
        "kids",
        "children",
        "policy",
        "rules",
        "refund",
        "cancellation",
    ]

    return any(w in t for w in triggers)


def flatten_pricing_items(pricing_kb: dict) -> list[dict]:
    categories = (pricing_kb or {}).get("categories") or {}
    items: list[dict] = []
    for cat, rows in categories.items():
        if not isinstance(rows, list):
            continue
        for r in rows:
            if not isinstance(r, dict):
                continue
            name = r.get("name")
            if not name:
                continue
            name_str = str(name)
            name_norm = normalize_key(name_str)
            items.append(
                {
                    "category": cat,
                    "name": name_str,
                    "name_norm": name_norm,
                    "name_tokens": set(name_norm.split()) if name_norm else set(),
                    "price": r.get("price"),
                    "unit": r.get("unit") or "AED",
                }
            )
    return items


PRICING_ITEMS = flatten_pricing_items(PRICING_KB)


def find_pricing_matches(user_message: str) -> list[dict]:
    t = normalize_key(user_message)
    if not t:
        return []

    hits: list[dict] = []
    for item in PRICING_ITEMS:
        name_norm = item.get("name_norm") or ""
        if not name_norm:
            continue
        if name_norm in t:
            hits.append(item)
            continue

        if name_norm.startswith("the ") and name_norm[4:] in t:
            hits.append(item)

    return hits


def _token_similarity(a_tokens: set[str], b_tokens: set[str]) -> float:
    if not a_tokens or not b_tokens:
        return 0.0
    inter = len(a_tokens.intersection(b_tokens))
    if inter <= 0:
        return 0.0
    union = len(a_tokens.union(b_tokens))
    return inter / union if union else 0.0


STOPWORDS = {
    "a",
    "an",
    "and",
    "are",
    "book",
    "booking",
    "can",
    "coming",
    "cost",
    "do",
    "for",
    "game",
    "games",
    "how",
    "i",
    "in",
    "is",
    "it",
    "like",
    "long",
    "much",
    "of",
    "people",
    "person",
    "persons",
    "pax",
    "play",
    "price",
    "pricing",
    "r",
    "re",
    "the",
    "then",
    "timing",
    "to",
    "total",
    "try",
    "we",
    "what",
    "when",
    "where",
    "will",
    "with",
    "you",
    "your",
}


ALLOWED_SHORT_TOKENS = {
    "f1",
    "ps5",
    "nba",
    "pc",
}


def tokens_for_match(text: str) -> set[str]:
    t = normalize_key(text)
    if not t:
        return set()
    out: set[str] = set()
    for tok in t.split():
        if not tok:
            continue
        if tok.isdigit():
            continue
        if len(tok) < 3 and tok not in ALLOWED_SHORT_TOKENS:
            continue
        if tok in STOPWORDS:
            continue
        if tok == "vr":
            continue
        out.add(tok)
    return out


def _top_fuzzy_candidates(user_message: str, top_k: int = 6) -> list[dict]:
    q_tokens = tokens_for_match(user_message)
    if not q_tokens:
        return []

    scored: list[tuple[float, dict]] = []
    for item in PRICING_ITEMS:
        tokens = item.get("name_tokens") or set()
        if not isinstance(tokens, set):
            tokens = set(str(tokens).split())
        score = _token_similarity(q_tokens, tokens)
        if score > 0:
            scored.append((score, item))

    scored.sort(key=lambda x: x[0], reverse=True)
    return [it for _, it in scored[:top_k]]


def _select_best_local_match(user_message: str) -> Optional[dict]:
    exact = find_pricing_matches(user_message)
    if len(exact) == 1:
        return exact[0]

    candidates = _top_fuzzy_candidates(user_message, top_k=4)
    if not candidates:
        return None

    q_tokens = tokens_for_match(user_message)
    if not q_tokens:
        return None
    best = candidates[0]
    best_score = _token_similarity(q_tokens, (best.get("name_tokens") or set()) - STOPWORDS)
    second_score = 0.0
    if len(candidates) > 1:
        second = candidates[1]
        second_score = _token_similarity(q_tokens, (second.get("name_tokens") or set()) - STOPWORDS)

    if best_score >= 0.60:
        return best
    if best_score >= 0.45 and (best_score - second_score) >= 0.15:
        return best

    return None


def _select_match_with_openai(user_message: str, candidates: list[dict], client: OpenAI) -> Optional[dict]:
    if not candidates or not client:
        return None

    names = [c.get("name") for c in candidates if c.get("name")]
    names = [n for n in names if isinstance(n, str)]
    if not names:
        return None

    resp = client.chat.completions.create(
        model=DEFAULT_MODEL,
        temperature=0.0,
        max_tokens=30,
        messages=[
            {
                "role": "system",
                "content": (
                    "You help map a user's message to a verified Pixoul pricing item. "
                    "Pick the single best matching item name from the provided list. "
                    "Reply with EXACTLY one name from the list, or reply NONE if nothing matches."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"User message: {user_message}\n\n"
                    "Candidate item names:\n"
                    + "\n".join([f"- {n}" for n in names])
                ),
            },
        ],
    )

    choice = (resp.choices[0].message.content or "").strip() if resp and resp.choices else ""
    if not choice:
        return None
    if choice.upper() == "NONE":
        return None

    for c in candidates:
        if c.get("name") == choice:
            return c

    return None


def resolve_pricing_item(user_message: str, client: Optional[OpenAI] = None) -> Optional[dict]:
    if not tokens_for_match(user_message):
        return None
    local = _select_best_local_match(user_message)
    if local:
        return local

    if not client:
        return None

    candidates = _top_fuzzy_candidates(user_message, top_k=6)
    if not candidates:
        return None

    try:
        return _select_match_with_openai(user_message, candidates=candidates, client=client)
    except Exception:
        return None


def detect_category_request(user_message: str) -> Optional[str]:
    t = normalize_key(user_message)
    if not t:
        return None

    if "vr" in t or "virtual reality" in t:
        return "vr_games"
    if "arcade" in t or "arcades" in t:
        return "arcades"
    if "redemption" in t:
        return "redemption_games"
    if "ps5" in t or "playstation" in t or "console" in t:
        return "console"
    if "pc" in t or "esport" in t or "esports" in t:
        return "esports"
    if "f1" in t or "formula" in t or "racing" in t:
        return "formula_racing"
    if "birthday" in t:
        return "birthday_bash_packages"
    if "social" in t or "gaming room" in t:
        return "social_gaming_room"
    if "pay" in t and "play" in t:
        return "pay_and_play"

    return None


def extract_party_size(text: str) -> Optional[int]:
    t = normalize_text(text)
    if not t:
        return None

    m = re.search(
        r"\b(we\s*(?:are|re|r|have)?\s*)?(\d{1,3})\b\s*(people|persons|person|pax|kids|kid|players|player)?\b",
        t,
    )
    if not m:
        return None

    try:
        n = int(m.group(2))
    except Exception:
        return None

    if n <= 0 or n > 200:
        return None
    return n


def build_verified_total_answer(
    user_message: str,
    history: Optional[list[dict]] = None,
) -> Optional[str]:
    matches = find_pricing_matches(user_message)
    if not matches:
        return None

    party_size = extract_party_size(user_message)
    if party_size is None and history:
        for m in reversed(history):
            if not isinstance(m, dict):
                continue
            if m.get("from") != "user":
                continue
            txt = m.get("text")
            if not isinstance(txt, str):
                continue
            party_size = extract_party_size(txt)
            if party_size is not None:
                break

    if party_size is None:
        return None

    if len(matches) != 1:
        return None

    item = matches[0]
    price = item.get("price")
    if not isinstance(price, (int, float)):
        return None

    unit = str(item.get("unit") or "AED").upper()
    cat = str(item.get("category") or "")

    is_per_person = cat in {"vr_games", "birthday_bash_packages"} or "/KID" in unit or "/PERSON" in unit
    if not is_per_person:
        return None

    total = float(price) * float(party_size)
    total_str = str(int(total)) if float(total).is_integer() else f"{total:.2f}"
    price_str = str(int(price)) if float(price).is_integer() else f"{price:.2f}"
    currency = (PRICING_KB or {}).get("currency") or "AED"

    return (
        f"Verified pricing:\n"
        f"- {item.get('name')}: {price_str} {currency} per person\n"
        f"\nTotal for {party_size} people: {total_str} {currency}"
    )


def is_party_size_only_message(user_message: str) -> bool:
    t = normalize_key(user_message)
    if not t:
        return False
    if extract_party_size(user_message) is None:
        return False

    # If there are strong price/item words, it's not size-only.
    for w in ["price", "pricing", "cost", "aed", "how much", "total", "book", "booking"]:
        if w in t:
            return False

    # If it looks like a short size follow-up like: "we r 5" / "5 people"
    tokens = t.split()
    return len(tokens) <= 4


def is_duration_question(user_message: str) -> bool:
    t = normalize_key(user_message)
    if not t:
        return False
    triggers = [
        "how long",
        "duration",
        "minutes",
        "minute",
        "hours",
        "hour",
        "time",
        "for how long",
    ]
    return any(w in t for w in triggers)


def resolve_last_pricing_item_from_history(history: list[dict], client: Optional[OpenAI]) -> Optional[dict]:
    for m in reversed(history or []):
        if not isinstance(m, dict):
            continue
        if m.get("from") != "user":
            continue
        txt = m.get("text")
        if not isinstance(txt, str) or not txt.strip():
            continue
        if is_party_size_only_message(txt):
            continue
        it = resolve_pricing_item(txt, client=client)
        if it:
            return it
    return None


def build_total_for_item(item: dict, party_size: int) -> Optional[str]:
    if not item or not isinstance(party_size, int) or party_size <= 0:
        return None

    price = item.get("price")
    if not isinstance(price, (int, float)):
        return None

    currency = (PRICING_KB or {}).get("currency") or "AED"
    unit = str(item.get("unit") or currency).upper()
    cat = str(item.get("category") or "")

    is_per_person = cat in {"vr_games", "birthday_bash_packages"} or "/KID" in unit or "/PERSON" in unit
    if not is_per_person:
        return None

    total = float(price) * float(party_size)
    total_str = str(int(total)) if float(total).is_integer() else f"{total:.2f}"
    price_str = str(int(price)) if float(price).is_integer() else f"{price:.2f}"
    name = item.get("name") or "this item"

    return (
        f"Verified pricing:\n"
        f"- {name}: {price_str} {currency} per person\n"
        f"\nTotal for {party_size} people: {total_str} {currency}"
    )


def build_verified_duration_answer(item: dict) -> Optional[str]:
    if not item:
        return None
    currency = (PRICING_KB or {}).get("currency") or "AED"
    price = item.get("price")
    unit_raw = item.get("unit") or currency
    unit = str(unit_raw).upper()
    name = item.get("name") or "this item"

    if "/HR" in unit or "PER HOUR" in unit:
        if isinstance(price, (int, float)):
            return (
                f"Verified pricing for {name}: {price} {unit_raw}.\n"
                "That means it’s charged per hour."
            )
        return "This experience is charged per hour, but I don't have the exact verified price for it."

    m = re.search(r"/\s*(\d+)\s*MIN", unit)
    if m:
        minutes = m.group(1)
        if isinstance(price, (int, float)):
            return (
                f"Verified pricing for {name}: {price} {unit_raw}.\n"
                f"That means it’s charged per {minutes} minutes."
            )
        return f"This experience is charged per {minutes} minutes, but I don't have the exact verified price for it."

    # For arcade/redemption/VR items, we don't have a verified duration in the KB.
    if isinstance(price, (int, float)):
        return (
            f"Verified price for {name}: {price} {unit_raw}.\n\n"
            "I don’t have confirmed information about the exact play duration per game/session — it can vary by game. "
            "For accurate timing, please ask the staff on-site or contact Pixoul at +971 2 418 6699."
        )

    return None


def format_items(items: list[dict], max_items: int = 40) -> str:
    lines: list[str] = []
    for it in items[:max_items]:
        price = it.get("price")
        unit = it.get("unit") or "AED"
        if price is None:
            continue
        lines.append(f"- {it.get('name')}: {price} {unit}")
    return "\n".join(lines).strip()


def build_verified_pricing_answer(user_message: str) -> Optional[str]:
    matches = find_pricing_matches(user_message)
    category = detect_category_request(user_message)

    if matches:
        text = format_items(matches, max_items=12)
        if text:
            return text

    if category:
        items = [i for i in PRICING_ITEMS if i.get("category") == category]
        text = format_items(items)
        if text:
            return text

    return None


SYSTEM_PROMPT = (
    "You are Pixoul Assistant, the official AI assistant for Pixoul Gaming LLC.\n\n"
    "You MUST strictly follow these rules:\n\n"
    "1. Only use the official company information provided.\n"
    "2. Pixoul Gaming is located at Al Qana Walk, Abu Dhabi, UAE.\n"
    "3. Do NOT invent additional branches or locations.\n"
    "4. Do NOT invent pricing, policies, schedules, or business history.\n"
    "5. If you are unsure about a business fact, say: 'I don't have confirmed information about that. "
    "Please contact Pixoul directly for accurate details.'\n"
    "5a. You MAY recommend experiences in general terms (e.g., VR adventure, multiplayer battle, arcade challenges) "
    "and ask short clarifying questions. But do NOT claim specific game titles, prices, timings, or policies unless provided.\n"
    "6. Keep responses short (3–6 sentences).\n"
    "7. Maintain a friendly, energetic, and professional tone.\n"
    "8. Encourage visiting Pixoul naturally but do not push aggressively.\n"
    "9. For recommendations, personalize based on group size, mood, and occasion."
)

KNOWLEDGE_BLOCK = (
    "Official Pixoul Business Data:\n"
    "- Company Name: Pixoul Gaming LLC\n"
    "- Location: Al Qana Walk, Abu Dhabi, UAE\n"
    "- Phone: +971 2 418 6699\n"
    "- Services: Virtual Reality (VR) Experiences, Console Gaming, Arcade Games, Multiplayer Battles, Redemption Games\n"
    "- Target Audience: Families, Groups of friends, Corporate team building, Birthday parties\n"
    "- Brand Personality: High-tech, Immersive, Energetic, Friendly, Professional"
)


class ChatRequest(BaseModel):
    message: str
    history: Optional[list[dict]] = None


class ChatResponse(BaseModel):
    reply: str


app = FastAPI(title="Pixoul Chatbot (Python)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"]
,
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"ok": True}


@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    user_message = (req.message or "").strip()
    if not user_message:
        raise HTTPException(status_code=400, detail="missing_message")

    history = req.history or []

    def history_has_pixoul_context() -> bool:
        for m in history:
            if not isinstance(m, dict):
                continue
            txt = m.get("text")
            if not isinstance(txt, str):
                continue
            if is_pixoul_related(txt):
                return True
        return False

    overall_pixoul_related = is_pixoul_related(user_message) or history_has_pixoul_context()

    if is_greeting_message(user_message):
        return ChatResponse(
            reply=pick_variant(
                user_message,
                [
                    "Hi! I'm the Pixoul Assistant. Ask me anything about Pixoul — VR games, events, birthday parties, or the community.",
                    "Hello! Pixoul Assistant here. How can I help you with Pixoul today (games, events, or the community)?",
                    "Hey! I'm Pixoul Assistant. What would you like to explore at Pixoul — VR, arcade, events, or community pages?",
                ],
            )
        )

    if is_categories_question(user_message):
        cats = list_available_categories()
        if cats:
            return ChatResponse(
                reply=(
                    "Here are the game categories we offer at Pixoul:\n"
                    + "\n".join([f"- {c}" for c in cats])
                    + "\n\nTell me your group size and vibe (chill, competitive, or adventurous) and I’ll recommend what to try first."
                )
            )

    if is_packages_question(user_message):
        sections = list_available_package_sections()
        if sections:
            parts: list[str] = ["Here are the verified packages I have:"]
            for key, label in sections:
                items = [i for i in PRICING_ITEMS if i.get("category") == key]
                listing = format_items(items, max_items=12)
                if listing:
                    parts.append(f"\n{label}:")
                    parts.append(listing)
            text = "\n".join([p for p in parts if p.strip()]).strip()
            if text:
                return ChatResponse(
                    reply=(
                        text
                        + "\n\nIf you tell me which package you’re considering and how many people/kids, I can help you pick the best option."
                    )
                )

    if is_vr_games_question(user_message):
        items = [i for i in PRICING_ITEMS if i.get("category") == "vr_games"]
        names = [i.get("name") for i in items if isinstance(i.get("name"), str)]
        prices = [i.get("price") for i in items if isinstance(i.get("price"), (int, float))]
        unique_prices = sorted({float(p) for p in prices})
        price_note = ""
        if len(unique_prices) == 1:
            currency = (PRICING_KB or {}).get("currency") or "AED"
            p = unique_prices[0]
            p_str = str(int(p)) if float(p).is_integer() else f"{p:.2f}"
            price_note = f"\n\nVerified price: {p_str} {currency} per person (per game)."

        if names:
            preview = names[:8]
            more = len(names) - len(preview)
            more_text = f"\n- …and {more} more" if more > 0 else ""
            return ChatResponse(
                reply=(
                    "Here are some VR games available at Pixoul:\n"
                    + "\n".join([f"- {n}" for n in preview])
                    + more_text
                    + price_note
                    + "\n\nTell me your group size and vibe (competitive, chill, or adventurous) and I’ll suggest what to start with."
                )
            )

    api_key = os.getenv("OPENAI_API_KEY")
    client: Optional[OpenAI] = OpenAI(api_key=api_key) if api_key else None

    if overall_pixoul_related and is_duration_question(user_message):
        last_item = resolve_last_pricing_item_from_history(history, client=client)
        if last_item:
            dur = build_verified_duration_answer(last_item)
            if dur:
                return ChatResponse(reply=dur)

    if overall_pixoul_related and is_party_size_only_message(user_message):
        party_size = extract_party_size(user_message)
        if party_size is not None:
            last_item = resolve_last_pricing_item_from_history(history, client=client)
            if last_item:
                total_text = build_total_for_item(last_item, party_size)
                if total_text:
                    return ChatResponse(reply=total_text)

                currency = (PRICING_KB or {}).get("currency") or "AED"
                price = last_item.get("price")
                unit = last_item.get("unit") or currency
                if isinstance(price, (int, float)):
                    return ChatResponse(
                        reply=(
                            "Thanks — I got your group size.\n\n"
                            "For this item, the verified price I have looks like a fixed price (not per-person), so I can’t multiply it safely.\n"
                            f"- {last_item.get('name')}: {price} {unit}\n\n"
                            "Do you mean: total for multiple people at the same time, or total for multiple hours/rounds?"
                        )
                    )

    if overall_pixoul_related:
        it = resolve_pricing_item(user_message, client=client)
        if it:
            price = it.get("price")
            if isinstance(price, (int, float)):
                currency = (PRICING_KB or {}).get("currency") or "AED"
                unit = it.get("unit") or currency
                return ChatResponse(
                    reply=(
                        "Here’s the verified price I have:\n"
                        f"- {it.get('name')}: {price} {unit}\n\n"
                        "If you tell me your group size, I can help estimate the total."
                    )
                )

    if not overall_pixoul_related:
        return ChatResponse(
            reply=pick_variant(
                user_message,
                [
                    "Sorry — that's outside my scope. I'm the Pixoul Assistant and I can only help with Pixoul-related questions. For anything else, please contact Pixoul customer service at +971 2 418 6699.",
                    "I'm sorry, I can't help with that. I'm the Pixoul Assistant (Pixoul-only questions like games, events, bookings, and location). If you need help, please contact +971 2 418 6699.",
                    "That question isn't in my context. I'm the Pixoul Assistant and I can answer Pixoul-related topics only. For support, please reach Pixoul at +971 2 418 6699.",
                ],
            )
        )

    if is_operational_detail_question(user_message):
        total_verified = build_verified_total_answer(user_message, history=history)
        if total_verified:
            return ChatResponse(reply=total_verified)

        verified = build_verified_pricing_answer(user_message)
        if verified:
            return ChatResponse(
                reply=(
                    f"Here are the verified prices I have:\n{verified}\n\n"
                    "If you want, tell me which game/experience you're interested in and I’ll point you to the best option."
                )
            )

        return ChatResponse(
            reply=(
                "I don't have confirmed information about that. "
                "Please contact Pixoul directly for accurate details at +971 2 418 6699."
            )
        )

    if not api_key:
        raise HTTPException(status_code=500, detail="missing_openai_api_key")

    if client is None:
        client = OpenAI(api_key=api_key)

    try:
        pricing_snippet = ""
        category = detect_category_request(user_message)
        if category:
            items = [i for i in PRICING_ITEMS if i.get("category") == category]
            listing = format_items(items)
            if listing:
                pricing_snippet = f"\n\nVerified pricing list for {category}:\n{listing}"

        role_map = {"user": "user", "bot": "assistant", "assistant": "assistant"}
        history_messages = []
        for m in history:
            if not isinstance(m, dict):
                continue
            who = m.get("from")
            txt = m.get("text")
            if not isinstance(who, str) or not isinstance(txt, str) or not txt.strip():
                continue
            role = role_map.get(who, "user")
            history_messages.append({"role": role, "content": txt})

        resp = client.chat.completions.create(
            model=DEFAULT_MODEL,
            temperature=0.3,
            max_tokens=220,
            messages=[
                {
                    "role": "system",
                    "content": (
                        f"{SYSTEM_PROMPT}\n\n{KNOWLEDGE_BLOCK}"
                        "\n\nIf the user asks about prices/timings/policies and you do not see an exact value in the verified list, "
                        "tell them you don't have confirmed information and to contact Pixoul. "
                        "If a verified pricing list is provided, only use those numbers."
                        f"{pricing_snippet}"
                    ),
                },
                *history_messages,
                {"role": "user", "content": user_message},
            ],
        )

        reply = (resp.choices[0].message.content or "").strip() if resp and resp.choices else ""
        if not reply:
            raise HTTPException(status_code=502, detail="openai_empty_reply")

        return ChatResponse(reply=reply)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e)[:500])
