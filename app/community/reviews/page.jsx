"use client";
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from "next/navigation";
import { reviewsAPI } from "@/lib/api/experiences";

export default function ReviewsPage() {
  const router = useRouter();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function loadMine() {
    setError("");
    setIsLoading(true);
    try {
      const resp = await reviewsAPI.list({ limit: 200 });
      setReviews(Array.isArray(resp?.reviews) ? resp.reviews : []);
    } catch (e) {
      setError(e?.message || "Failed to load reviews");
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadMine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      setIsLoggedIn(Boolean(localStorage.getItem("auth_token")));
    } catch {
      setIsLoggedIn(false);
    }
  }, []);

  const overall = useMemo(() => {
    if (!reviews.length) return null;
    const avg =
      reviews.reduce((sum, r) => sum + (Number(r?.rating) || 0), 0) / reviews.length;
    return Math.round(avg * 10) / 10;
  }, [reviews]);

  const ratings = useMemo(() => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const r of reviews) {
      const val = Math.round(Number(r?.rating) || 0);
      if (val >= 1 && val <= 5) counts[val] += 1;
    }

    const total = reviews.length || 0;
    return [5, 4, 3, 2, 1].map((stars) => {
      const percent = total ? Math.round((counts[stars] / total) * 100) : 0;
      return { stars, percent };
    });
  }, [reviews]);

  const isUnauthorized =
    error && String(error).toLowerCase().includes("unauthorized");

  return (
    <div className="min-h-screen dark:bg-[#060606] bg-white dark:text-white text-black pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-black italic tracking-tighter mb-2">REVIEWS & <span className="text-[#38C2D9]">RATINGS</span></h1>
          <p className="text-gray-400">See what the community has to say about their Pixoul experiences.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Summary */}
          <aside className="lg:w-1/3 space-y-6">
            <div className="dark:bg-[#111] bg-white border border-black/10 dark:border-white/10 rounded-none p-8 sticky top-32">
              <h2 className="text-lg font-bold mb-6">Overall Rating</h2>
              <div className="flex flex-col items-center mb-8">
                <span className="text-7xl font-black text-[#38C2D9]">{overall ?? "—"}</span>
                <div className="flex text-yellow-400 my-2">★★★★★</div>
                <p className="text-gray-500 text-sm">{reviews.length} reviews</p>
              </div>

              <div className="space-y-3 mb-8">
                {ratings.map((r) => (
                  <div key={r.stars} className="flex items-center gap-4 text-sm">
                    <span className="w-2 flex items-center">{r.stars} ★</span>
                    <div className="flex-1 h-2 bg-black/10 dark:bg-black/40 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${r.percent}%` }}></div>
                    </div>
                    <span className="w-8 text-right text-gray-500">{r.percent}%</span>
                  </div>
                ))}
              </div>

              {error ? (
                <div className="text-sm text-red-400 mb-4">{error}</div>
              ) : null}

              <button 
                onClick={() => setShowReviewForm(true)}
                disabled={!isLoggedIn || isUnauthorized}
                className="w-full py-4 bg-[#38C2D9] text-black font-black rounded-none hover:scale-[1.02] transition-transform uppercase italic"
              >
                Write a Review
              </button>

              {!isLoggedIn || isUnauthorized ? (
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="w-full mt-3 py-3 border border-black/10 dark:border-white/10 text-black/70 dark:text-white/80 font-bold rounded-none hover:text-black dark:hover:text-white"
                >
                  Log in to write a review
                </button>
              ) : null}
            </div>
          </aside>

          {/* Review Feed */}
          <main className="lg:w-2/3 space-y-4">
            {isLoading ? (
              <div className="bg-black/5 dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-none p-6 text-black/60 dark:text-gray-400">
                Loading reviews...
              </div>
            ) : null}

            {!isLoading && !reviews.length ? (
              <div className="bg-black/5 dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-none p-6 text-black/60 dark:text-gray-400">
                No reviews yet.
              </div>
            ) : null}

            {reviews.map((r) => (
              <ReviewCard
                key={r.review_id}
                name={r.display_name || r.username || "Player"}
                date={new Date(r.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
                tag={r.experience_tag || "Pixoul"}
                initials={String(r.display_name || r.username || "P").slice(0, 1).toUpperCase()}
                text={r.review_text}
                rating={Number(r.rating) || 5}
              />
            ))}
          </main>
        </div>
      </div>

      {/* Overlay Review Form */}
      {showReviewForm && (
        <ReviewModal
          onClose={() => setShowReviewForm(false)}
          onCreated={async () => {
            setShowReviewForm(false);
            await loadMine();
          }}
        />
      )}
    </div>
  );
}

function ReviewCard({ name, date, tag, text, initials, rating = 5, bgColor = "bg-[#38C2D9]" }) {
  const stars = "★★★★★".slice(0, Math.max(0, Math.min(5, Math.round(Number(rating) || 0))));
  return (
    <div className="dark:bg-[#111] bg-white border border-black/10 dark:border-white/10 rounded-none p-6 hover:border-white/10 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center font-bold text-lg`}>
            {initials}
          </div>
          <div>
            <h3 className="font-bold leading-none">{name}</h3>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">{date}</span>
          </div>
        </div>
        <div className="flex text-yellow-400 text-sm">{stars}</div>
      </div>
      <span className="inline-block px-3 py-1 bg-[#38C2D9]/10 text-[#38C2D9] text-[10px] font-bold rounded-none mb-4 uppercase tracking-tighter">
        {tag}
      </span>
      <p className="text-black/70 dark:text-gray-300 leading-relaxed text-sm">{text}</p>
    </div>
  );
}

function ReviewModal({ onClose, onCreated }) {
  const [rating, setRating] = useState(5);
  const [experienceTag, setExperienceTag] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function onPublish() {
    if (isLoading) return;
    setError("");
    setIsLoading(true);
    try {
      await reviewsAPI.create({
        rating,
        experienceTag: experienceTag || null,
        reviewText,
      });
      await onCreated?.();
    } catch (e) {
      setError(e?.message || "Failed to publish review");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 dark:bg-black/80 bg-white/80 backdrop-blur-sm"></div>
      
      {/* Form Container */}
      <div className="relative dark:bg-[#0a0a0a] bg-white border border-[#38C2D9]/30 w-full max-w-lg rounded-none p-8 shadow-2xl shadow-[#38C2D9]/10">
        <h2 className="text-2xl font-black mb-6">POST YOUR <span className="text-[#38C2D9]">FEEDBACK</span></h2>
        
        <div className="space-y-6">
          <div>
            <label className="text-[10px] uppercase font-bold dark:text-gray-500 text-black/60 dark:text-white/60 tracking-widest block mb-2">Rate Your Experience</label>
            <div className="flex gap-2 text-3xl text-black/60 dark:text-white/60">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  className={`${s <= rating ? "text-yellow-400" : "text-black/60 dark:text-white/60"} hover:text-yellow-400 transition-colors`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-2">Game / Experience</label>
            <select
              value={experienceTag}
              onChange={(e) => setExperienceTag(e.target.value)}
              className="w-full bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-none p-4 text-sm text-black dark:text-white focus:border-[#38C2D9] outline-none appearance-none cursor-pointer"
            >
              <option className="bg-[#111] text-black/60 dark:text-gray-400" value="">Select an experience...</option>
              <option className="bg-[#111] text-white" value="VR Games">VR Games</option>
              <option className="bg-[#111] text-white" value="PC Arena">PC Arena</option>
              <option className="bg-[#111] text-white" value="Retro Zone">Retro Zone</option>
              <option className="bg-[#111] text-white" value="Console Games">Console Games</option>
              <option className="bg-[#111] text-white" value="Arcade">Arcade</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold dark:text-gray-500 text-black/60 dark:text-white/60 tracking-widest block mb-2">Your Review</label>
            <textarea 
              placeholder="What did you think of Pixoul?"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-none p-4 h-40 text-sm focus:border-[#38C2D9] outline-none transition-all resize-none"
            />
          </div>

          {error ? <div className="text-sm text-red-400">{error}</div> : null}

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onPublish}
              disabled={isLoading}
              className="flex-1 py-4 bg-[#38C2D9] text-black font-black rounded-none italic uppercase hover:scale-[1.02] transition-transform disabled:opacity-50"
            >
              Publish Review
            </button>
            <button type="button" onClick={onClose} className="px-6 text-gray-500 font-bold text-xs uppercase hover:text-black dark:hover:text-white transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}